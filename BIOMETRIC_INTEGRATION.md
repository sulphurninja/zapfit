# Biometric Attendance System - Hardware Integration Guide

## Overview

GymZ supports biometric fingerprint attendance for both members and trainers. This document provides technical details for integrating fingerprint scanners and other biometric devices.

## Supported Devices

- **ZKTeco** (F18, F19, K40, iClock series)
- **eSSL** (X990, K21, i9C)
- **Anviz** (W1, C2, M7)
- **Hikvision** (DS-K1T201, DS-K1T321)
- **Suprema** (BioStation 2, BioEntry)
- **Generic** (Any device supporting ANSI 378 or ISO 19794-2 templates)

## Architecture

```
┌─────────────────┐
│ Fingerprint     │
│ Scanner         │
└────────┬────────┘
         │
         ├─ USB/Serial/TCP Connection
         │
┌────────▼────────┐
│ Integration     │
│ Service         │
│ (Your Server)   │
└────────┬────────┘
         │
         ├─ HTTPS API Calls
         │
┌────────▼────────┐
│   GymZ API      │
│   Backend       │
└─────────────────┘
```

## API Endpoints

### 1. Enroll Fingerprint

**POST** `/api/biometric/enroll`

Register a new fingerprint for a user.

**Request Body:**
```json
{
  "userId": "6914b8f3baa2664996f9b4f8",
  "userType": "member",  // or "trainer"
  "biometricType": "fingerprint",
  "templateData": "ANSI_378_TEMPLATE_BASE64_ENCODED",
  "fingerIndex": 1,  // 1-10 (1=Right Thumb, 6=Left Thumb)
  "quality": 85,     // 0-100 quality score
  "deviceId": "DEVICE_001"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Biometric enrolled successfully",
  "biometric": {
    "_id": "69...",
    "userId": "6914b8f3baa2664996f9b4f8",
    "biometricType": "fingerprint",
    "quality": 85,
    "enrollmentDate": "2025-11-12T16:42:27.650Z"
  }
}
```

### 2. Verify Fingerprint & Mark Attendance

**POST** `/api/biometric/verify`

Verify a fingerprint and automatically check-in or check-out.

**Request Body:**
```json
{
  "templateData": "ANSI_378_TEMPLATE_BASE64_ENCODED",
  "biometricType": "fingerprint",
  "deviceId": "DEVICE_001",
  "location": "Main Entrance"
}
```

**Response:**
```json
{
  "success": true,
  "action": "check-in",  // or "check-out"
  "message": "Checked in successfully",
  "attendance": {
    "_id": "69...",
    "userName": "John Doe",
    "userType": "member",
    "checkInTime": "2025-11-12T10:30:00.000Z",
    "checkOutTime": null,
    "duration": null
  },
  "user": {
    "name": "John Doe",
    "type": "member"
  }
}
```

### 3. Get All Biometric Records

**GET** `/api/biometric/enroll?userId=xxx&userType=member`

Retrieve enrolled biometric records.

**Query Parameters:**
- `userId` (optional): Filter by user ID
- `userType` (optional): Filter by "member" or "trainer"

**Response:**
```json
{
  "success": true,
  "biometrics": [
    {
      "_id": "69...",
      "userId": "6914...",
      "userType": "member",
      "biometricType": "fingerprint",
      "fingerIndex": 1,
      "quality": 85,
      "enrollmentDate": "2025-11-12T16:42:27.650Z",
      "isActive": true
    }
  ]
}
```

### 4. Get Attendance Records

**GET** `/api/attendance?date=2025-11-12`

Retrieve attendance records.

**Query Parameters:**
- `date` (optional): Filter by date (YYYY-MM-DD)
- `userId` (optional): Filter by user
- `userType` (optional): "member" or "trainer"
- `startDate` & `endDate` (optional): Date range

**Response:**
```json
{
  "success": true,
  "attendance": [...],
  "stats": {
    "totalRecords": 50,
    "checkedIn": 15,
    "checkedOut": 35,
    "avgDuration": 75
  }
}
```

## Integration Examples

### Example 1: ZKTeco Device Integration (Node.js)

```javascript
const ZKLib = require('zklib')
const axios = require('axios')

// Connect to ZKTeco device
const zkInstance = new ZKLib('192.168.1.201', 4370, 5200, 5000)

async function enrollFingerprint(userId, userType, fingerIndex) {
  try {
    await zkInstance.createSocket()
    
    // Put device in enrollment mode
    const template = await zkInstance.startEnroll()
    
    // Get ANSI 378 template
    const ansiTemplate = Buffer.from(template).toString('base64')
    
    // Send to GymZ API
    const response = await axios.post('https://yourgymdomain.com/api/biometric/enroll', {
      userId,
      userType,
      biometricType: 'fingerprint',
      templateData: ansiTemplate,
      fingerIndex,
      quality: 85,
      deviceId: zkInstance.deviceId
    }, {
      headers: {
        'Cookie': 'token=YOUR_AUTH_TOKEN'
      }
    })
    
    console.log('Enrolled:', response.data)
    
  } catch (error) {
    console.error('Enrollment error:', error)
  } finally {
    await zkInstance.disconnect()
  }
}

async function verifyAttendance() {
  try {
    await zkInstance.createSocket()
    
    // Listen for fingerprint verification
    zkInstance.getRealTimeLogs((data) => {
      if (data.authType === 'fingerprint') {
        // Get fingerprint template
        const template = Buffer.from(data.template).toString('base64')
        
        // Verify with GymZ API
        axios.post('https://yourgymdomain.com/api/biometric/verify', {
          templateData: template,
          biometricType: 'fingerprint',
          deviceId: zkInstance.deviceId,
          location: 'Main Entrance'
        }, {
          headers: {
            'Cookie': 'token=YOUR_AUTH_TOKEN'
          }
        }).then(response => {
          console.log('Attendance marked:', response.data)
          // Display message on device screen
          zkInstance.writeMessage(
            `${response.data.action === 'check-in' ? 'Welcome' : 'Goodbye'}, ${response.data.user.name}!`
          )
        })
      }
    })
    
  } catch (error) {
    console.error('Verification error:', error)
  }
}
```

### Example 2: USB Fingerprint Scanner (Python)

```python
import requests
import base64
from pyfingerprint import PyFingerprint

# Initialize scanner
scanner = PyFingerprint('/dev/ttyUSB0', 57600, 0xFFFFFFFF, 0x00000000)

def enroll_fingerprint(user_id, user_type, finger_index):
    """Enroll a new fingerprint"""
    
    print('Place finger on scanner...')
    
    # Scan fingerprint
    if scanner.readImage() == False:
        raise Exception('Could not read image')
    
    # Convert to template
    scanner.convertImage(0x01)
    
    # Get template data
    template = scanner.downloadCharacteristics(0x01)
    template_b64 = base64.b64encode(bytes(template)).decode('utf-8')
    
    # Send to GymZ API
    response = requests.post(
        'https://yourgymdomain.com/api/biometric/enroll',
        json={
            'userId': user_id,
            'userType': user_type,
            'biometricType': 'fingerprint',
            'templateData': template_b64,
            'fingerIndex': finger_index,
            'quality': 85,
            'deviceId': 'USB_SCANNER_001'
        },
        cookies={'token': 'YOUR_AUTH_TOKEN'}
    )
    
    print('Enrolled:', response.json())

def verify_attendance():
    """Verify fingerprint and mark attendance"""
    
    print('Place finger on scanner...')
    
    # Scan fingerprint
    if scanner.readImage() == False:
        raise Exception('Could not read image')
    
    # Convert to template
    scanner.convertImage(0x01)
    
    # Get template
    template = scanner.downloadCharacteristics(0x01)
    template_b64 = base64.b64encode(bytes(template)).decode('utf-8')
    
    # Verify with GymZ API
    response = requests.post(
        'https://yourgymdomain.com/api/biometric/verify',
        json={
            'templateData': template_b64,
            'biometricType': 'fingerprint',
            'deviceId': 'USB_SCANNER_001',
            'location': 'Reception'
        },
        cookies={'token': 'YOUR_AUTH_TOKEN'}
    )
    
    data = response.json()
    if data['success']:
        print(f"{data['action'].upper()}: {data['user']['name']}")
    else:
        print('Fingerprint not recognized')

# Continuous monitoring
while True:
    try:
        verify_attendance()
    except Exception as e:
        print(f'Error: {e}')
```

### Example 3: Web-based Fingerprint (JavaScript)

```javascript
// Using WebAuthn API for browser-based fingerprint
async function enrollWebFingerprint(userId, userType) {
  try {
    // Request fingerprint from browser
    const credential = await navigator.credentials.create({
      publicKey: {
        challenge: new Uint8Array(32),
        rp: { name: "GymZ" },
        user: {
          id: new Uint8Array(16),
          name: userId,
          displayName: "Gym Member"
        },
        pubKeyCredParams: [{ alg: -7, type: "public-key" }],
        authenticatorSelection: {
          authenticatorAttachment: "platform",
          requireResidentKey: false,
          userVerification: "required"
        }
      }
    })
    
    // Convert to base64
    const template = btoa(String.fromCharCode(...new Uint8Array(credential.rawId)))
    
    // Send to API
    const response = await fetch('/api/biometric/enroll', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        userType,
        biometricType: 'fingerprint',
        templateData: template,
        quality: 95,
        deviceId: 'WEBAUTHN'
      })
    })
    
    const data = await response.json()
    console.log('Enrolled:', data)
    
  } catch (error) {
    console.error('Enrollment error:', error)
  }
}
```

## Template Formats

GymZ accepts fingerprint templates in the following formats:

1. **ANSI 378** (Recommended) - Base64 encoded
2. **ISO 19794-2** - Base64 encoded
3. **Proprietary formats** - Base64 encoded (stored as-is)

### Converting Templates

```javascript
// Example: Convert ZKTeco template to Base64
const template = device.getTemplate()
const base64Template = Buffer.from(template).toString('base64')
```

## Security Best Practices

1. **Encryption**: Always use HTTPS for API communication
2. **Authentication**: Include valid JWT token in cookies
3. **Template Storage**: Templates are encrypted in database
4. **Access Control**: Only authorized staff can enroll biometrics
5. **Data Privacy**: Templates cannot be reverse-engineered to fingerprints
6. **GDPR Compliance**: Users can request biometric data deletion

## Quality Guidelines

For best results:
- Ensure finger quality score ≥ 70
- Enroll at least 2 fingers per user (backup)
- Clean scanner surface regularly
- Guide users to place finger flat and centered
- Re-enroll if quality < 60

## Troubleshooting

### Common Issues

**1. "Biometric not recognized"**
- Solution: Re-enroll with higher quality scan
- Check if fingerprint quality score is sufficient

**2. Template format mismatch**
- Solution: Ensure template is Base64 encoded
- Verify device supports ANSI 378 or ISO 19794-2

**3. Duplicate check-in**
- Solution: System automatically detects if user already checked in
- Second scan will check-out instead

**4. Device connection timeout**
- Solution: Check network connectivity
- Verify device IP address and port
- Ensure firewall allows communication

## Testing

Use the demo mode in the UI:
1. Go to **Biometric Management** page
2. Click **Enroll Fingerprint**
3. Select a user and finger
4. Click **Start Scan** (simulated for demo)

## Support

For hardware integration support:
- Email: support@gymz.com
- Documentation: docs.gymz.com/biometric
- API Reference: api.gymz.com/docs

## Roadmap

**Coming Soon:**
- ✅ Fingerprint attendance
- 🔄 Face recognition
- 🔄 RFID card integration
- 🔄 Mobile app attendance (GPS + photo)
- 🔄 Device health monitoring
- 🔄 Multi-device sync
- 🔄 Offline mode support

---

**Last Updated**: November 2025  
**API Version**: 1.0.0





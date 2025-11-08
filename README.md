# ZapFit OS - Gym Management System

A comprehensive, modern gym management platform built with Next.js, MongoDB, and WhatsApp automation. Perfect for Indian fitness businesses.

## 🚀 Features

### Core Modules
- **Dashboard** - Real-time analytics and key metrics
- **Member Management** - Complete CRM for members with subscription tracking
- **Lead Management** - Track and convert leads effectively
- **Billing & Payments** - Automated invoicing and payment tracking
- **Attendance** - QR-based check-ins and attendance tracking
- **Trainer Management** - Performance tracking and commission calculation
- **WhatsApp Automation** - Automated reminders via Zaptick.io
- **Reports** - Comprehensive reports in CSV, Excel, and PDF formats
- **Plans** - Create and manage membership plans

### Key Features
- JWT-based authentication
- Role-based access control (Super Admin, Gym Owner, Trainer, Member)
- Automated renewal reminders
- Real-time dashboard analytics
- Multi-branch management support
- Responsive, modern UI with Tailwind CSS

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT
- **UI Components:** shadcn/ui + Radix UI
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **WhatsApp:** Zaptick.io API integration
- **Forms:** React Hook Form + Zod

## 📋 Prerequisites

- Node.js 18+ or Bun
- MongoDB (local or MongoDB Atlas)
- Git

## 🚦 Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd gym
```

### 2. Install dependencies

Using npm:
```bash
npm install
```

Or using Bun:
```bash
bun install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/zapfit

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d

# Next.js Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Zaptick.io API Configuration (Optional)
ZAPTICK_API_KEY=your-zaptick-api-key
ZAPTICK_API_URL=https://api.zaptick.io/v1

# Payment Gateway (Optional - Razorpay)
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret
```

### 4. Set up MongoDB

**Option A: Local MongoDB**
```bash
# Install MongoDB locally and start the service
mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Update `MONGODB_URI` in `.env.local`

### 5. Run the development server

```bash
npm run dev
```

Or with Bun:
```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 Default Routes

- `/` - Landing page
- `/login` - Login page
- `/register` - Registration page
- `/dashboard` - Main dashboard (protected)
- `/dashboard/members` - Member management
- `/dashboard/leads` - Lead management
- `/dashboard/billing` - Billing & payments
- `/dashboard/attendance` - Attendance tracking
- `/dashboard/trainers` - Trainer management
- `/dashboard/whatsapp` - WhatsApp automation
- `/dashboard/plans` - Membership plans
- `/dashboard/reports` - Reports & analytics
- `/dashboard/settings` - Settings

## 🔐 Authentication Flow

1. **Register** - Create a gym owner account at `/register`
2. **Login** - Sign in at `/login`
3. **Protected Routes** - All `/dashboard/*` routes require authentication
4. **Middleware** - Automatic redirect to login for unauthenticated users

## 📊 Database Models

- **User** - Gym owners, trainers, staff, and members
- **Organization** - Gym details and subscription info
- **Member** - Member profiles and subscriptions
- **Plan** - Membership plans (monthly, quarterly, yearly)
- **Payment** - Payment transactions and invoices
- **Attendance** - Check-in/check-out records
- **Lead** - Potential customers and follow-ups

## 🎨 UI Components

All UI components are built with shadcn/ui and located in `/components/ui`:
- Button, Card, Input, Label, Badge
- Table, Dialog, Select, Tabs
- Dropdown Menu, Avatar, Switch
- And more...

## 📞 WhatsApp Integration (Zaptick.io)

### Setup
1. Sign up for a Zaptick.io account
2. Get your API key
3. Add the API key to `.env.local`
4. Configure in Settings > WhatsApp

### Available Templates
- Welcome messages for new members
- Renewal reminders (3 days before expiry)
- Payment receipts
- Expiry notifications
- Lead follow-ups

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

### Other Platforms

The app can be deployed on any platform that supports Next.js:
- Netlify
- Railway
- Render
- DigitalOcean App Platform

## 📈 Roadmap

### Phase 2 (Planned)
- [ ] AI-powered renewal predictions
- [ ] Mobile app (React Native)
- [ ] Progress tracking with photos
- [ ] Class scheduling
- [ ] Advanced analytics
- [ ] Payment gateway integration (Razorpay)

### Phase 3 (Future)
- [ ] Multi-branch dashboard
- [ ] White-label solutions
- [ ] API for third-party integrations
- [ ] AI chatbot for member queries

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 💡 Support

For support, email your-email@example.com or join our Slack channel.

## 🎯 Business Model

### Pricing Plans
- **Starter:** ₹999/month (≤100 members)
- **Growth:** ₹1,999/month (≤500 members)
- **Pro:** ₹4,999/month (Unlimited + Multi-branch)
- **White-label:** ₹25,000 setup + ₹4,999/month

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB](https://www.mongodb.com/)
- [Zaptick.io](https://zaptick.io/)

---

Built with ❤️ for Indian fitness businesses

MONGODB_URI=mongodb+srv://StayNest:UDoENOhLR5bSNO6X@cluster0.w9cbrwo.mongodb.net/?appName=Cluster0
BETTER_AUTH_SECRET=0ZIETv3yxyEFMuV9mnvqUCMKxCvKYe37
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_SERVER_URI=http://localhost:5000
GOOGLE_CLIENT_ID=652211954472-4cpk7ghfhd3cmr4sm0ho7dpk4fhlq1d1.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51TgaYVEQHDJ5kzpvEY451F8E3QWD08CanvQdgwz3qttnzAFoIMvl3s8VXNqJ2h4BjsK9G1xw6nDFwYOz7C38bMlV00MyKHxIp4
STRIPE_SECRET_KEY=sk_test_51TgaYVEQHDJ5kzpv4ZXTWTkft5mdJpn6BuyrnF2XGRLGR0PHfsZle3fJNJzRf8vFV9BtI1ve9YThn8cAnnYvfJBQ009W5yFDXO




PORT=5000
MONGODB_URI=mongodb+srv://StayNest:UDoENOhLR5bSNO6X@cluster0.w9cbrwo.mongodb.net/?appName=Cluster0
CLIENT_URI=http://localhost:3000

```markdown
# StayNest - Real Estate & Property Management Platform 🏡✨

**StayNest** is a modern, responsive, and full-stack Property Management Application designed to bridge the gap between tenants, property owners, and administrators. Built with Next.js (App Router), Tailwind CSS, and a robust real-time analytics engine, it offers role-based functionalities, secure dashboards, and an interactive interface.

---

## 📌 Project Overview & Purpose
The main objective of StayNest is to streamline property hunting, booking, and platform management. It offers:
1. **Tenants:** A seamless experience to view properties, book stays, and leave verified ratings.
2. **Owners:** Tools to list and manage real estate assets.
3. **Admins:** A centralized command center to monitor platform health, system logs, and comprehensive financial growth.

---

## 🚀 Key Features

### 1. Central Command Dashboard (Admin Module)
* **Real-time Metrics:** Tracks total revenue, user count, active listings, and total bookings with dynamic percentage counters.
* **Ecosystem Analytics:** Features an interactive monthly revenue line chart powered by `recharts`.
* **Live System Logs:** Shows global audit logs triggered by user actions, new listings, or webhook operations for high-level monitoring.

### 2. Role-Based Review & Rating System
* **Access Control:** Form visibility is strictly restricted to users authenticated with the `tenant` role. Admins and owners are blocked from modifying property ratings.
* **Optimistic UI Updates:** Newly submitted reviews are instantly pushed to the top of the feed without requiring full page reloads.
* **Safe Fallbacks:** Automatically handles missing profile data by falling back to "Anonymous" gracefully.

### 3. Core Technical Features
* **Adaptive Dark Mode:** Fully integrated light and dark modes optimized using Tailwind CSS utilities.
* **Secure API Integration:** Attaches bearer tokens automatically to protected header routes (`/admin/analytics`, `/api/reviews`).
* **High-Fidelity UI:** Completely responsive design scaling smoothly from mobile screens (`xs`, `sm`) up to ultra-wide desktop monitors.

---

## 🛠️ Technology Stack

* **Frontend Framework:** Next.js 14/15 (App Router)
* **Language:** JavaScript / TypeScript
* **Styling:** Tailwind CSS & Lucide React (Icons)
* **Data Visualization:** Recharts (Responsive Line Charts)
* **Authentication:** Custom Session Client with Bearer Token Architecture
* **State Management:** React Reactivity Hooks (`useState`, `useEffect`)

---

## 📦 Installation & Local Setup

Follow these step-by-step instructions to set up the development environment on your local machine:

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/staynest.git](https://github.com/your-username/staynest.git)
cd staynest

```
### 2. Install Dependencies
```bash
npm install
# or
yarn install

```
### 3. Configure Environment Variables
Create a .env.local file in the root directory of the project and define your backend service URI:
```env
NEXT_PUBLIC_SERVER_URI=[https://your-api-server.com/api](https://your-api-server.com/api)

```
### 4. Start the Development Server
```bash
npm run dev
# or
yarn dev

```
Open http://localhost:3000 in your web browser to explore the platform.
## 📂 Architecture & Key Component Mapping
```text
├── app/
│   ├── admin/
│   │   └── page.tsx--------- # AdminHome (Central Command Dashboard & Recharts implementation)
│   └── property/[id]/
│       └── page.tsx--------- # PropertyDetails Page (Individual asset layouts)
├── components/
│   └── ReviewSection.tsx---- # Role-based Review Form & Feedback Feed
├── lib/
│   ├── api/
│   │   └── reviews.ts------- # API Handlers (getReviews, submitReview connectors)
│   └── auth-client.ts------- # Session verification & Token extractor engine
└── public/

```
## 🔒 Security & Data Validation Guidelines
 * **Route Guards:** Intercepts unauthenticated sessions or invalid user roles instantly to prevent data leaks.
 * **Safe Parsers:** Applies native .trim() and Number() wrappers to client side data inputs before submitting payrolls to prevent DB errors.
 * **Formatted Outputs:** Financial sums and large data populations are cleanly evaluated using JavaScript toLocaleString() for professional output displays.
## 📝 License
This project is submitted as an assignment for evaluation. All rights reserved to the developer.

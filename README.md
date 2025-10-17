# WHLO - We Have Lift Off 🚀

WHLO is a full-stack application designed to help you turn your ambitious goals into actionable missions. Born from the idea that planning should be inspiring, WHLO provides a clear, structured system to take your ideas from imagination to launch.

This project was built as part of a hands-on exploration into modern, full-stack web development, combining a beautiful user interface with a robust backend and secure authentication.

## Core Features

Mission Management (CRUD): Create, read, update, and delete your high-level "Missions."

Action Item Tracking: Break down each Mission into small, manageable tasks and track their completion.

Secure Authentication: Magic link sign-in powered by NextAuth.js ensures each user's data is private and secure.

Responsive Design: A clean, minimalist interface that works beautifully on desktop and mobile.

## The WHLO Method

The application is built around a simple, three-step philosophy:

Imagine: Define your ultimate goals and start with the end in mind. This is your personal mission control.

Plan: Break down your mission into clear, daily action items. No long-term, far-off goals—just the next step.

Lift Off!: Take the first steps now with a clear daily dashboard. Your mission begins today.

## Tech Stack

This project was built with a modern, full-stack toolkit:

Framework: Next.js (with App Router)

Language: TypeScript

Styling: Tailwind CSS

UI Components: Shadcn/ui

Database ORM: Prisma

Database: PostgreSQL (hosted on Neon)

Authentication: NextAuth.js

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository:

git clone [https://github.com/hellodina/WHLO.git](https://github.com/hellodina/WHLO.git)
cd WHLO


2. Install dependencies:

npm install


3. Set up your environment variables:

**For Local Development:**
Create a new file named .env in the root of your project and add:

```
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="your-super-secret-auth-secret"
NEXTAUTH_URL="http://localhost:3000"
```

**For Vercel Deployment:**
In your Vercel project settings, add these environment variables:

```
DATABASE_URL=your-neon-database-url
NEXTAUTH_SECRET=your-super-secret-auth-secret
NEXTAUTH_URL=https://your-app-name.vercel.app
```

**Important:** Make sure to use the same NEXTAUTH_SECRET in both local and production environments.


4. Push the database schema:
This command syncs your Prisma schema with your Neon database.

npx prisma db push


5. Run the development server:

npm run dev


Open http://localhost:3000 with your browser to see the result.

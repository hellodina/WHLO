# WHLO - We Have Lift Off 🚀

WHLO is a full-stack application designed to help you turn your ambitious goals into actionable missions. Born from the idea that planning should be inspiring, WHLO provides a clear, structured system to take your ideas from imagination to launch.This project was built as part of a hands-on exploration into modern, full-stack web development, combining a beautiful user interface with a robust backend and secure authentication.

Core FeaturesMission Management (CRUD): Create, read, update, and delete your high-level "Missions."Action Item Tracking: Break down each Mission into small, manageable tasks and track their completion.Secure Authentication: Magic link sign-in powered by NextAuth.js ensures each user's data is private and secure.

Responsive Design: A clean, minimalist interface that works beautifully on desktop and mobile.The WHLO MethodThe application is built around a simple, three-step philosophy: 

Imagine: Define your ultimate goals and start with the end in mind. This is your personal mission control.
Plan: Break down your mission into clear, daily action items. No long-term, far-off goals—just the next step.
Lift Off!: 

Take the first steps now with a clear daily dashboard. Your mission begins today.Tech StackThis project was built with a modern, full-stack toolkit:Framework: Next.js (with App Router)Language: TypeScriptStyling: Tailwind CSSUI Components: Shadcn/uiDatabase ORM: PrismaDatabase: PostgreSQL (hosted on Neon)Authentication: NextAuth.js

## Getting Started

To run this project locally, follow these steps:Clone the repository:git clone [https://github.com/hellodina/WHLO.git](https://github.com/hellodina/WHLO.git) <br>
cd WHLO  <br>
Install dependencies:npm install  <br>
Set up your environment variables:Create a new file named .env in the root of your project.Add the necessary variables for your database connection and authentication providers. You'll need to get your connection string from Neon.DATABASE_URL="postgresql://..."  <br>
AUTH_SECRET="your-super-secret-auth-secret" <br> 
### Add any other variables for your email provider if setting up magic links
Push the database schema:This command will sync your prisma/schema.prisma file with your Neon database, creating the necessary tables.npx prisma db push  <br>
Run the development server:npm run dev  <br>
Open http://localhost:3000 with your browser to see the result.

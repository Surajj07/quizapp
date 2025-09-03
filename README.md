Quiz App

A simple quiz application built with Next.js (App Router), MongoDB Atlas, and Netlify.

Features
Next.js (App Router, Server Actions, API routes)
MongoDB Atlas for database
Netlify for deployment
Form submission with validation
Nodemailer integration for sending recommendations via email



Setup
1. Clone repo
git clone https://github.com/your-username/quizapp.git
cd quizapp

2. Install dependencies
npm install

3. Create .env.local
Add your environment variables:

MONGO_URI="your-mongodb-atlas-uri"
GMAIL_USER="your-gmail@example.com"   # optional (if email enabled)
GMAIL_PASS="your-app-password"        # optional


Development
Run local dev server:
npm run dev

Build and test production locally:
npm run build
npm run start


Deployment (Netlify)
1. Push to GitHub
git init
git remote add origin https://github.com/your-username/quizapp.git
git add .
git commit -m "Initial commit"
git push -u origin main

2. Connect GitHub repo to Netlify
Go to Netlify Dashboard
Click New site from Git
Select your repo

3. Set environment variables
In Netlify → Site Settings → Environment Variables add:

MONGO_URI=your-mongodb-atlas-uri
GMAIL_USER=...
GMAIL_PASS=...

4. Build settings
Build command: npm run build
Publish directory: .next

Netlify will handle Next.js serverless functions automatically.

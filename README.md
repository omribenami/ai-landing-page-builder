# AI‑Powered Landing Page Builder

This repository contains a prototype of an AI‑powered landing page builder. It is divided into a **frontend** (React) and a **backend** (Node.js/Express). The application allows non‑technical users to generate and customize a landing page using GPT‑4, schedule appointments via Google Calendar, and send WhatsApp confirmation messages via Twilio.

## Project structure

```
project-root/
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── pages/
│       ├── components/
│       ├── services/
│       └── hooks/
├── backend/
│   ├── package.json
│   └── src/
│       ├── app.js
│       ├── routes/
│       │   └── generate.js
│       ├── services/
│       │   ├── calendarService.js
│       │   ├── chatService.js
│       │   └── whatsappService.js
│       ├── controllers/
│       ├── models/
│       └── middlewares/
├── .env.example
└── README.md
```

## Getting started

1. **Install dependencies**

   ```bash
   cd frontend
   npm install

   cd ../backend
   npm install
   ```

2. **Set up environment variables**

   Copy `.env.example` to `.env` and provide your own API keys and credentials:

   - `OPENAI_API_KEY` – your OpenAI API key.
   - Google OAuth credentials for Calendar API.
   - Twilio WhatsApp credentials.
   - `DATABASE_URL` if you connect to a database.

3. **Run the backend**

   ```bash
   cd backend
   npm run dev
   ```

   The backend will start on port `4000` by default.

4. **Run the frontend**

   ```bash
   cd frontend
   npm run dev
   ```

   The frontend will start on port `3000` by default and proxy API requests to the backend.

## Deployment

To deploy a scalable version of this application:

- **Frontend** – host the React app on **Vercel** or **Netlify**. Both platforms support automatic builds from GitHub and scale with traffic.
- **Backend** – deploy the Express server on **Render**, **Railway** or **AWS Amplify**. These platforms provide free tiers and auto‑scaling.
- **Database & Storage** – use a managed PostgreSQL service (e.g., Supabase, Render) and an S3‑compatible object store.

You can connect your GitHub repository to these services so that each push triggers a build and deploy.

## Notes

- This is a prototype and lacks persistence; you should implement database models and authentication middleware based on your needs.
- When deploying, secure your API keys and environment variables. Never commit secrets to the repository.

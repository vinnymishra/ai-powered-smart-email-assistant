# AI-Powered Email Assistant

A responsive AI email-reply generator that helps users turn an incoming email into a clear, context-aware draft. Users paste the original message, optionally select a writing tone, generate a reply through a backend API, and copy the result to their clipboard.

> This repository contains the **React frontend**. The screenshots supplied for this project show an email reply generator interface and an **AI Reply** action in a Gmail reply composer. The Gmail screenshot is treated as a product-use reference; this frontend is the standalone web interface and does not, by itself, implement a Gmail browser extension or inject buttons into Gmail.

## Features

- **Email input:** Paste the original email into a dedicated text area.
- **Tone selection:** Optionally choose Professional, Friendly, Formal, Casual, Appreciative, Apologetic, or Concise.
- **AI reply generation:** Sends the email content and selected tone to the configured backend.
- **Generated response panel:** Displays the returned reply in a readable, editable-looking preview area.
- **One-click copy:** Copies the generated response to the clipboard.
- **Responsive interface:** Designed for desktop and mobile screens.
- **Request feedback:** Loading state, validation, and readable error messages.

## Tech stack

- React 18
- Vite
- JavaScript (ES modules)
- CSS
- Lucide React icons
- Fetch API for backend communication

The supplied project folder is named `email-writer-sb`, which suggests a Spring Boot backend. The frontend is backend-agnostic and communicates over HTTP; the exact backend controller contract must be matched to the configuration below.

## Project structure

```text
ai-email-assistant-frontend/
├── public/                  # Static assets (add as needed)
├── src/
│   ├── App.jsx               # Email form, API request, reply display, copy action
│   ├── main.jsx              # React entry point
│   └── styles.css            # Responsive UI styles
├── .env.example              # Backend URL and endpoint configuration template
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Getting started

### Prerequisites

- Node.js 18 or later
- npm
- A running backend endpoint that accepts an email and returns generated reply text

### 1. Install dependencies

```bash
npm install
```

### 2. Configure the backend URL

Copy `.env.example` to `.env` in the frontend root:

```bash
cp .env.example .env
```

On Windows PowerShell, use:

```powershell
Copy-Item .env.example .env
```

Set the values to match your backend:

```env
VITE_API_BASE_URL=http://localhost:8080
VITE_GENERATE_ENDPOINT=/api/email/generate
```

Restart the Vite server after changing environment variables.

### 3. Start the frontend

```bash
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`).

### 4. Create a production build

```bash
npm run build
```

The optimized static site is written to `dist/`. Preview it locally with:

```bash
npm run preview
```

## Backend API contract

The frontend currently sends this JSON body using `POST`:

```json
{
  "emailContent": "The original email text goes here",
  "tone": "Professional"
}
```

When no tone is selected, `tone` is sent as `null`.

The frontend accepts a plain-text response or a JSON response containing one of these text fields:

```json
{
  "reply": "Hello, thank you for reaching out..."
}
```

It also recognizes `generatedReply`, `emailReply`, `content`, and `message` as alternative response property names.

**Important:** The endpoint path, request property names, authentication headers, and response field must match your actual Spring Boot implementation. Update `generateReply()` and `extractReply()` in `src/App.jsx` if your backend uses a different DTO or response structure. If the backend uses Spring Security, add the required authentication/token handling there. Configure CORS on the backend to allow the frontend origin (for local development, usually `http://localhost:5173`). Do not put API keys or model-provider secrets in frontend environment variables; keep those on the backend.

## How to use

1. Start the backend service.
2. Start the frontend using `npm run dev`.
3. Paste the email you received into **Original email content**.
4. Select a tone, or leave it blank to let the backend use its default.
5. Click **Generate reply**.
6. Review the generated response and choose **Copy reply**.
7. Paste the draft into your email client and review it before sending.

## Security and privacy considerations

- Do not commit `.env` files containing secrets.
- Keep AI-provider API keys on the backend, never in browser code.
- Avoid logging full email contents or generated replies unless required and disclosed.
- Review AI-generated content for accuracy, tone, and sensitive information before sending.
- Add authentication, rate limiting, and request-size limits on the backend before public deployment.

## Current scope and limitations

- This frontend requires a compatible backend to generate replies; it does not contain an AI model or generate replies locally.
- The backend endpoint shown above is a configurable integration assumption, not a verified endpoint from the supplied screenshots.
- Gmail composer integration is not implemented in this frontend.

## License

Add your preferred license before distributing this project. If you choose MIT, include a `LICENSE` file with the standard MIT license text and your copyright details.

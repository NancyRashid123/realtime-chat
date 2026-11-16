
# 💬 Real-Time Chat

A real-time messaging application built with **Next.js** and **TypeScript**, featuring live message updates powered by **Upstash Realtime** and a type-safe API layer.

[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=for-the-badge)](https://realtime-chat-zeta-one.vercel.app/)

![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
![Upstash](https://img.shields.io/badge/Upstash-00E9A3?logo=upstash&logoColor=black)

## ✨ Features

- Real-time message updates using Upstash Realtime.
- Redis-based data storage with Upstash.
- Type-safe API communication using Elysia and Eden.
- Input validation with Zod.
- Server-state management and synchronization with TanStack Query.
- Responsive interface built with Tailwind CSS.
- Toast notifications for user feedback.

## 🧰 Tech Stack

| Area | Technologies |
|---|---|
| Framework | Next.js, React, TypeScript |
| Styling | Tailwind CSS |
| API | Elysia, Eden |
| Real-time & Storage | Upstash Realtime, Upstash Redis |
| Data Fetching | TanStack Query |
| Validation | Zod |
| Utilities | date-fns, nanoid |
| Deployment | Vercel |

## 🔄 How It Works

1. The client submits a message through the application API.
2. The server validates the incoming data using Zod.
3. The message is stored using Upstash Redis.
4. Upstash Realtime publishes updates to connected clients.
5. TanStack Query helps keep client-side data synchronized.

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm
- An Upstash account and a Redis database.

### Installation

```bash
git clone https://github.com/NancyRashid123/realtime-chat.git
cd realtime-chat
npm install
```

### Environment Configuration

Create a `.env.local` file in the project root and add the Upstash credentials required by the application.

Use the exact environment variable names referenced in the source code.

Never commit private tokens or credentials.

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm run start
```

## ☁️ Deployment

Deployed on Vercel:

[Live Demo](https://realtime-chat-zeta-one.vercel.app/)

Add the required Upstash environment variables to the Vercel project settings.

## 👩‍💻 Author

**Nancy Rashid**

[GitHub](https://github.com/NancyRashid123)

[Repository](https://github.com/NancyRashid123/realtime-chat)


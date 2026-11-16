# Real-Time Chat

A real-time messaging application built with Next.js and a modern server/data layer. The project focuses on delivering a responsive chat experience with live updates.

## Live Demo

[Open Real-Time Chat](https://realtime-chat-zeta-one.vercel.app/)

## Features

- Real-time messaging experience.
- User-facing chat interface built with Next.js and React.
- Data fetching and server-state management with TanStack Query.
- Input and data validation with Zod.
- Redis integration through Upstash.
- Real-time event infrastructure using Upstash Realtime.
- Typed client/server communication using Elysia and Eden.
- Responsive interface with Tailwind CSS.
- Toast notifications for user feedback.

## Tech Stack

- **Framework:** Next.js App Router, React, TypeScript
- **Styling:** Tailwind CSS
- **Server/API:** Elysia, Eden
- **Data & Real-Time Infrastructure:** Upstash Redis, Upstash Realtime
- **Data Fetching:** TanStack Query
- **Validation:** Zod
- **Utilities:** date-fns, nanoid
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js
- npm
- Upstash Redis credentials and the environment configuration required by the project

### Installation

```bash
git clone https://github.com/NancyRashid123/realtime-chat.git
cd realtime-chat
npm install
```

### Environment Variables

Create a `.env` file and provide the Upstash Redis and other service credentials required by the application. Refer to the environment-variable references in the source code. Never commit secrets.

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

## Deployment

The application is deployed on Vercel: [realtime-chat-zeta-one.vercel.app](https://realtime-chat-zeta-one.vercel.app/).

## Author

**Nancy Rashid**  
[GitHub Profile](https://github.com/NancyRashid123)

"use client";

import { treaty } from "@elysia/eden";
import type { app } from "../app/api/[[...slugs]]/route";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "http://realtime-chat-zeta-one.vercel.app/api"
    : "http://localhost:3000";

export const api = treaty<typeof app>(baseUrl).api;
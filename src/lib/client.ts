"use client";

import { treaty } from "@elysia/eden";
import type { app } from "../app/api/[[...slugs]]/route";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://realtime-chat-git-main-nancyrashid123s-projects.vercel.app"
    : "http://localhost:3000";

export const api = treaty<typeof app>(baseUrl).api;
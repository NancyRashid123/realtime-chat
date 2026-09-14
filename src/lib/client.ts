import { treaty } from "@elysia/eden";
import type { app } from "../app/api/[[...slugs]]/route";

export const api = treaty<typeof app>("http://localhost:3000").api;
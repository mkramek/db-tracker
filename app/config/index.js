import * as dotenv from "dotenv";
dotenv.config();
import { z } from "zod";

const envSchema = z.object({
  SOURCE_DATABASE_URL: z.string().startsWith("postgres"),
  TARGET_DATABASE_URL: z.string().startsWith("mongodb"),
  CHANNEL_NAME: z.string().default("core_db_event"),
});

export const env = envSchema.parse(process.env);

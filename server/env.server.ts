import { z } from "zod";
import "dotenv/config";

export const env = z
  .object({
    OPENAI_API_KEY: z.string().min(1),
  })
  .parse(process.env);

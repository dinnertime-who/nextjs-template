import 'server-only';
import { z } from 'zod';

export const serverEnv = z
  .object({
    WEB_URL: z.coerce.string().readonly(),
  })
  .parse({
    WEB_URL: process.env.NEXT_PUBLIC_WEB_URL || 'http://localhost:3000',
  });

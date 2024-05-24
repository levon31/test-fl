// config.ts
import { defineConfig } from '@nestjs/config';

export default defineConfig({
  envFilePath: process.env.NODE_ENV === 'development' ? '.env.dev' : '.env',
});

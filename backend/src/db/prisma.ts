// src/db/prisma.ts
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client.js';

// 1. Create the standard Postgres connection pool 
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({ 
  connectionString 
});

// 2. Create the Prisma Adapter (prisma 7 made this mandatory)
const adapter = new PrismaPg(pool);

// 3. Pass the adapter to Prisma (This satisfies the "adapter" requirement!)
const prisma = new PrismaClient({ adapter });

export default prisma;
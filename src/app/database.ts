import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "~/schema";

export const client = postgres(process.env.DB_URL as string);

const db = drizzle(client, { schema });

export default db;

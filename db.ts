import { drizzle } from "drizzle-orm/expo-sqlite";
import * as schema from "./db/schema";
import { openDatabaseSync } from "expo-sqlite";

const expo = openDatabaseSync("cards.db");
const db = drizzle(expo, { schema });

export { db };
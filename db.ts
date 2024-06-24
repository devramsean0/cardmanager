import { drizzle } from "drizzle-orm/expo-sqlite";
import * as schema from "./db/schema";
import { deleteDatabaseSync, openDatabaseSync } from "expo-sqlite";

const expoDB = openDatabaseSync("cards.db");
const db = drizzle(expoDB, { schema });

export { expoDB, db };
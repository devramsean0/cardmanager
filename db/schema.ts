import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const collections = sqliteTable("collection", {
    name: text("name"),
    type: text("type").$type<"collection" | "deck">(),
})
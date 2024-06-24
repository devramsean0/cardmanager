import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

export const collections = sqliteTable("collection", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name"),
    type: text("type").$type<"collection" | "deck">(),
})

export const cards = sqliteTable("card", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name"),
    collectionId: integer('collection_id').references(() => collections.id),
    quantity: integer('quantity'),
    cardData: text('card_data').$type<'json'>(),
    type: text("type").$type<"card" | "token">(),
})

export const collectionRelation = relations(collections, ({ many }) => ({
    cards: many(cards)
}));

export const cardsRelations = relations(cards, ({ one }) => ({
    collection: one(collections, {
        fields: [cards.collectionId],
        references: [collections.id],
    })
}));
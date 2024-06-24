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

export const decks = sqliteTable("deck", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    format: text("format").$type<"standard" | "modern" | "legacy" | "vintage" | "pauper" | "commander" | "pioneer" | "historic" | "penny" | "brawl" | "duel" | "oldschool" | "premodern" | "frontier" | "future">(),
    collectionId: integer('collection_id').references(() => collections.id),
})

export const collectionRelation = relations(collections, ({ many, one }) => ({
    cards: many(cards),
    decks: one(decks)
}));

export const cardsRelations = relations(cards, ({ one }) => ({
    collection: one(collections, {
        fields: [cards.collectionId],
        references: [collections.id],
    })
}));
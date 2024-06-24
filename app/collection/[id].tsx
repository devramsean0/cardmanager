import { Layout } from "@/components/Layout";
import { router, useLocalSearchParams } from "expo-router";
import { Button, Modal, Text, View, TextInput } from 'react-native';
import { useEffect, useState } from "react";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { collections, cards, decks } from "@/db/schema";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Search } from "@/components/Search/search";

export default function CollectionScreen() {
    const { id } = useLocalSearchParams();
    const [collection, setCollection ] = useState<any>(null);
    const [showEditModal, toggleEditModal] = useState(false);
    const [existingCards, setCards] = useState<any[]>([]);
    const [showAddCardModal, toggleAddCardModal] = useState(false);
    const [isDeck, toggleDeck] = useState(false);
    const [cardName, setCardName] = useState('');
    const [cardQuantity, setCardQuantity] = useState(1);
    const [setupModalVisible, setSetupModalVisible] = useState(false);
    const [deckFormat, setFormat] = useState<any>('commander');
    useEffect(() => {
        const getCollection = async () => {
            const collection = await db.query.collections.findFirst({
                with: {
                    cards: true
                },
                where: eq(collections.id, Number(id))
            })
            setCollection(collection);
            setCards(collection?.cards || []);
            if (collection?.type == 'deck') toggleDeck(true);
        }
        getCollection();
        }, []);

    const deleteCollection = async () => {
        await db.delete(collections).where(eq(collections.id, Number(id)))
        router.push('/');
    }
    const addCard = async () => {
        const [list] = await db.insert(cards).values({ name: cardName, quantity: cardQuantity, collectionId: collection.id }).returning();
        if (list) {
            console.log('New card created:', list)
            setCards(prevCards => {
                const updatedCards = [...prevCards, list];
                console.log('Updated cards:', updatedCards);
                return updatedCards;
            });
        }
    }
    const deleteCard = async (cardId: number) => {
        await db.delete(cards).where(eq(cards.id, cardId));
        setCards(prevCards => prevCards.filter(card => card.id !== cardId));
    }
    const toggleDeckState = async () => {
        if (isDeck == false) {
            const [deck] = await db.insert(decks).values({ collectionId: collection.id }).returning();
            setCollection(await db.update(collections).set({ type: 'deck' }).where(eq(collections.id, collection.id)).returning());
            if (deck) {
                console.log('Collection upgraded to deck', deck);
                toggleDeck(true);
            }
        } else {
            const [deck] = await db.delete(decks).where(eq(decks.collectionId, collection.id)).returning();
            setCollection(await db.update(collections).set({ type: 'collection' }).where(eq(collections.id, collection.id)).returning());
            if (deck) {
                console.log('Deck downgraded to collection', deck);
                toggleDeck(false);
            }
        }
    }
    if (collection == null) return null;
    return (
        <Layout title="Collection">
            <Modal
                animationType="slide"
                transparent={false}
                visible={showEditModal}
                onRequestClose={() => {
                    toggleEditModal(false);
                }}
            >
                <SafeAreaView>
                    <View>
                        <Text>{collection.name}</Text>
                        <Text>{collection.type}</Text>
                    </View>
                </SafeAreaView>
            </Modal>
            <Modal
                animationType="slide"
                transparent={false}
                visible={showAddCardModal}
                onRequestClose={() => {
                    toggleAddCardModal(false);
                }}
            >
                <SafeAreaView>
                    <View>
                        <TextInput placeholder="Quantity" onChangeText={(val) => setCardQuantity(Number(val))} />
                        <Search onResultClick={async (id) => {
                            const res = await fetch(`https://api.scryfall.com/cards/${id}`);
                            const data = await res.json();
                            setCardName(data.name);
                        }} />
                    </View>
                    <Button title="Add" onPress={addCard} />
                </SafeAreaView>
            </Modal>
            <Modal
                animationType="slide"
                transparent={false}
                visible={setupModalVisible}
                onRequestClose={() => {
                    setSetupModalVisible(false);
                }}>
                    <Layout title="Setup Deck">
                        <View>
                            <TextInput placeholder="Format" onChangeText={setFormat}/>
                            <Button title="Setup" onPress={async () => {
                                const deck = await db.update(decks).set({ format: deckFormat }).where(eq(decks.collectionId, collection.id)).returning();
                                console.log('Deck setup:', deck);
                                setSetupModalVisible(false);
                            }} />
                        </View>
                        <Button title="Close" onPress={() => setSetupModalVisible(false)} />
                    </Layout>
                </Modal>
            <View className="flex flex-row justify-between">
                <FontAwesome name="edit" size={24} color="black" onPress={() => toggleEditModal(true)}/>
                <FontAwesome name="trash" size={24} color="black" onPress={deleteCollection} />
            </View>
            <Button title={isDeck ? 'Downgrade to collection' : 'Upgrade to deck'} onPress={toggleDeckState} />
            <Text>{collection.name} - {collection.type == "deck" ? `${collection.deck.format}` : `${collection.type}`}</Text>
            <View className="flex flex-col items-center">
                <Text className="text-lg">Cards</Text>
                <View>
                    <FontAwesome name="plus" size={24} color="black" onPress={() => toggleAddCardModal(true)}/>
                </View>
                {existingCards.map(card => (
                    <View className="flex flex-row gap-4" key={card.id}>
                        <Text>{card.quantity} - {card.name}</Text>
                        <FontAwesome name="trash" size={24} color="black" onPress={() => {
                            deleteCard(card.id);
                        }}/>
                    </View>
                ))}
            </View>
        </Layout>
    )
}
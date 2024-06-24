import { Layout } from "@/components/Layout";
import { Modal, Text, View, Button, TextInput } from 'react-native';
import { useState, useEffect } from "react";
import { db } from "@/db";
import { collections, decks } from "@/db/schema";
import { router, Link } from "expo-router";

export default function DecksScreen() {
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [existingCollections, setCollections] = useState<any[]>([]);
    const [collectionName, setCollectionName] = useState('Name');
    const [collectionType, setCollectionType] = useState<'collection' | 'deck'>('deck');

    const createCollection = async () => {
        try {
            const [collection] = await db.insert(collections).values({ name: collectionName, type: collectionType }).returning();
            console.log('New collection created:', collection);
            if (collection) {
                setCollections(prevCollections => {
                    const updatedCollections = [...prevCollections, collection];
                    console.log('Updated collections:', updatedCollections);
                    return updatedCollections;
                });
                const [deck] = await db.insert(decks).values({ collectionId: collection.id }).returning();
                console.log('New deck created:', deck);
            }
            setCreateModalVisible(false);
            router.push(`/collection/${collection.id}`);
        } catch (error) {
            console.error('Error creating collection:', error);
        }
    }

    const fetchCollections = async () => {
        const list = await db.query.collections.findMany();
        setCollections(list);
    }
    useEffect(() => { 
        fetchCollections();
    }, []);
    return (
        <Layout title="Decks">
            <Modal
                animationType="slide"
                transparent={false}
                visible={createModalVisible}
                onRequestClose={() => {
                    setCreateModalVisible(false);
                }}
            >
                <Layout title="Create Collection">
                    <View>
                        <TextInput placeholder="Name" onChangeText={setCollectionName}/>
                        <Button title="Create" onPress={createCollection} />
                    </View>
                    <Button title="Close" onPress={() => setCreateModalVisible(false)} />
                </Layout>
            </Modal>
            <Button title="Create Collection" onPress={() => setCreateModalVisible(true)} />
            <View>
                {existingCollections.filter((val) => val.type == "deck").map(collection => (
                    <Link key={collection.id} href={`/collection/${collection.id}`}>
                        <Text>{collection.name}</Text>
                    </Link>
                ))}
            </View>
        </Layout>
    );
}
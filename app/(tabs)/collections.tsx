import { Layout } from "@/components/Layout";
import { db } from "@/db";
import { collections } from "@/db/schema";
import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Modal, View, Text, TextInput } from 'react-native';

export default function CollectionScreen() {
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [existingCollections, setCollections] = useState<any[]>([]);
    const [collectionName, setCollectionName] = useState('Name');
    const [collectionType, setCollectionType] = useState<'collection' | 'deck'>('collection');

    const createCollection = async () => {
        const collection = await db.insert(collections).values({ name: collectionName, type: collectionType}).returning();
        //router.push(`/collection/${collection.id}`)
        setCollections([...existingCollections, collection]);
    }
    const fetchCollections = async () => {
        const list = await db.query.collections.findMany();
        setCollections(list);
    }
    useEffect(() => { 
        fetchCollections();
    }, []);

    return (
        <Layout title="Collection">
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
                {existingCollections.map(collection => (
                    <Link key={collection.id} href={`/collection/${collection.id}`}>
                        <Text>{collection.name}</Text>
                    </Link>
                ))}
            </View>
        </Layout>
    );
}
import { Layout } from "@/components/Layout";
import { router, useLocalSearchParams } from "expo-router";
import { Modal, Text, View } from 'react-native';
import { useEffect, useState } from "react";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { collections } from "@/db/schema";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CollectionScreen() {
    const { id } = useLocalSearchParams();
    const [collection, setCollection ] = useState<any>(null);
    const [showEditModal, toggleEditModal] = useState(false);
    useEffect(() => {
        const getCollection = async () => {
            const collection = await db.query.collections.findFirst({
                with: {
                    cards: true
                },
                where: eq(collections.id, Number(id))
            })
            setCollection(collection);
        }
        getCollection();
        }, []);

    const deleteCollection = async () => {
        await db.delete(collections).where(eq(collections.id, Number(id)))
        router.push('/');
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
            <View className="flex flex-row justify-between">
                <FontAwesome name="edit" size={24} color="black" onPress={() => toggleEditModal(true)}/>
                <FontAwesome name="trash" size={24} color="black" onPress={deleteCollection} />
            </View>
            <Text>{collection.name} - {collection.type}</Text>
        </Layout>
    )
}
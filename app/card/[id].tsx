import { Layout } from "@/components/Layout";
import { useLocalSearchParams, Link } from "expo-router";
import { useEffect, useState } from "react";
import { Text, Image, View} from 'react-native';

export default function CardIDScreen() {
    const { id } = useLocalSearchParams();
    const [card, setCard] = useState<any>(null);

    useEffect(() => {
        const getCard = async () => {
            const res = await fetch(`https://api.scryfall.com/cards/${id}`);
            const data = await res.json();
            setCard(data);
        }
        getCard();
    }, [])
    if (card == null) {
        return (
            <Layout title="Loading...">
                <Text>Loading...</Text>
            </Layout>
        );
    }
    return (
        <Layout title={card.name}>
            <View className="flex flex-row justify-center">
                <Image source={{ uri: card.image_uris.small }} style={{ width: 200, height: 300 }}/>
            </View>
            
            <Link href={card.scryfall_uri}>{card.name} {card.mana_cost ? `- ${card.mana_cost}` : null}</Link>
            <Text>{card.type_line}</Text>
            <Text>{card.oracle_text}</Text>
            <View className="flex flex-row justify-center">
                <Text>{String(card.rarity).toUpperCase()} - {String(card.set).toUpperCase()} - {card.collector_number} | {card.artist}</Text>
            </View>
        </Layout>
    );
}
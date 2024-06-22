import { Layout } from "@/components/Layout";
import { Text, View } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function DecksScreen() {
    return (
        <Layout title="Settings">
            <View className="flex flex-row justify-center m-4">
                <Link href="https://codeberg.org/devramsean0/cardmanager">
                    <FontAwesome name="github" size={48} />
                </Link>
            </View>
        </Layout>
    );
}
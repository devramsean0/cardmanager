import { Layout } from "@/components/Layout";
import { Text, View } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function DecksScreen() {
    return (
        <Layout title="Settings">
            <View className="flex flex-col align-center m-4">
                <View className="flex flex-row justify-center m-4">
                    <Link href="https://codeberg.org/devramsean0/cardmanager">
                        <FontAwesome name="github" size={48} />
                    </Link>
                </View>
                <Text className="text-xl">Import/export</Text>
                <View className="flex flex-row justify-center m-4 gap-4">
                    <FontAwesome name="upload" size={24} />
                    <FontAwesome name="download" size={24} />
                </View>
            </View>
        </Layout>
    );
}
import { Layout } from "@/components/Layout";
import { Text, View } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";

export default function DecksScreen() {
    return (
        <Layout title="Settings">
            <View className="flex flex-col justify-center m-4 border-gray">
                <FontAwesome name="github" size={48} />
                <FontAwesome name="linkedin" size={48} />
            </View>
        </Layout>
    );
}
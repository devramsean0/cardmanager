import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Link } from "expo-router";

export function Layout({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <SafeAreaView className="px-2">
            <View className="flex flex-row justify-between">
                <Link href="/">
                    <FontAwesome name="home" size={24} color="black" />
                </Link>
                <Text className="text-3xl">{title}</Text>
                <Link href="/search">
                    <FontAwesome name="search" size={24} color="black" />
                </Link>
            </View>
            {children}
        </SafeAreaView>
    );
}
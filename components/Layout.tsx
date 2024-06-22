import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export function Layout({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <SafeAreaView className="px-2">
            <View className="flex flex-row justify-between">
                <Text className="text-3xl">{title}</Text>
                <FontAwesome name="search" size={24} color="black" />
            </View>
            {children}
        </SafeAreaView>
    );
}
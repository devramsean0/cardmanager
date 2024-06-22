import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export function Layout({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <SafeAreaView style={{ flex: 1 }}>
        <View className="flex-row justify-between items-center p-4">
            <Text>{title}</Text>
            <FontAwesome name="search" size={24} color="black" />
        </View>
        {children}
        </SafeAreaView>
    );
}
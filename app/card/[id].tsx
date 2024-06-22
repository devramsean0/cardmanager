import { useLocalSearchParams } from "expo-router";
import { Text, View } from 'react-native';

export default function CardIDScreen() {
    const { id } = useLocalSearchParams();
    return (
        <View>
            <Text>Card ${id}</Text>
        </View>
    );
}
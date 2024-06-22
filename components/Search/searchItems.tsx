import { View, Text } from 'react-native';

export function SearchItems({ items, onResultClick } : { items: any[], onResultClick: (id: string) => void } ) {
    return (
        <View>
            {items.map((item) => (
                <Text key={item.id} onPress={() => onResultClick(item.id)}>{item.name}</Text>
            ))}
        </View>
    );
}
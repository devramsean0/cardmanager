import { View, Text } from 'react-native';

export function SearchItems({ items } : { items: any[] } ) {
    return (
        <View>
            {items.map((item) => (
                <Text key={item.id}>{item.name}</Text>
            ))}
        </View>
    );
}
import { View, Text, TextInput, Button, TextInputChangeEventData } from 'react-native';
import { useEffect, useState } from 'react';
import * as FileSystem from 'expo-file-system';
import { SearchItems } from './searchItems';

export function Search() {
    const [text, onChangeText] = useState('');
    const [items, setItems] = useState<any>([]);
    return (
        <>
            <View className="flex flex-row justify-between rounded-xl border-black border-2 p-2">
                <TextInput value={text} onChangeText={onChangeText}/>
                <Button title="Search" onPress={() => {
                    const getItems = async () => {
                        const res = await fetch(`https://api.scryfall.com/cards/search?q=${text}`);
                        const data = await res.json();
                        setItems(data.data);
                    }
                    getItems();
                }} />
            </View>
            <SearchItems items={items} />
        </>
    );
}
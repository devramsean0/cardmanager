import { View, Text, TextInput, Button } from 'react-native';
import { useState } from 'react';

export function Search() {
    const [text, onChangeText] = useState('');
    return (
        <View className="flex flex-row justify-between rounded-xl border-black border-2 p-2">
            <TextInput value={text} onChangeText={onChangeText}/>
            <Button title="Search" />
        </View>
    );
}
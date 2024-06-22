import { Layout } from "@/components/Layout";
import { Search } from "@/components/Search/search";
import { FontAwesome } from "@expo/vector-icons";
import { Redirect, useRouter } from "expo-router";
import { Text, View } from 'react-native';

export default function SearchScreen() {
    const router = useRouter();
    return (
        <Layout title="Search">
            <Search onResultClick={(id) => {
                router.replace(`/card/${id}`)
            }}/>

        </Layout>
    );
}
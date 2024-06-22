import { Layout } from "@/components/Layout";
import { Search } from "@/components/Search/search";
import { FontAwesome } from "@expo/vector-icons";
import { Text, View } from 'react-native';

export default function SearchScreen() {
    return (
        <Layout title="Search">
            <Search />
        </Layout>
    );
}
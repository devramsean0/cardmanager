import { HelloWave } from "@/components/HelloWave";
import { Layout } from "@/components/Layout";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from 'react-native';


export default function HomeScreen() {
  return (
    <Layout title="Home">
      <View className="flex flex-col justify-center m-4 border-gray">
        <HelloWave />
      </View>
    </Layout>
  );
}
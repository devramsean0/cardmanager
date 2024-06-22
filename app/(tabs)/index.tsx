import { HelloWave } from "@/components/HelloWave";
import { Layout } from "@/components/Layout";
import { SafeAreaView } from "react-native-safe-area-context";


export default function HomeScreen() {
  return (
    <Layout title="Home">
      <HelloWave />
    </Layout>
  );
}
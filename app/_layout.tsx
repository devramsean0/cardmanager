import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import * as FileSystem from 'expo-file-system';
import { FSDirs } from '@/constants/FSDirs';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [downloading, setDownloading] = useState(true);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    const downloadLocation = `${FSDirs.dataDump}/data.json`;
    const checkIfFileExists = async () => {
      try {
        const file = await FileSystem.getInfoAsync(downloadLocation);
        if (file.exists) {
          console.log('Data file exists')
          console.log(await FileSystem.readAsStringAsync(downloadLocation));
          setDownloading(false);
          return true;
        } else {
          return false;
        }
      } catch (e) {
        console.log(e);
      }
    };
    const downloadFile = async () => {
      try {
        const BulkDataFileRes = await fetch(`https://api.scryfall.com/bulk-data/oracle-cards`);
        const BulkDataFileData = await BulkDataFileRes.json();
        const file = await FileSystem.downloadAsync(
          BulkDataFileData.download_uri,
          downloadLocation
        );
        if (file.status === 200) {
          console.log('Data File downloaded');
          setDownloading(false);
        } else {
          console.log('Failed to download file');
          // TODO: Report this to user/US
        }
      } catch (e) {
        console.log(e);
      }
    }
    checkIfFileExists().then((exists) => {
      if (!exists) {
        downloadFile();
      }
    });
  }, [downloading]);
  if (!loaded) {
    return null;
  }
  if (downloading) {
    return (
      <SafeAreaView>
        <View>
          <Text className="flex flex-row justify-center">Downloading...</Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="search" options={{ headerShown: false}} />
      </Stack>
    </ThemeProvider>
  );
}

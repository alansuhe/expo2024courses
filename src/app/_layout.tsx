import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { useSettings, useWallpapers } from '@/store';
import { useStyle } from '@/style';
import { getBingWallPapers } from '@/api';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const { updateWallpapers } = useWallpapers()

  const [loaded, error] = useFonts({
    // SpaceMono: require('@assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  const [isWallpaperLoaded, setIsWallpaperLoaded] = useState(false)

  useEffect(() => {
    const loadWallpapers = async () => {
      const ws = await getBingWallPapers({ idx: 0, n: 7 })
      updateWallpapers(ws);
      setIsWallpaperLoaded(true)
    }
    loadWallpapers()
  }, [])

  useEffect(() => {
    if (loaded && isWallpaperLoaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded, isWallpaperLoaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  // const colorScheme = useColorScheme();

  const { isDark } = useSettings()

  const { colors } = useStyle()

  const theme = isDark ? DarkTheme : DefaultTheme

  const NavTheme = {
    ...theme,
    colors: {
      ...theme.colors,
      primary: colors.primary,
      background: colors.bg,
      card: colors.bg,
      text: colors.tint,
      border: colors.sub,
      notification: colors.primary,
    }
  }
  return (
    <ThemeProvider value={NavTheme}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        <Stack.Screen name="wallPaper" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}

import { Stack } from 'expo-router';
import { Colors, DisplayFont } from '../constants/theme';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: Colors.milk },
        headerTintColor: Colors.leaf,
        headerTitleStyle: { fontFamily: DisplayFont, color: Colors.ink },
        headerShadowVisible: false,
        contentStyle: { backgroundColor: Colors.milk },
      }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="menu" options={{ title: 'Menu' }} />
      <Stack.Screen name="details" options={{ title: 'Your drink' }} />
      <Stack.Screen name="order" options={{ title: 'Your order' }} />
      <Stack.Screen name="confirmation" options={{ title: 'Order placed', headerBackVisible: false }} />
    </Stack>
  );
}
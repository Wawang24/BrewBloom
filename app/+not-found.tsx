import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { Colors, DisplayFont } from '../constants/theme';

export default function NotFoundScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>This page isn't on the menu</Text>
      <Link href="/" style={styles.link}>Back to home</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, backgroundColor: Colors.milk },
  title: { fontFamily: DisplayFont, fontSize: 22, color: Colors.ink },
  link: { color: Colors.leaf, fontWeight: '700', fontSize: 16 },
});
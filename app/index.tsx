import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import PrimaryButton from '../components/PrimaryButton';
import { Colors, DisplayFont } from '../constants/theme';

const SPECIAL_URL = 'https://api.sampleapis.com/coffee/hot';

type Special = { title: string; description: string };

export default function HomeScreen() {
  const [special, setSpecial] = useState<Special | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    fetch(SPECIAL_URL)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setSpecial(data[new Date().getDate() % data.length]);
        } else {
          setFailed(true);
        }
      })
      .catch(() => setFailed(true));
  }, []);

  return (
    <View style={styles.screen}>
      <View style={styles.hero}>
        <Text style={styles.flower}>🌸</Text>
        <Text style={styles.title}>Brew & Bloom</Text>
        <Text style={styles.tagline}>Slow coffee, fresh flowers on every table.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Barista's pick today</Text>
        <Text style={styles.cardTitle}>
          {special ? special.title : failed ? 'Not available right now' : 'Loading...'}
        </Text>
        <Text style={styles.cardBody} numberOfLines={3}>
          {special
            ? special.description
            : failed
            ? 'Check your internet connection and reopen the app.'
            : 'Asking the barista...'}
        </Text>
      </View>

      <PrimaryButton title="See the menu" onPress={() => router.push('/menu')} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.milk, padding: 20, paddingTop: 64, gap: 20 },
  hero: { backgroundColor: Colors.petal, borderRadius: 32, padding: 28, paddingBottom: 32 },
  flower: { fontSize: 44 },
  title: { fontFamily: DisplayFont, fontSize: 46, color: Colors.ink, marginTop: 8, letterSpacing: -1 },
  tagline: { fontSize: 16, color: Colors.ink, marginTop: 6, lineHeight: 22 },
  card: { borderWidth: 1.5, borderColor: Colors.line, borderRadius: 20, padding: 18, gap: 4, backgroundColor: Colors.white },
  cardLabel: { fontSize: 13, color: Colors.inkSoft },
  cardTitle: { fontFamily: DisplayFont, fontSize: 22, color: Colors.leaf },
  cardBody: { fontSize: 14, color: Colors.inkSoft, lineHeight: 20 },
});
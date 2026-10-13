import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import DrinkBadge from '../components/DrinkBadge';
import { Colors, DisplayFont, peso } from '../constants/theme';
import { MENU } from '../constants/menu';

export default function MenuScreen() {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.heading}>What are you craving?</Text>

      {MENU.map((drink) => (
        <Link key={drink.id} href={{ pathname: '/details', params: { id: drink.id } }} asChild>
          <Pressable style={styles.row}>
            <DrinkBadge emoji={drink.emoji} tint={drink.tint} />
            <View style={styles.info}>
              <Text style={styles.name}>{drink.name}</Text>
              <Text style={styles.notes}>{drink.notes}</Text>
            </View>
            <Text style={styles.price}>{peso(drink.price)}</Text>
          </Pressable>
        </Link>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 20, paddingBottom: 40 },
  heading: { fontFamily: DisplayFont, fontSize: 28, color: Colors.ink, marginBottom: 8 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: Colors.line },
  info: { flex: 1, gap: 2 },
  name: { fontFamily: DisplayFont, fontSize: 18, color: Colors.ink },
  notes: { fontSize: 13, color: Colors.inkSoft, lineHeight: 18 },
  price: { fontSize: 15, fontWeight: '700', color: Colors.leaf },
});
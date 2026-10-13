import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import PrimaryButton from '../components/PrimaryButton';
import { Colors, DisplayFont, peso } from '../constants/theme';
import { SIZES, findDrink } from '../constants/menu';

export default function OrderScreen() {
  const { id, size, qty } = useLocalSearchParams<{ id?: string; size?: string; qty?: string }>();
  const [name, setName] = useState('');
  const [note, setNote] = useState('');

  const drink = findDrink(id);
  const quantity = qty ? Number(qty) : 1;

  if (!drink) {
    return (
      <View style={styles.center}>
        <Text style={styles.heading}>No drink in your order</Text>
        <PrimaryButton title="Back to menu" onPress={() => router.push('/menu')} />
      </View>
    );
  }

  const extra = SIZES.find((s) => s.label === size)?.extra ?? 0;
  const total = (drink.price + extra) * quantity;

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryTitle}>
          {quantity} × {drink.name} ({size ?? 'Small'})
        </Text>
        <Text style={styles.summaryTotal}>{peso(total)}</Text>
      </View>

      <Text style={styles.label}>Name for the cup</Text>
      <TextInput
        placeholder="Your name"
        placeholderTextColor={Colors.inkSoft}
        value={name}
        onChangeText={(text) => setName(text)}
        style={styles.input}
      />

      <Text style={styles.label}>Note for the barista (optional)</Text>
      <TextInput
        placeholder="Less ice, extra shot..."
        placeholderTextColor={Colors.inkSoft}
        value={note}
        onChangeText={(text) => setNote(text)}
        style={styles.input}
      />

      <PrimaryButton
        title="Place order"
        disabled={name.trim() === ''}
        onPress={() =>
          router.push({
            pathname: '/confirmation',
            params: { name: name.trim(), drink: drink.name, total: String(total), note },
          })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 20, gap: 10 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 16 },
  heading: { fontFamily: DisplayFont, fontSize: 24, color: Colors.ink },
  summary: { backgroundColor: Colors.petalSoft, borderRadius: 20, padding: 18, gap: 6, marginBottom: 8 },
  summaryTitle: { fontSize: 16, color: Colors.ink },
  summaryTotal: { fontFamily: DisplayFont, fontSize: 30, color: Colors.leaf },
  label: { fontFamily: DisplayFont, fontSize: 17, color: Colors.ink, marginTop: 6 },
  input: { backgroundColor: Colors.white, borderWidth: 1.5, borderColor: Colors.line, borderRadius: 14, paddingHorizontal: 16, paddingVertical: 12, fontSize: 16, color: Colors.ink, marginBottom: 8 },
});
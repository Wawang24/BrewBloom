import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import DrinkBadge from '../components/DrinkBadge';
import PrimaryButton from '../components/PrimaryButton';
import { Colors, DisplayFont, peso } from '../constants/theme';
import { SIZES, findDrink } from '../constants/menu';

export default function DetailsScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const drink = findDrink(id);

  const [size, setSize] = useState('Small');
  const [qty, setQty] = useState(1);

  if (!drink) {
    return (
      <View style={styles.center}>
        <Text style={styles.heading}>
          {id ? `We couldn't find a drink with id ${id}` : 'No drink selected'}
        </Text>
        <PrimaryButton title="Back to menu" onPress={() => router.push('/menu')} />
      </View>
    );
  }

  const extra = SIZES.find((s) => s.label === size)?.extra ?? 0;
  const total = (drink.price + extra) * qty;

  return (
    <View style={styles.screen}>
      <View style={styles.top}>
        <DrinkBadge emoji={drink.emoji} tint={drink.tint} size={110} />
        <Text style={styles.heading}>{drink.name}</Text>
        <Text style={styles.notes}>{drink.notes}</Text>
      </View>

      <Text style={styles.label}>Size</Text>
      <View style={styles.sizes}>
        {SIZES.map((s) => (
          <Pressable
            key={s.label}
            onPress={() => setSize(s.label)}
            style={[styles.sizeBtn, size === s.label ? styles.sizeActive : styles.sizeIdle]}>
            <Text style={size === s.label ? styles.sizeTextActive : styles.sizeText}>{s.label}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.label}>Quantity</Text>
      <View style={styles.counter}>
        <Pressable style={styles.countBtn} onPress={() => setQty(qty > 1 ? qty - 1 : 1)}>
          <Text style={styles.countText}>−</Text>
        </Pressable>
        <Text style={styles.qty}>{qty}</Text>
        <Pressable style={styles.countBtn} onPress={() => setQty(qty < 10 ? qty + 1 : qty)}>
          <Text style={styles.countText}>+</Text>
        </Pressable>
      </View>

      <Text style={styles.total}>{peso(total)}</Text>

      <PrimaryButton
        title="Continue to order"
        onPress={() =>
          router.push({ pathname: '/order', params: { id: drink.id, size, qty: String(qty) } })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 20, gap: 10 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 16 },
  top: { alignItems: 'center', gap: 6, marginBottom: 10 },
  heading: { fontFamily: DisplayFont, fontSize: 28, color: Colors.ink, textAlign: 'center' },
  notes: { fontSize: 14, color: Colors.inkSoft, textAlign: 'center' },
  label: { fontFamily: DisplayFont, fontSize: 18, color: Colors.ink, marginTop: 8 },
  sizes: { flexDirection: 'row', gap: 10 },
  sizeBtn: { flex: 1, paddingVertical: 12, borderRadius: 14, alignItems: 'center', borderWidth: 1.5 },
  sizeIdle: { borderColor: Colors.line, backgroundColor: Colors.white },
  sizeActive: { borderColor: Colors.leaf, backgroundColor: Colors.leaf },
  sizeText: { color: Colors.ink, fontWeight: '600' },
  sizeTextActive: { color: Colors.white, fontWeight: '700' },
  counter: { flexDirection: 'row', alignItems: 'center', gap: 22 },
  countBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.petalSoft, alignItems: 'center', justifyContent: 'center' },
  countText: { fontSize: 24, color: Colors.ink },
  qty: { fontSize: 22, fontWeight: '700', color: Colors.ink, minWidth: 24, textAlign: 'center' },
  total: { fontFamily: DisplayFont, fontSize: 34, color: Colors.leaf, marginVertical: 10 },
});
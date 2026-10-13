import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import PrimaryButton from '../components/PrimaryButton';
import { Colors, DisplayFont, peso } from '../constants/theme';

export default function ConfirmationScreen() {
  const { name, drink, total, note } = useLocalSearchParams<{
    name?: string;
    drink?: string;
    total?: string;
    note?: string;
  }>();

  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timerId = setInterval(() => {
      setSeconds((current) => current + 1);
    }, 1000);

    // Cleanup: stop the timer when this screen is removed
    return () => clearInterval(timerId);
  }, []);

  const mm = Math.floor(seconds / 60);
  const ss = seconds % 60;
  const clock = `${mm}:${ss < 10 ? '0' : ''}${ss}`;

  const status =
    seconds < 10 ? 'Grinding the beans' : seconds < 20 ? 'Pulling the shot' : 'Almost ready';

  return (
    <View style={styles.screen}>
      <Text style={styles.flower}>🌸</Text>
      <Text style={styles.heading}>Thank you, {name ? name : 'friend'}!</Text>
      <Text style={styles.body}>
        {drink ? drink : 'Your drink'} is on the way. Total: {total ? peso(Number(total)) : '-'}
      </Text>
      {note ? <Text style={styles.note}>Note: {note}</Text> : null}

      <View style={styles.timerBox}>
        <Text style={styles.clock}>{clock}</Text>
        <Text style={styles.status}>{status}</Text>
      </View>

      <PrimaryButton title="Back to home" tone="petal" onPress={() => router.push('/')} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, alignItems: 'stretch', justifyContent: 'center', gap: 14 },
  flower: { fontSize: 56, textAlign: 'center' },
  heading: { fontFamily: DisplayFont, fontSize: 30, color: Colors.ink, textAlign: 'center' },
  body: { fontSize: 16, color: Colors.inkSoft, textAlign: 'center', lineHeight: 22 },
  note: { fontSize: 14, color: Colors.inkSoft, textAlign: 'center' },
  timerBox: { backgroundColor: Colors.leaf, borderRadius: 24, paddingVertical: 24, alignItems: 'center', marginVertical: 10 },
  clock: { fontFamily: DisplayFont, fontSize: 52, color: Colors.white },
  status: { fontSize: 16, color: Colors.petal, marginTop: 4 },
});
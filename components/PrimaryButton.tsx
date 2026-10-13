import { Pressable, StyleSheet, Text } from 'react-native';
import { Colors } from '../constants/theme';

type Props = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  tone?: 'leaf' | 'petal';
};

export default function PrimaryButton({ title, onPress, disabled = false, tone = 'leaf' }: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, tone === 'petal' ? styles.petal : styles.leaf, disabled && styles.disabled]}>
      <Text style={[styles.text, tone === 'petal' && styles.textDark]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { paddingVertical: 15, borderRadius: 28, alignItems: 'center' },
  leaf: { backgroundColor: Colors.leaf },
  petal: { backgroundColor: Colors.petal },
  disabled: { opacity: 0.4 },
  text: { color: Colors.white, fontSize: 16, fontWeight: '700' },
  textDark: { color: Colors.ink },
});
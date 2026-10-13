import { Text, View } from 'react-native';

type Props = { emoji: string; tint: string; size?: number };

export default function DrinkBadge({ emoji, tint, size = 64 }: Props) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: tint,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={{ fontSize: size * 0.45 }}>{emoji}</Text>
    </View>
  );
}
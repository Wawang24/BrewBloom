import { Platform } from 'react-native';

export const Colors = {
  milk: '#FFF8F5',
  ink: '#26180F',
  inkSoft: '#7A675C',
  leaf: '#2F5D46',
  petal: '#F2B6C3',
  petalSoft: '#FBE3E8',
  line: '#EBDDD5',
  white: '#FFFFFF',
};

export const DisplayFont = Platform.select({
  ios: 'Georgia',
  android: 'serif',
  default: 'serif',
});

export const peso = (amount: number) => `₱${amount}`;
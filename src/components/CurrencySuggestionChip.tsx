import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../theme/colors';

interface Props {
  list: Array<{ currency: string; amount: number }>; // Miminum 3
  onPress: (amount: number) => void;
}

export const CurrencySuggestionChip: React.FC<Props> = ({ list, onPress }) => {
  return (
    <View style={styles.chipContainer}>
      {list.map((chip) => {
        return (
          <Pressable
            key={`${chip.currency}${chip.amount}`}
            onPress={() => onPress(chip.amount)}
            style={styles.chip}
          >
            <Text style={styles.chipText}>
              {chip.currency} {chip.amount.toLocaleString()}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  chipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    justifyContent: 'space-between',
    borderRadius: 4,
  },
  chip: {
    backgroundColor: '#EEFCF4',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  chipText: { color: Colors.accentGreenLight, fontFamily: '700' },
});

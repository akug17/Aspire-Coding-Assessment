import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CardProps } from '../types/Card';

interface Props {
  currentCardDetails: CardProps | undefined;
}

export const BalanceInfo = ({ currentCardDetails }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Available balance</Text>
      <View style={styles.row}>
        <Text style={styles.icon}>{currentCardDetails?.currency}</Text>
        <Text style={styles.amount}>
          {currentCardDetails?.availableBalance?.toLocaleString()}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 20, padding: 20 },
  label: { color: '#fff', fontSize: 16, marginBottom: 10 },
  row: { flexDirection: 'row', alignItems: 'center' },
  icon: {
    backgroundColor: '#01D167',
    color: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 14,
    marginRight: 10,
    fontFamily: '700',
  },
  amount: { color: '#fff', fontSize: 28, fontWeight: 'bold' },
});

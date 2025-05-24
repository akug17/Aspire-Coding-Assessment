import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated';

interface Props {
  currentLimit: number;
  maxLimit: number;
}

const SpendingLimit: React.FC<Props> = ({ currentLimit, maxLimit }) => {
  const progress = useMemo(
    () => Math.min(currentLimit / (maxLimit - 2), 1),
    [currentLimit, maxLimit]
  );

  return (
    <Animated.View
      exiting={FadeOutUp.duration(100)}
      entering={FadeInUp}
      style={styles.container}
    >
      <View style={styles.textRow}>
        <Text style={styles.label}>Debit card spending limit</Text>
        <Text style={styles.limitText}>
          <Text style={styles.current}>${currentLimit.toLocaleString()}</Text>
          <Text style={styles.separator}> | </Text>
          <Text style={styles.total}>${maxLimit.toLocaleString()}</Text>
        </Text>
      </View>

      <View style={styles.progressBarBackground}>
        <View
          testID="progress-fill"
          style={[
            styles.progressBarFill,
            {
              flex: progress,
              transform: [{ skewX: progress !== maxLimit ? '-30deg' : '0deg' }],
            },
          ]}
        />
        <View style={{ flex: 1 - progress }} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: '#000',
  },
  limitText: {
    fontSize: 14,
  },
  current: {
    color: '#01D167',
    fontWeight: '600',
  },
  separator: {
    color: '#BDBDBD',
  },
  total: {
    color: '#BDBDBD',
  },
  progressBarBackground: {
    height: 10,
    backgroundColor: '#E0F7EF',
    borderRadius: 20,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  progressBarFill: {
    backgroundColor: '#01D167',

    marginLeft: -2,
  },
});

export default React.memo(SpendingLimit);

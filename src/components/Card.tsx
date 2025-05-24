import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
} from 'react-native';
import { CardProps } from '../types/Card';
import { Colors } from '../theme/colors';
import { splitStringIntoChunks } from '../utils/cardUtils';
import Animated, {
  Extrapolation,
  FlipInEasyX,
  SharedValue,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

interface Props {
  card: CardProps;
  scrollX: SharedValue<number>;
  index: number;
}

const { width } = Dimensions.get('screen');

export const Card = ({ card, scrollX, index }: Props) => {
  const cardNumber = useMemo(() => {
    return splitStringIntoChunks(card.number).map((string, index) => {
      return (
        <Text key={string + index} style={styles.number}>
          {string}
          {'    '}
        </Text>
      );
    });
  }, [card.number]);

  const cardWidth = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * cardWidth.value,
      index * cardWidth.value,
      (index + 1) * cardWidth.value,
    ];
    const scale = interpolate(
      scrollX.value,
      inputRange,
      [0.6, 1, 0.6],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ scale }],
    };
  });

  return (
    <Animated.View entering={FlipInEasyX}>
      <Animated.View
        onLayout={(e) => (cardWidth.value = e.nativeEvent.layout.width)}
        style={[styles.cardMainContainer, animatedStyle]}
      >
        <View style={[styles.card, card.frozen && styles.frozen]}>
          <Image
            source={require('../assets/AspireLogo.png')}
            style={styles.aspireLogo}
          />
          <View style={styles.cardDetailsContainer}>
            <Text style={styles.name}>{card.name}</Text>
            <View style={styles.cardNumber}>{cardNumber}</View>
            <View style={styles.expiryCvvContainer}>
              <Text style={styles.expiry}>Thru: {card.expiry}</Text>
              <Text style={styles.cvv}>CVV: {card.cvv}</Text>
            </View>
          </View>
          <Image
            source={require('../assets/VisaLogo.png')}
            style={styles.visaLogo}
          />
        </View>
        <Pressable style={styles.toggleCardNumber}>
          <Image source={require('../assets/Group.png')} />
          <Text style={styles.cardNumberText}>Show card number</Text>
        </Pressable>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  aspireLogo: { alignSelf: 'flex-end' },
  cardNumber: { flexDirection: 'row', marginTop: 24 },
  visaLogo: {
    alignSelf: 'flex-end',
    marginBottom: 10,
    position: 'absolute',
    bottom: 10,
    right: 20,
  },
  cardMainContainer: {
    width: width,
    paddingVertical: 0,
    paddingHorizontal: 10,
  },
  expiryCvvContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  cardNumberText: {
    fontWeight: '700',
    color: Colors.accentGreenLight,
    marginStart: 4,
  },
  card: {
    backgroundColor: Colors.accentGreenLight,
    borderRadius: 10,
    padding: 20,
    height: '100%',
  },
  frozen: {
    opacity: 0.95,
    backgroundColor: Colors.gray500,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  number: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
    marginTop: 8,
  },
  expiry: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
  },
  freezeBtn: {
    color: '#00f',
    marginTop: 8,
  },
  toggleCardNumber: {
    position: 'absolute',
    backgroundColor: 'white',
    top: -33,
    right: 10,
    zIndex: -10,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  cardDetailsContainer: {
    marginTop: 14,
  },
  cvv: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
    marginStart: 30,
  },
});

import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { CardProps } from '../types/Card';
import { Colors } from '../theme/colors';
import { maskedCardNumber, splitStringIntoChunks } from '../utils/cardUtils';
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
  const [maskCardNumber, setMaskCardNumber] = useState(true);
  const cardNumber = useMemo(() => {
    const maskUnmaskedCardNumber = maskCardNumber
      ? maskedCardNumber(card.number)
      : card.number;

    return splitStringIntoChunks(maskUnmaskedCardNumber).map((string, i) => {
      return (
        <Text key={string + i} style={styles.number}>
          {string}
          {'    '}
        </Text>
      );
    });
  }, [card.number, maskCardNumber]);

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
      [0.8, 1, 0.8],
      Extrapolation.CLAMP
    );
    const marginTop = interpolate(
      scrollX.value,
      inputRange,
      [-30, -15, -30],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ scale }],
      marginTop,
    };
  });

  const animatedStyleShowHideCard = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * cardWidth.value,
      index * cardWidth.value,
      (index + 1) * cardWidth.value,
    ];
    const scale = interpolate(
      scrollX.value,
      inputRange,
      [0.9, 1, 0.9],
      Extrapolation.CLAMP
    );

    const margin = interpolate(
      scrollX.value,
      inputRange,
      [50, 0, 50],
      Extrapolation.CLAMP
    );
    const marginRight = interpolate(
      scrollX.value,
      inputRange,
      [25, 0, 25],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ scale }],
      marginTop: margin,
      marginRight: marginRight,
    };
  });

  return (
    <Animated.View entering={FlipInEasyX}>
      <Animated.View style={animatedStyleShowHideCard}>
        <TouchableOpacity
          onPress={() => {
            setMaskCardNumber((e) => !e);
          }}
          style={[styles.toggleCardNumber, animatedStyle]}
        >
          <Image source={require('../assets/Group.png')} />
          <Text style={styles.cardNumberText}>
            {maskCardNumber ? 'Show card number' : 'Hide card number'}
          </Text>
        </TouchableOpacity>
      </Animated.View>

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
    overflow: 'visible',
    marginTop: -15,
  },
  expiryCvvContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  cardNumberText: {
    fontWeight: '700',
    color: Colors.accentGreenLight,
    marginStart: 4,
    backgroundColor: 'yello',
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
    marginRight: 10,
    backgroundColor: 'white',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
    paddingTop: 10,
    alignSelf: 'flex-end',
    paddingHorizontal: 10,
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

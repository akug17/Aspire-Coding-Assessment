import React, { useMemo } from 'react';
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

interface Props {
  card: CardProps;
}

const { width } = Dimensions.get('screen');

export const Card = ({ card }: Props) => {
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

  return (
    <View style={styles.cardMainContainer}>
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
    </View>
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
    padding: 10,
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
    top: -25,
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

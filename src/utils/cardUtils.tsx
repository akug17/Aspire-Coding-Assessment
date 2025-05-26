import { Image } from 'react-native';
import { NAVIGATION_ROUTE_NAMES } from '../navigation/navigationRouteNames';
import { CardProps } from '../types/Card';

const splitStringIntoChunks = (str: string, chunkSize = 5) => {
  const chunks = [];
  for (let i = 0; i < str.length; i += chunkSize) {
    chunks.push(str.slice(i, i + chunkSize));
  }
  return chunks;
};

const generateCardNumber = () => {
  return Array(4)
    .fill(null)
    .map(() => Math.floor(1000 + Math.random() * 9000))
    .join(' ');
};

const generateCardExpiry = () => {
  return `${Math.floor(Math.random() * 12 + 1)}/2${Math.floor(
    Math.random() * 10
  )}`;
};

const generateCardCvv = () => {
  return Math.floor(100 + Math.random() * 900).toString();
};

const getIcon = (screenName: string) => {
  switch (screenName) {
    case NAVIGATION_ROUTE_NAMES.HOME:
      return <Image source={require('../assets/Home.png')} />;

    case NAVIGATION_ROUTE_NAMES.DEBIT_CARD:
      return <Image source={require('../assets/Card.png')} />;

    case NAVIGATION_ROUTE_NAMES.CREDIT:
      return <Image source={require('../assets/Credit.png')} />;

    case NAVIGATION_ROUTE_NAMES.PAYMENTS:
      return <Image source={require('../assets/Payments.png')} />;

    case NAVIGATION_ROUTE_NAMES.PROFILE:
      return <Image source={require('../assets/Account.png')} />;

    default:
      break;
  }
};

const validateSpendingAmount = (
  limit: string,
  currentVisibleCardData: CardProps
) => {
  if (parseInt(limit, 10) < currentVisibleCardData.currentSpentAmount) {
    return {
      msg: 'Limit cannot be less than current spent amount',
      error: true,
      buttonDisabled: true,
    };
  }

  return {
    msg: 'Here weekly means the last 7 days - not the calendar week',
    error: false,
    buttonDisabled: limit.length === 0 ? true : false,
  };
};
const maskedCardNumber = (cardNumber: string): string => {
  if (!cardNumber || cardNumber.length < 4) {
    return cardNumber;
  }

  const visibleDigits = cardNumber.slice(-4);
  const masked = cardNumber.slice(0, -4).replace(/\d/g, '•');

  return `${masked}${visibleDigits}`;
};

export {
  splitStringIntoChunks,
  generateCardNumber,
  generateCardExpiry,
  generateCardCvv,
  getIcon,
  validateSpendingAmount,
  maskedCardNumber,
};

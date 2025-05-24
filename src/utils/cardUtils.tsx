import { Image } from 'react-native';
import { NAVIGATION_ROUTE_NAMES } from '../navigation/navigationRouteNames';

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

export {
  splitStringIntoChunks,
  generateCardNumber,
  generateCardExpiry,
  generateCardCvv,
  getIcon,
};

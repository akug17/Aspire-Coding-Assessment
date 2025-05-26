import { CardProps } from '../types/Card';
import {
  generateCardCvv,
  generateCardExpiry,
  generateCardNumber,
} from '../utils/cardUtils';
export const cards: Array<CardProps> = [
  {
    id: Math.random().toString(36).substring(2, 11),
    expiry: generateCardExpiry(),
    frozen: false,
    name: 'Mark Henry',
    number: generateCardNumber(),
    cvv: generateCardCvv(),
    availableBalance: 3000,
    currency: 'S$',
    currentSpentAmount: 350,
    maxLimit: 500,
    spendingLimitEnabled: true,
  },
  {
    id: Math.random().toString(36).substring(2, 11),
    expiry: generateCardExpiry(),
    frozen: false,
    name: 'Akash Gupta',
    number: generateCardNumber(),
    cvv: generateCardCvv(),
    availableBalance: 300000,
    currency: 'S$',
    currentSpentAmount: 3000,
    maxLimit: 5000,
    spendingLimitEnabled: true,
  },
];

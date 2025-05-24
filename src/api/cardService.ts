import { CardProps } from '../types/Card';
import {
  generateCardCvv,
  generateCardExpiry,
  generateCardNumber,
} from '../utils/cardUtils';
import { cards } from './dummyData';

export const fetchInitialCards = (): Promise<CardProps[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(cards), 400));
};

export const createCard = (name: string): Promise<CardProps> => {
  const card: CardProps = {
    id: Math.random().toString(36).substring(2, 11),
    name,
    number: generateCardNumber(),
    expiry: generateCardExpiry(),
    frozen: false,
    cvv: generateCardCvv(),
    availableBalance: 4000,
    currentSpentAmount: 0,
    currency: 'S$',
    maxLimit: 5000,
  };
  return new Promise((resolve) => setTimeout(() => resolve(card), 4000));
};

export const freezeUnfreezeCard = ({
  id,
  freeze,
}: {
  id: string;
  freeze: boolean;
}): Promise<{ frozen: boolean; id: string }> => {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ id, frozen: freeze }), 100)
  );
};

import {
  fetchInitialCards,
  createCard,
  freezeUnfreezeCard,
} from '../cardService';
import {
  generateCardNumber,
  generateCardExpiry,
  generateCardCvv,
} from '../../utils/cardUtils';

jest.mock('../../utils/cardUtils', () => ({
  generateCardNumber: jest.fn(() => '1111 2222 3333 4444'),
  generateCardExpiry: jest.fn(() => '12/25'),
  generateCardCvv: jest.fn(() => '123'),
}));

jest.mock('../dummyData', () => ({
  cards: [
    {
      id: '1',
      name: 'Test Card 1',
      number: '1234 5678 9012 3456',
      expiry: '12/25',
      cvv: '123',
      frozen: false,
      availableBalance: 4000,
      currentSpentAmount: 0,
      currency: 'S$',
      maxLimit: 5000,
    },
  ],
}));

describe('Card Service API', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('fetchInitialCards', () => {
    it('should return cards after delay', async () => {
      const promise = fetchInitialCards();
      jest.advanceTimersByTime(400);
      const result = await promise;

      expect(result).toEqual([
        {
          id: '1',
          name: 'Test Card 1',
          number: '1234 5678 9012 3456',
          expiry: '12/25',
          cvv: '123',
          frozen: false,
          availableBalance: 4000,
          currentSpentAmount: 0,
          currency: 'S$',
          maxLimit: 5000,
        },
      ]);
    });

    it('should resolve after approximately 400ms', async () => {
      const start = Date.now();
      const promise = fetchInitialCards();
      jest.advanceTimersByTime(400);
      await promise;
      const duration = Date.now() - start;

      expect(duration).toBeGreaterThanOrEqual(400);
      expect(duration).toBeLessThan(450);
    });
  });

  describe('createCard', () => {
    it('should create a new card with generated values', async () => {
      const promise = createCard('New Card');
      jest.advanceTimersByTime(4000);
      const result = await promise;

      expect(result).toEqual({
        id: expect.any(String),
        name: 'New Card',
        number: '1111 2222 3333 4444',
        expiry: '12/25',
        cvv: '123',
        frozen: false,
        availableBalance: 4000,
        currentSpentAmount: 0,
        currency: 'S$',
        maxLimit: 5000,
      });

      expect(generateCardNumber).toHaveBeenCalled();
      expect(generateCardExpiry).toHaveBeenCalled();
      expect(generateCardCvv).toHaveBeenCalled();
    });

    it('should generate a random id between 2-11 characters', async () => {
      const promise = createCard('New Card');
      jest.advanceTimersByTime(4000);
      const result = await promise;

      expect(result.id.length).toBeGreaterThanOrEqual(2);
      expect(result.id.length).toBeLessThanOrEqual(11);
    });

    it('should resolve after approximately 4000ms', async () => {
      const start = Date.now();
      const promise = createCard('New Card');
      jest.advanceTimersByTime(4000);
      await promise;
      const duration = Date.now() - start;

      expect(duration).toBeGreaterThanOrEqual(4000);
      expect(duration).toBeLessThan(4050);
    });
  });

  describe('freezeUnfreezeCard', () => {
    it('should return the freeze status for a card', async () => {
      const promise = freezeUnfreezeCard({ id: '1', freeze: true });
      jest.advanceTimersByTime(100);
      const result = await promise;

      expect(result).toEqual({
        id: '1',
        frozen: true,
      });
    });

    it('should resolve after approximately 100ms', async () => {
      const start = Date.now();
      const promise = freezeUnfreezeCard({ id: '1', freeze: true });
      jest.advanceTimersByTime(100);
      await promise;
      const duration = Date.now() - start;

      expect(duration).toBeGreaterThanOrEqual(100);
      expect(duration).toBeLessThan(150);
    });

    it('should handle unfreeze request', async () => {
      const promise = freezeUnfreezeCard({ id: '1', freeze: false });
      jest.advanceTimersByTime(100);
      const result = await promise;

      expect(result).toEqual({
        id: '1',
        frozen: false,
      });
    });
  });
});

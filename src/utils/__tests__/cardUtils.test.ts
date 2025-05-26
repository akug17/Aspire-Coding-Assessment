import { CardProps } from '../../types/Card';
import {
  splitStringIntoChunks,
  generateCardNumber,
  generateCardExpiry,
  generateCardCvv,
  maskedCardNumber,
  validateSpendingAmount,
} from '../cardUtils';

const mockCardData: CardProps = {
  id: '1',
  name: 'John Doe',
  number: '1234567812345678',
  expiry: '12/30',
  frozen: false,
  cvv: '123',
  availableBalance: 1000,
  currency: '$',
  currentSpentAmount: 200,
  maxLimit: 1000,
  spendingLimitEnabled: true,
};

jest.mock('react-native', () => ({
  Image: jest.fn(() => null),
}));

describe('Utility Functions', () => {
  describe('splitStringIntoChunks', () => {
    it('should split string into chunks of specified size', () => {
      const result = splitStringIntoChunks('abcdefghijklm', 4);
      expect(result).toEqual(['abcd', 'efgh', 'ijkl', 'm']);
    });

    it('should use default chunk size of 5 when not specified', () => {
      const result = splitStringIntoChunks('abcdefghij');
      expect(result).toEqual(['abcde', 'fghij']);
    });

    it('should handle empty string', () => {
      const result = splitStringIntoChunks('', 3);
      expect(result).toEqual([]);
    });

    it('should handle string shorter than chunk size', () => {
      const result = splitStringIntoChunks('abc', 5);
      expect(result).toEqual(['abc']);
    });
  });

  describe('generateCardNumber', () => {
    it('should generate a card number with 4 groups of 4 digits', () => {
      const cardNumber = generateCardNumber();
      const parts = cardNumber.split(' ');

      expect(parts.length).toBe(4);
      parts.forEach((part) => {
        expect(part).toHaveLength(4);
        expect(Number(part)).toBeGreaterThanOrEqual(1000);
        expect(Number(part)).toBeLessThanOrEqual(9999);
      });
    });

    it('should generate different numbers on subsequent calls', () => {
      const number1 = generateCardNumber();
      const number2 = generateCardNumber();
      expect(number1).not.toBe(number2);
    });
  });

  describe('generateCardExpiry', () => {
    it('should generate a valid expiry date format', () => {
      const expiry = generateCardExpiry();
      const [month, year] = expiry.split('/');

      // Test month (1-12)
      expect(Number(month)).toBeGreaterThanOrEqual(1);
      expect(Number(month)).toBeLessThanOrEqual(12);

      // Test year (20-29)
      expect(year).toMatch(/^2\d$/);
      expect(Number(year)).toBeGreaterThanOrEqual(20);
      expect(Number(year)).toBeLessThanOrEqual(29);
    });
  });

  describe('generateCardCvv', () => {
    it('should generate a 3-digit CVV', () => {
      const cvv = generateCardCvv();
      expect(cvv).toHaveLength(3);
      expect(Number(cvv)).toBeGreaterThanOrEqual(100);
      expect(Number(cvv)).toBeLessThanOrEqual(999);
    });
  });
});

describe('validateSpendingAmount', () => {
  it('should return error if limit is less than spent amount', () => {
    const result = validateSpendingAmount('100', mockCardData);
    expect(result).toEqual({
      msg: 'Limit cannot be less than current spent amount',
      error: true,
      buttonDisabled: true,
    });
  });

  it('should return success message for valid limit', () => {
    const result = validateSpendingAmount('300', mockCardData);
    expect(result).toEqual({
      msg: 'Here weekly means the last 7 days - not the calendar week',
      error: false,
      buttonDisabled: false,
    });
  });

  it('should disable button if input is empty', () => {
    const result = validateSpendingAmount('', mockCardData);
    expect(result.buttonDisabled).toBe(true);
  });
});

describe('maskedCardNumber', () => {
  it('should mask all but last 4 digits', () => {
    const result = maskedCardNumber('1234567812345678');
    expect(result).toBe('••••••••••••5678');
  });
});

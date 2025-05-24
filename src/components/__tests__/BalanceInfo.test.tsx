import React from 'react';
import { render } from '@testing-library/react-native';
import { BalanceInfo } from '../BalanceInfo';
import { CardProps } from '../../types/Card';

describe('BalanceInfo', () => {
  it('renders the available balance and currency when data is provided', () => {
    const mockCardDetails: CardProps = {
      id: '1',
      name: 'Test Card',
      number: '1234 5678 9012 3456',
      expiry: '12/25',
      cvv: '123',
      frozen: false,
      availableBalance: 4000,
      currentSpentAmount: 0,
      currency: 'S$',
      maxLimit: 5000,
    };

    const { getByText } = render(
      <BalanceInfo currentCardDetails={mockCardDetails} />
    );

    expect(getByText('Available balance')).toBeTruthy();
    expect(getByText('S$')).toBeTruthy();
    expect(getByText('4000')).toBeTruthy();
  });

  it('renders nothing for currency and amount if currentCardDetails is undefined', () => {
    const { queryByText } = render(
      <BalanceInfo currentCardDetails={undefined} />
    );

    expect(queryByText('$')).toBeNull();
    expect(queryByText('4000')).toBeNull();
  });
});

import React from 'react';
import { render } from '@testing-library/react-native';
import DebitCardLimit from '../SpendingLimit';

describe('SpendingLimit', () => {
  it('renders label and formatted limits correctly', () => {
    const { getByText } = render(
      <DebitCardLimit currentLimit={3000} maxLimit={5000} />
    );

    expect(getByText('Debit card spending limit')).toBeTruthy();
    expect(getByText('$3,000')).toBeTruthy();
    expect(getByText('|')).toBeTruthy();
    expect(getByText('$5,000')).toBeTruthy();
  });

  it('calculates and renders correct progress bar width', () => {
    const { getByTestId } = render(
      <DebitCardLimit currentLimit={1000} maxLimit={5000} />
    );

    const fillBar = getByTestId('progress-fill');

    // Progress = 1000 / (5000 - 2) = 0.20008
    expect(fillBar.props.style.find((s: any) => s.flex)?.flex).toBeCloseTo(
      0.20008,
      2
    );
  });

  it('clamps progress to 1 if currentLimit > maxLimit', () => {
    const { getByTestId } = render(
      <DebitCardLimit currentLimit={10000} maxLimit={5000} />
    );

    const fillBar = getByTestId('progress-fill');

    expect(fillBar.props.style.find((s: any) => s.flex)?.flex).toBe(1);
  });
});

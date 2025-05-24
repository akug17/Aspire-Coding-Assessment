import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { SettingsOption } from '../SettingsOption';

describe('SettingsOption', () => {
  const mockIcon = require('../../assets/Card.png'); // Replace with actual path

  it('renders title if provided', () => {
    const { getByText } = render(
      <SettingsOption
        title="Top-up account"
        subtitle="Deposit money to your account to use with card"
        iconSrc={mockIcon}
      />
    );

    expect(getByText('Top-up account')).toBeTruthy();
  });

  it('renders subtitle if provided', () => {
    const { getByText } = render(
      <SettingsOption
        title="Top-up account"
        subtitle="Deposit money to your account to use with card"
        iconSrc={mockIcon}
      />
    );

    expect(
      getByText('Deposit money to your account to use with card')
    ).toBeTruthy();
  });

  it('renders switch and handles toggle', () => {
    const onToggleMock = jest.fn();

    const { getByRole } = render(
      <SettingsOption
        title="Top-up account"
        switchEnabled={true}
        onToggle={onToggleMock}
        iconSrc={mockIcon}
      />
    );

    const toggle = getByRole('switch');
    fireEvent(toggle, 'valueChange', false);

    expect(onToggleMock).toHaveBeenCalledWith(false);
  });

  it('renders switch and handles toggle when false', () => {
    const onToggleMock = jest.fn();

    const { getByRole } = render(
      <SettingsOption
        title="Top-up account"
        switchEnabled={false}
        onToggle={onToggleMock}
        iconSrc={mockIcon}
      />
    );

    const toggle = getByRole('switch');
    fireEvent(toggle, 'valueChange', true);

    expect(onToggleMock).toHaveBeenCalledWith(true);
  });
});

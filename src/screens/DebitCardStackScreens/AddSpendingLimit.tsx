import { Image, StyleSheet, Text, View } from 'react-native';
import { ScreenBackground } from '../../components/ScreenBackground';
import { CurrencyChip } from '../../components/CurrencyChip';
import { useSpendingLimit } from '../../hooks/useSpendingLimit';
import { Button } from '../../components/Button';

export const AddSpendingLimit = () => {
  const {
    updateSpendingLimit,
    setLimit,
    validateSpendingLimit,
    limit,
    spendingLimitLoading,
  } = useSpendingLimit();
  console.log(spendingLimitLoading, 'spendingLimitLoading');
  return (
    <ScreenBackground addSafeAreaPadding={false}>
      <Text style={styles.spendingLimit}>Spending Limit</Text>
      <View style={styles.subContainer}>
        <View style={styles.suggestionContainer}>
          <Image source={require('../../assets/pickupcar.png')} />
          <Text style={styles.suggsetionText}>
            Set a weekly debit card spending limit
          </Text>
        </View>
        <View>
          <CurrencyChip
            currency="S$"
            limit={limit}
            setLimit={setLimit}
            validateSpendingLimit={validateSpendingLimit}
          />
        </View>
        <Button
          text="Save"
          onPress={updateSpendingLimit}
          loading={spendingLimitLoading}
          disabled={validateSpendingLimit.buttonDisabled}
        />
      </View>
    </ScreenBackground>
  );
};

const styles = StyleSheet.create({
  spendingLimit: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    padding: 20,
  },
  subContainer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: 'white',
    flex: 1,
    marginTop: 40,
    padding: 30,
  },
  suggestionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  suggsetionText: {
    marginStart: 10,
  },
  inputContainer: {},
});

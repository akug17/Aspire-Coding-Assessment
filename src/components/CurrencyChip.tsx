import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Colors } from '../theme/colors';
import { CurrencySuggestionChip } from './CurrencySuggestionChip';
import { SpendingLimitValidation } from '../types/Card';

interface Props {
  currency: string;
  validateSpendingLimit: SpendingLimitValidation;
  setLimit: React.Dispatch<React.SetStateAction<string>>;
  limit: string;
}

export const CurrencyChip: React.FC<Props> = ({
  currency,
  validateSpendingLimit,
  setLimit,
  limit,
}) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.currencyContainer}>
          <Text style={styles.currencyText}>{currency}</Text>
        </View>
        <TextInput
          keyboardType="numeric"
          placeholder="Enter amount"
          style={styles.input}
          onChangeText={setLimit}
          value={limit}
        />
      </View>
      <View style={styles.divider} />
      <Text
        style={[
          validateSpendingLimit.error
            ? styles.errorText
            : styles.validationText,
        ]}
      >
        {validateSpendingLimit.msg}
      </Text>
      <CurrencySuggestionChip
        list={[
          { amount: 5000, currency: 'S$' },
          { amount: 10000, currency: 'S$' },
          { amount: 20000, currency: 'S$' },
        ]}
        onPress={(amount) => setLimit(amount.toString())}
      />
    </>
  );
};

const styles = StyleSheet.create({
  errorText: {
    fontSize: 12,
    color: 'red',
  },
  container: {
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  currencyText: {
    color: 'white',
    fontFamily: '700',
  },
  currencyContainer: {
    backgroundColor: Colors.accentGreenLight,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 4,
  },
  divider: {
    height: 0.2,
    width: '100%',
    backgroundColor: 'grey',
    marginVertical: 10,
  },
  input: {
    flex: 1,
    marginStart: 10,
    height: '100%',
  },
  validationText: {
    fontSize: 12,
    color: 'grey',
  },
});

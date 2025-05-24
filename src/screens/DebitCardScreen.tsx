import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { BalanceInfo } from '../components/BalanceInfo';
import { SettingsOption } from '../components/SettingsOption';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../theme/colors';
import { CardCarousel } from '../components/CardCarousel';
import { ScrollView } from 'react-native-gesture-handler';
import { useCards } from '../hooks/useCards';
import AddCardModal from '../components/AddCardModal';
import SpendingLimit from '../components/SpendingLimit';

const DebitCardScreen: React.FC = () => {
  const onPressSpendingLimit = () => {};

  const { top } = useSafeAreaInsets();
  const {
    cards,
    onScroll,
    currentVisibleCardData,
    addNewCard,
    addCardLoading,
    bottomSheetRef,
    onPressFreezeCard,
    flatlistRef,
    scrollX,
  } = useCards();

  return (
    <View style={styles.mainContainer}>
      <View style={[styles.backgroundContainer, { paddingTop: top }]}>
        <Text style={styles.title}>Debit Card</Text>
        <BalanceInfo currentCardDetails={currentVisibleCardData} />
      </View>
      <ScrollView
        nestedScrollEnabled
        bounces={false}
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.subContainer}>
          <CardCarousel
            cards={cards}
            onScroll={onScroll}
            flatlistRef={flatlistRef}
            scrollX={scrollX}
          />
          {currentVisibleCardData && !currentVisibleCardData?.frozen && (
            <SpendingLimit
              currentLimit={currentVisibleCardData.currentSpentAmount}
              maxLimit={currentVisibleCardData.maxLimit}
            />
          )}
          <SettingsOption
            title="Top-up account"
            subtitle="Deposit money to your account to use with card"
            iconSrc={require('../assets/insight.png')}
          />
          <SettingsOption
            title="Weekly spending limit"
            subtitle="Your weekly spending limit is S$ 5,000"
            onToggle={onPressSpendingLimit}
            iconSrc={require('../assets/Transfer-2.png')}
          />
          <SettingsOption
            title="Freeze card"
            subtitle="Your debit card is currently active"
            iconSrc={require('../assets/Transfer-3.png')}
            switchEnabled={currentVisibleCardData?.frozen}
            disablePress
            onToggle={(toggleValue) => {
              console.log('toggle');
              onPressFreezeCard(toggleValue, currentVisibleCardData?.id);
            }}
          />
          <SettingsOption
            title="Get a new card"
            subtitle="This creates a new card"
            iconSrc={require('../assets/Transfer-1.png')}
            onPress={() => bottomSheetRef.current?.expand()}
          />
          <SettingsOption
            title="Deactivated cards"
            subtitle="Your previously deactivated cards"
            iconSrc={require('../assets/Transfer.png')}
          />
        </View>
      </ScrollView>
      <AddCardModal
        addCardLoading={addCardLoading}
        addNewCard={addNewCard}
        bottomSheetRef={bottomSheetRef}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    paddingTop: '83%',
    flexGrow: 1,
    overflow: 'visible',
  },
  subContainer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: 'white',
    flex: 1,
  },
  infoContainer: {},
  mainBg: {
    backgroundColor: Colors.primaryBlueLight,
    flex: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  wrapper: { flex: 1, backgroundColor: '#fff' },
  container: { padding: 20 },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    padding: 20,
  },
  backgroundContainer: {
    backgroundColor: Colors.primaryBlueLight,
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  },
  mainContainer: { flex: 1 },
});

export default DebitCardScreen;

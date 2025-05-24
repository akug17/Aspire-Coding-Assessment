import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import {
  addCardSaga,
  loadInitialCardsSaga,
  toggleFreezeCardSaga,
} from '../store/slices/cardSlice';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Dimensions,
  Keyboard,
  LayoutAnimation,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import { FlatList } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

export const useCards = () => {
  const { cards, loading, error, addCardLoading, addCardError } = useSelector(
    (state: RootState) => state.card
  );

  const bottomSheetRef = useRef<BottomSheet>(null);
  const flatlistRef = useRef<FlatList>(null);

  const [currentVisibleCard, setCurrentVisibleCard] = useState<number | null>(
    null
  );
  const dispatch = useDispatch();

  // Hits BE and loads initial cards for a user
  const fetchCards = () => {
    dispatch(loadInitialCardsSaga());
  };

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / width);
    setCurrentVisibleCard(Math.abs(newIndex));
  };

  const currentVisibleCardData = useMemo(() => {
    if (currentVisibleCard !== null) {
      return cards[currentVisibleCard];
    }
    return;
  }, [cards, currentVisibleCard]);

  const addNewCard = (name: string) => {
    LayoutAnimation.easeInEaseOut();
    dispatch(addCardSaga(name));
  };

  const onPressFreezeCard = (switchValue: boolean, cardId?: string) => {
    if (!cardId) {
      return;
    }
    LayoutAnimation.easeInEaseOut();
    dispatch(toggleFreezeCardSaga({ id: cardId, freeze: switchValue }));
  };

  useEffect(() => {
    const lastCard = cards[cards.length - 1];

    if (!addCardLoading && !addCardError && lastCard) {
      bottomSheetRef.current?.close();
      Keyboard.dismiss();
    }
  }, [cards, addCardLoading, addCardError]);

  useEffect(() => {
    // Sets initial card viewed
    if (currentVisibleCard !== 0 && cards.length > 0) {
      setCurrentVisibleCard(0);
    } else {
      if (cards.length > 0) {
        // Making it async since Flatlist needs to render the added item first
        setTimeout(() => {
          flatlistRef.current?.scrollToIndex({
            index: cards.length - 1,
            animated: true,
          });
        }, 200);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards.length]);

  useEffect(() => {
    fetchCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    cards,
    loading,
    error,
    currentVisibleCard,
    onScroll,
    currentVisibleCardData,
    addNewCard,
    addCardLoading,
    addCardError,
    bottomSheetRef,
    onPressFreezeCard,
    flatlistRef,
  };
};

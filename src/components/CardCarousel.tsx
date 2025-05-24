import React, { useCallback } from 'react';

import { Card } from './Card';
import { CardProps } from '../types/Card';
import { FlatList } from 'react-native-gesture-handler';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
} from 'react-native';

interface Props {
  cards: CardProps[];
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  flatlistRef: React.RefObject<FlatList<any> | null>;
}

export const CardCarousel = ({ cards, onScroll, flatlistRef }: Props) => {
  const renderItem = useCallback(({ item }: { item: CardProps }) => {
    return <Card card={item} />;
  }, []);

  const keyExtractor = (item: CardProps) => item.id;

  return (
    <FlatList
      data={cards}
      ref={flatlistRef}
      keyExtractor={keyExtractor}
      horizontal
      showsHorizontalScrollIndicator={false}
      nestedScrollEnabled
      style={styles.flatlistStyle}
      pagingEnabled
      renderItem={renderItem}
      onScroll={onScroll}
      scrollEventThrottle={16}
      bounces={false}
    />
  );
};

const styles = StyleSheet.create({
  flatlistStyle: {
    overflow: 'visible',
    marginTop: -100,
    marginBottom: 20,
    height: 200,
  },
});

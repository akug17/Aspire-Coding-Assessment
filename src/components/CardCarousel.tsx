import React, { useCallback } from 'react';

import { Card } from './Card';
import { CardProps } from '../types/Card';
import { FlatList } from 'react-native-gesture-handler';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
} from 'react-native';
import Animated, { SharedValue } from 'react-native-reanimated';
interface Props {
  cards: CardProps[];
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  flatlistRef: React.RefObject<FlatList<any> | null>;
  scrollX: SharedValue<number>;
}

export const CardCarousel = ({
  cards,
  onScroll,
  flatlistRef,
  scrollX,
}: Props) => {
  const renderItem = useCallback(
    ({ item, index }: { item: CardProps; index: number }) => {
      return <Card card={item} scrollX={scrollX} index={index} />;
    },
    [scrollX]
  );

  const keyExtractor = (item: CardProps) => item.id;

  return (
    <Animated.FlatList
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

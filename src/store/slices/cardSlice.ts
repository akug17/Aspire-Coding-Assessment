import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CardProps } from '../../types/Card';

interface CardState {
  cards: CardProps[];
  loading: boolean;
  error?: string;
  addCardLoading: boolean;
  addCardError?: string;
  freezeCardLoading: boolean;
  freezeCardError?: string;
}

const initialState: CardState = {
  cards: [],
  loading: true,
  error: undefined,
  addCardLoading: false,
  addCardError: undefined,
  freezeCardLoading: false,
  freezeCardError: undefined,
};

export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    setCards: (state, action: PayloadAction<CardProps[]>) => {
      state.cards = action.payload;
      state.loading = false;
    },
    addCard: (state, action: PayloadAction<CardProps>) => {
      state.cards.push(action.payload);
      state.addCardLoading = false;
      state.addCardError = undefined;
    },
    toggleFreeze: (state, action: PayloadAction<string>) => {
      const card = state.cards.find((c) => c.id === action.payload);
      if (card) {
        card.frozen = !card.frozen;
      }
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    loadInitialCardsSaga: (state) => {
      state.loading = true;
      state.error = undefined;
    },
    addCardSaga: (state, _action: PayloadAction<string>) => {
      state.addCardError = undefined;
      state.addCardLoading = true;
    },
    toggleFreezeCardSaga: (
      state,
      _action: PayloadAction<{ id: string; freeze: boolean }>
    ) => {
      state.freezeCardError = undefined;
      state.freezeCardLoading = false;
    },
    toggleFreezeSuccess: (state, action) => {
      console.log('toggleFreezeSuccess');
      const card = state.cards.findIndex((c) => c.id === action.payload.id);
      console.log(action.payload, 'action', state.cards);
      if (card !== -1) {
        console.log(card, 'CARDF VALUE', state.cards);
        state.cards[card].frozen = action.payload.frozen;
      }
      state.loading = false;
    },
    toggleFreezeFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setAddCardLoading: (state, action: PayloadAction<boolean>) => {
      state.addCardLoading = action.payload;
    },
    setAddCardError: (state, action: PayloadAction<string>) => {
      state.addCardError = action.payload;
    },
  },
});

export const {
  addCard,
  toggleFreeze,
  loadInitialCardsSaga,
  addCardSaga,
  setCards,
  setError,
  setAddCardLoading,
  setAddCardError,
  toggleFreezeSuccess,
  toggleFreezeCardSaga,
  toggleFreezeFailure,
} = cardSlice.actions;

export default cardSlice.reducer;

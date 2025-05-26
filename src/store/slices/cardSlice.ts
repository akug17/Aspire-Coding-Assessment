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
  spendingLimitLoading: boolean;
  spendingLimitError?: string;
  spendingLimitSuccess: boolean;
}

const initialState: CardState = {
  cards: [],
  loading: true,
  error: undefined,
  addCardLoading: false,
  addCardError: undefined,
  freezeCardLoading: false,
  freezeCardError: undefined,
  spendingLimitLoading: false,
  spendingLimitError: undefined,
  spendingLimitSuccess: false,
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
      const card = state.cards.findIndex((c) => c.id === action.payload.id);
      if (card !== -1) {
        state.cards[card].frozen = action.payload.frozen;
      }
      state.freezeCardLoading = false;
    },
    toggleFreezeFailure: (state, action) => {
      state.freezeCardError = action.payload;
      state.freezeCardLoading = false;
    },
    updateSpendingLimitSaga: (
      state,
      _action: PayloadAction<{ id: string; spendingLimit: number }>
    ) => {
      state.spendingLimitError = undefined;
      state.spendingLimitSuccess = false;
      state.spendingLimitLoading = true;
    },
    spendingLimitSuccess: (
      state,
      action: PayloadAction<{ id: string; spendingLimit: number }>
    ) => {
      const card = state.cards.findIndex((c) => c.id === action.payload.id);
      if (card !== -1) {
        state.cards[card].maxLimit = action.payload.spendingLimit;
        state.cards[card].spendingLimitEnabled = true;
        state.spendingLimitSuccess = true;
      }
      state.spendingLimitLoading = false;
    },
    spendingLimitFailure: (state, action: PayloadAction<string>) => {
      state.spendingLimitLoading = false;
      state.spendingLimitSuccess = false;
      state.spendingLimitError = action.payload;
    },
    toggleSpendingLimitSaga: (
      _state,
      _action: PayloadAction<{ id: string; spendingLimitEnabled: boolean }>
    ) => {},
    toggleSpendingLimitSuccess: (
      state,
      action: PayloadAction<{ id: string; spendingLimitEnabled: boolean }>
    ) => {
      const card = state.cards.findIndex((c) => c.id === action.payload.id);
      if (card !== -1) {
        state.cards[card].spendingLimitEnabled =
          action.payload.spendingLimitEnabled;
      }
    },
    updateSpendingLimitSuccess: (state, action: PayloadAction<boolean>) => {
      state.spendingLimitSuccess = action.payload;
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
  updateSpendingLimitSaga,
  spendingLimitSuccess,
  updateSpendingLimitSuccess,
  toggleSpendingLimitSaga,
  toggleSpendingLimitSuccess,
} = cardSlice.actions;

export default cardSlice.reducer;

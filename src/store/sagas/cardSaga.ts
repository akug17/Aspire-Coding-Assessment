import { call, put, takeEvery, takeLeading } from 'redux-saga/effects';
import {
  createCard,
  fetchInitialCards,
  freezeUnfreezeCard,
} from '../../api/cardService';
import {
  addCard,
  addCardSaga,
  loadInitialCardsSaga,
  setAddCardError,
  setCards,
  setError,
  toggleFreezeCardSaga,
  toggleFreezeFailure,
  toggleFreezeSuccess,
} from '../slices/cardSlice';
import { CardProps } from '../../types/Card';

function* handleLoadInitialCards(): Generator<any, void, CardProps[]> {
  try {
    const cards = yield call(fetchInitialCards);
    yield put(setCards(cards));
  } catch (e) {
    yield put(setError('Failed to load cards'));
  }
}

function* handleAddCard(
  action: ReturnType<typeof addCardSaga>
): Generator<any, void, CardProps> {
  try {
    const card = yield call(createCard, action.payload);
    yield put(addCard(card));
  } catch (e) {
    yield put(setAddCardError('Something went wrong'));
  }
}

function* handleToggleFreeze(
  action: ReturnType<typeof toggleFreezeCardSaga>
): Generator<any, void, CardProps> {
  try {
    const updatedCard = yield call(freezeUnfreezeCard, action.payload);
    yield put(toggleFreezeSuccess(updatedCard));
  } catch (error) {
    yield put(toggleFreezeFailure('Something went wrong'));
  }
}

export function* cardSaga() {
  yield takeEvery(loadInitialCardsSaga.type, handleLoadInitialCards);
  yield takeLeading(addCardSaga.type, handleAddCard);
  yield takeLeading(toggleFreezeCardSaga.type, handleToggleFreeze);
}

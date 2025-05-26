import { call, put, takeEvery, takeLeading } from 'redux-saga/effects';
import {
  addUpdateSpendingLimit,
  createCard,
  fetchInitialCards,
  freezeUnfreezeCard,
  toggleSpendingLimit,
} from '../../api/cardService';
import {
  addCard,
  addCardSaga,
  loadInitialCardsSaga,
  setAddCardError,
  setCards,
  setError,
  spendingLimitSuccess,
  toggleFreezeCardSaga,
  toggleFreezeFailure,
  toggleFreezeSuccess,
  toggleSpendingLimitSaga,
  toggleSpendingLimitSuccess,
  updateSpendingLimitSaga,
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
): Generator<
  any,
  void,
  {
    frozen: boolean;
    id: string;
  }
> {
  try {
    const updatedCard = yield call(freezeUnfreezeCard, action.payload);
    yield put(toggleFreezeSuccess(updatedCard));
  } catch (error) {
    yield put(toggleFreezeFailure('Something went wrong'));
  }
}

function* handleUpdateSpendingLimit(
  action: ReturnType<typeof updateSpendingLimitSaga>
): Generator<any, void, { id: string; spendingLimit: number }> {
  try {
    const updatedCard = yield call(addUpdateSpendingLimit, action.payload);
    yield put(
      spendingLimitSuccess({
        id: updatedCard.id,
        spendingLimit: updatedCard.spendingLimit,
      })
    );
  } catch (error) {}
}

function* handleToggleSpendingLimit(
  action: ReturnType<typeof toggleSpendingLimitSaga>
): Generator<any, void, { spendingLimitEnabled: boolean; id: string }> {
  try {
    const spendingLimit = yield call(toggleSpendingLimit, action.payload);
    yield put(
      toggleSpendingLimitSuccess({
        id: spendingLimit.id,
        spendingLimitEnabled: spendingLimit.spendingLimitEnabled,
      })
    );
  } catch (e) {}
}

export function* cardSaga() {
  yield takeEvery(loadInitialCardsSaga.type, handleLoadInitialCards);
  yield takeLeading(updateSpendingLimitSaga.type, handleUpdateSpendingLimit);
  yield takeLeading(addCardSaga.type, handleAddCard);
  yield takeLeading(toggleFreezeCardSaga.type, handleToggleFreeze);
  yield takeLeading(toggleSpendingLimitSaga.type, handleToggleSpendingLimit);
}

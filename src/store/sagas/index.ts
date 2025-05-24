import { all } from 'redux-saga/effects';
import { cardSaga } from './cardSaga';

export default function* rootSaga() {
  yield all([cardSaga()]);
}
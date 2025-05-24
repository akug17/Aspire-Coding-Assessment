import { configureStore } from '@reduxjs/toolkit';
import cardReducer from './slices/cardSlice';
import rootSaga from './sagas';
import sagaMiddleware from './middleware/saga';

export const store = configureStore({
  reducer: {
    card: cardReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
 
});
sagaMiddleware.run(rootSaga)
// sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

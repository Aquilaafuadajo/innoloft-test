import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import productReducer from './productReducer';
import configReducer from './configReducer';

const store = configureStore({
  reducer: {
    product: productReducer,
    configuration: configReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export default store;

import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '@features/auth/authSlice';
import socketReducer from '@features/socket/socketSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    socket: socketReducer,
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

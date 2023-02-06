import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { RootState, AppThunk } from '@store/index';
import { loginWithEmail } from './authAPI';
import { ILoginSuccessResponse } from '@interfaces/auth';
import { AuthState } from '@interfaces/auth';
import AuthCookie from '@utils/authCookie';

const initialState: AuthState = {
  name: '',
  job: '',
  id: '',
  createdAt: '',
  submitting: false,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions.
  reducers: {
    // set user info after successful login
    setUserInfo: (state, action: PayloadAction<ILoginSuccessResponse>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.job = action.payload.job;
      state.createdAt = action.payload.createdAt;
      state.isAuthenticated = true;
    },

    // set submitting to true or false
    setSubmitting: (state, action: PayloadAction<boolean>) => {
      state.submitting = action.payload;
    },

    // logout and remove user details
    clearUser: (state) => {
      state.name = '';
      state.job = '';
      state.id = '';
      state.createdAt = '';
      state.isAuthenticated = false;
    },
  },
});

export const { setUserInfo, setSubmitting, clearUser } = authSlice.actions;

// -------------------------------------------SELECTORS---------------------------------------------

// The function below is called a selector and allows us to select a value from the state. Selectors
// can also be defined inline where they're used instead of in the slice file.
// Eg: `useAppSelector((state: RootState) => state.auth.name)`
export const selectName = (state: RootState): string => state.auth.name;

// ---------------------------------------------THUNKS----------------------------------------------

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const login =
  (userName: string, password: string): AppThunk =>
  async (
    dispatch,
    // getState
  ) => {
    dispatch(setSubmitting(true));

    const response: AxiosResponse<ILoginSuccessResponse> = await loginWithEmail(userName, password);
    console.log(response.data);

    dispatch(setSubmitting(false));
    dispatch(setUserInfo(response.data));
    // TODO: use this to store JWT, etc instead of name
    AuthCookie.setCookie(userName);
  };

export const logout = (): AppThunk => async (dispatch) => {
  dispatch(clearUser());
  AuthCookie.setCookie('');
};

export default authSlice.reducer;

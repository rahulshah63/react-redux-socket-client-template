import { createSlice } from '@reduxjs/toolkit';
import { ISocketState } from '@interfaces/socket';

const initialState: ISocketState = {
  socket: undefined,
  uid: '',
  users: [],
};

export const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
    setUid: (state, action) => {
      state.uid = action.payload as string;
    },
    setUsers: (state, action) => {
      state.users = action.payload as string[];
    },
    RemoveUser: (state, action) => {
      state.users = state.users.filter((user) => user !== action.payload);
    },
  },
});

export const { setSocket, setUid, setUsers, RemoveUser } = socketSlice.actions;
export default socketSlice.reducer;

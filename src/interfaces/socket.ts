import { Socket } from 'socket.io-client';

interface ISocketState {
  socket: Socket | undefined;
  uid: string;
  users: string[];
}

export type { ISocketState };

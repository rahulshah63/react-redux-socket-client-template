import localStorage from '@services/localstorage.service';
import { io, Socket } from 'socket.io-client';

let socket: SocketClient | null = null;
const reconnectionAttempt = 0;
class SocketClient {
  static getInstance: (url: string) => SocketClient;
  public socket: Socket;
  public socketUrl: string;

  constructor(baseURL = '') {
    this.socketUrl = `${process.env.REACT_APP_API_URL}io/game-play`;
    this.socket = io(this.socketUrl, {
      reconnectionAttempts: 5,
      reconnectionDelay: 5000,
      autoConnect: false,
    });
    // this.init();
  }

  public init = (): void => {
    const token = localStorage.get('token');
    this.socket.io.opts.extraHeaders = {
      Authorization: `Bearer ${token}`,
    };
    this.socket.connect();
  };

  public startSocketListner = (): void => {
    console.log('Socket', socket);
    this.init();
    if (this.socket) {
      this.socket.on('connect', () => {
        console.log('Socket connected');
      });

      /** Socket Disconnection Event */
      this.socket.on('disconnect', () => {
        console.log('Socket disconnected');
      });

      this.socket.on('connect_error', async (error) => {
        console.log('Socket Error while connecting. Trying again in 5sec....', error);
        // this.socket.close();
        // if (reconnectionAttempt < 5) {
        //   reconnectionAttempt += 1;
        // } else {
        //   this.socket.close();
        // }
      });

      this.socket.on('reconnect', () => {
        console.log('Socket Reconnect');
      });
      this.socket.on('reconnection_attempt', () => {
        // ...
      });
    }
  };

  public stopSocketListner = (): void => {
    this.socket.removeAllListeners();
  };
}

SocketClient.getInstance = (url: string) => {
  if (!socket) {
    socket = new SocketClient(url);
    return socket;
  } else return socket;
};

export default SocketClient;

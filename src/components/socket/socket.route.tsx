import { Component, FC, useEffect, useState } from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { useSocket } from '@hooks/useSocket';
import { useAppSelector, useAppDispatch } from '@store/hooks';
import { setSocket, setUid, setUsers, RemoveUser } from '@features/socket/socketSlice';

type IRouteProps = RouteProps & {
  component: typeof Component | FC;
};

export const SocketRoute: FC<IRouteProps> = ({ component: ChildComponent, ...rest }) => {
  //redux state and dispatch
  const dispatch = useAppDispatch();
  const socketState = useAppSelector((state) => state.socket);
  const [loading, setLoading] = useState(true);

  const socket = useSocket('ws://localhost:1337', {
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    autoConnect: false,
  });

  useEffect(() => {
    socket.connect();
    StartListeners();
  }, []);

  const StartListeners = () => {
    /** Sockect Connection Event */
    socket.on('connect', () => {
      console.log('connected');
      dispatch(setSocket(socket));
      SendHandshake();
    });

    /** Socket Disconnection Event */
    socket.on('disconnect', () => {
      console.log('Socket disconnected');
      dispatch(setSocket(undefined));
      setLoading(true);
    });

    /** User Connected Event */
    socket.on('user_connected', (users: string[]) => {
      console.info('User connected message received');
      dispatch(setUsers(users));
    });

    /** User Disconnected Event */
    socket.on('user_disconnected', (uid: string) => {
      console.info('User disconnected message received');
      dispatch(RemoveUser(uid));
    });

    //TODO: Add More Camping Events

    /** Connection / reconnection listeners */
    socket.io.on('reconnect', (attempt) => {
      console.info('Reconnected on attempt: ' + attempt);
      dispatch(setSocket(socket));
      SendHandshake();
    });

    socket.io.on('reconnect_attempt', (attempt) => {
      console.info('Reconnection Attempt: ' + attempt);
    });

    socket.io.on('reconnect_error', (error) => {
      console.info('Reconnection error: ' + error);
    });

    socket.io.on('reconnect_failed', () => {
      console.info('Reconnection failure.');
      dispatch(setSocket(null));
    });
  };

  const SendHandshake = async () => {
    console.info('Sending handshake to server ...');

    socket.emit('handshake', async (uid: string, users: string[]) => {
      /** On HandShake, get connected user details */
      console.info('User handshake callback message received');
      dispatch(setUsers(users));
      dispatch(setUid(uid));

      //TODO: Get campings details from server/DB and store in redux
      //socket.emit('get_campings', (campings: ICamping[]) => { ... })

      //Incase of websockets fails, we can use CreateAsyncThunk method to get campings from server

      setLoading(false);
    });
  };

  if (socketState.socket === null)
    return (
      <p>
        Please Refresh the page.
        <br />
        Connection Failure...
      </p>
    );
  else if (loading) return <p>Connecting to Game using Socket IO ....</p>;
  return <Route {...rest} element={<ChildComponent />} />;
};

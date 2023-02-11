/* eslint-disable no-debugger */
import { Component, FC, useEffect, useState } from 'react';
import { RouteProps } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import routes from '@constants/routes';
import { useAppSelector, useAppDispatch } from '@store/hooks';
import { AuthState, ILoginSuccessResponse } from '@interfaces/auth';
import { setUserInfo } from '@features/auth/authSlice';

type IRouteProps = RouteProps & {
  component: typeof Component | FC;
};

export const AuthenticatedRoute: FC<IRouteProps> = ({ component: ChildComponent, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  //Lets dummy authorize here
  const dispatch = useAppDispatch();
  const dummyLoginResponse: ILoginSuccessResponse = {
    name: 'John Doe',
    job: 'QA Engineer',
    id: '123',
    createdAt: '2021-01-01T00:00:00.000Z',
    data: function (data: any): void {
      console.log('Function not implemented.');
    },
  };
  dispatch(setUserInfo(dummyLoginResponse));

  //do auth check here
  const auth = useAppSelector((state: { auth: AuthState }) => state.auth);
  useEffect(() => {
    if (auth.isAuthenticated) {
      setIsAuthenticated(true);
    } else {
      navigate(routes.LOGIN);
    }
    return () => {
      setIsAuthenticated(false);
    };
  }, [auth.isAuthenticated]);

  return <ChildComponent />;
};

export const UnauthenticatedRoute: FC<IRouteProps> = ({ component: ChildComponent, ...rest }) => {
  return <ChildComponent />;
};

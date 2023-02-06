import axios, { AxiosResponse } from 'axios';
import endpoints from '@configs/endpoints';
import { ILoginSuccessResponse } from '@interfaces/auth';

// A mock function to mimic making an async request for data
export function loginWithEmail(
  email: string,
  password: string,
): Promise<AxiosResponse<ILoginSuccessResponse>> {
  return axios.post(endpoints.login, {
    name: email,
    job: password,
  });
}

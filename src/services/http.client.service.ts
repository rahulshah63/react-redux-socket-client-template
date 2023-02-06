import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { HttpException } from '@exceptions/HttpException';
import localStorage from '@services/localstorage.service';

class Axios {
  constructor(config: AxiosRequestConfig) {
    const axiosInstance = axios.create(config);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    axiosInstance.interceptors.request.use(function (req: AxiosRequestConfig) {
      req.headers = req.headers ?? {};
      const token = localStorage.get('token');
      if (token) {
        req.headers['Authorization'] = `Bearer ${token}`;
      }
      return req;
    });
    axiosInstance.interceptors.response.use(
      function (res: AxiosResponse) {
        console.log('Response', res);
        return res;
      },
      function (error) {
        console.log(error);
      },
    );
    return axiosInstance;
  }
}

export abstract class HttpClient extends Axios {
  protected constructor(baseURL: string) {
    super({
      baseURL: process.env.REACT_APP_API_URL + baseURL,
      timeout: 3000,
    });
  }

  protected async request<T, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
    return this.request(config);
  }

  protected async get<T, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.get(url, config);
  }

  protected async options<T, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.options(url, config);
  }

  protected async post<T, B, R = AxiosResponse<T>>(
    url: string,
    data?: B,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.post(url, data, config);
  }

  protected success = <T>(response: AxiosResponse<T>): T => {
    console.log({ response123456: response });

    return response.data;
  };

  protected error = (error: AxiosError<Error>): never => {
    const { status, statusText } = error.response ?? {};
    const message = error.response?.data?.message || statusText;
    const stack = error.response?.data?.stack ?? error.stack;

    throw new HttpException(status ?? 500, message ?? 'Axios Error', stack);
  };
}

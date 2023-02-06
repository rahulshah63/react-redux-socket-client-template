import { ILoginUserPayload, ILoginSuccessResponse } from '@interfaces/auth';
import { HttpClient } from '@services/http.client.service';
import { AxiosResponse } from 'axios';

const API_ROUTES = {
  LOGIN: '/login',
  LOGOUT: '/logout',
};

class LoginAPIService extends HttpClient {
  private static instance: LoginAPIService;
  private constructor() {
    super('v1/auth');
  }

  static getInstance = (): LoginAPIService => {
    if (!LoginAPIService.instance) {
      LoginAPIService.instance = new LoginAPIService();
    }
    return LoginAPIService.instance;
  };

  public loginUser = async (payload: ILoginUserPayload): Promise<ILoginSuccessResponse> => {
    return this.post<
      ILoginSuccessResponse,
      ILoginUserPayload,
      AxiosResponse<ILoginSuccessResponse>
    >(API_ROUTES.LOGIN, payload)
      .then(this.success)
      .catch(this.error);
  };
}

export default LoginAPIService;

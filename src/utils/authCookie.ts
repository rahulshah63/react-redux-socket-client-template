import Cookies from 'js-cookie';
import { cookieName, cookieDomain } from '@constants/envVariables';

export const getExpiration = (minutes: number): Date =>
  new Date(new Date().getTime() + 60 * minutes * 1000);

const cookieConfig = { domain: cookieDomain };

/* Auth cookie */
export default class AuthCookie {
  static setCookie(value: string): void {
    Cookies.set(cookieName, value, {
      expires: getExpiration(45),
      ...cookieConfig,
    });
  }

  static getCookie(): string {
    const cookie: string | undefined = Cookies.get(cookieName);
    return cookie || '';
  }
}

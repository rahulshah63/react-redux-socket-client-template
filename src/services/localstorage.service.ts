class LocalStorageService {
  static get = (key: string): string | null => {
    return localStorage.getItem(key);
  };

  static set = (key: string, value: string): void => {
    return localStorage.setItem(key, value);
  };

  static remove = (key: string): void => {
    return localStorage.removeItem(key);
  };
}

export default LocalStorageService;

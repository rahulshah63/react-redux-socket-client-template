/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useCallback, useEffect, useState } from 'react';
export interface useAPICallRespnse {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: any;
  response: any;
  mutate: any;
  resetState: () => void;
}
interface IOptionProps {
  onSuccess?: (data: any) => void;
  onError?: (erro: any) => void;
  callOnMount?: boolean;
}

type AsyncMethod<T, R> = (args: T) => R;
type CallbackType<T> = (args: T) => Promise<boolean | undefined>;

export function useAPICall<T, R>(asyncMethod: AsyncMethod<T, R>, options?: IOptionProps) {
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSucess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [response, setResponse] = useState<R | null>(null);
  const [error, setError] = useState({} as any);

  const mutate = useCallback<CallbackType<T>>(async (args) => {
    setLoading(true);
    setIsError(false);
    setIsSucess(false);
    console.log(args);
    try {
      const data = await asyncMethod(args);
      setResponse(data);
      setIsSucess(true);
      console.log('Success', data);
      if (options?.onSuccess) options?.onSuccess(data);
      return true;
    } catch (error) {
      setIsError(true);
      setError(error);
      console.log(error);
      if (options?.onError) options?.onError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const resetState = useCallback(() => {
    setLoading(false);
    setIsError(false);
    setIsSucess(false);
  }, []);

  useEffect(() => {
    if (loading) console.log('Loading');
    else if (isError) console.log('Error', error);
    else if (isSuccess) console.log('Success', response);
  }, [isError, loading, isSuccess]);

  return {
    isLoading: loading,
    isError,
    isSuccess,
    error,
    response,
    mutate,
    resetState,
  };
}

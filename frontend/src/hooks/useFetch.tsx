import { useState, useEffect, useCallback } from "react";
import { AxiosError } from "axios";

import config from "../config/config";
import { ApiService } from "../services/ApiService";

interface UseFetchProps {
  url: string;
  options?: {
    params?: { [key: string]: string };
    data?: { [key: string]: unknown };
    headers?: { [key: string]: string | undefined };
    method?: string;
  };
  isPrevented?: boolean;
  withCredentials?: boolean;
}

interface UseFetchResults<T> {
  data: T | undefined;
  isError: boolean;
  isLoading: boolean;
  refetch: (overridingOptions?: UseFetchProps["options"]) => Promise<void>;
}

export const useFetch = <T,>({
  url,
  options,
  isPrevented,
  withCredentials = true,
}: UseFetchProps): UseFetchResults<T> => {
  const [isLoading, setIsLoading] = useState<boolean>(!isPrevented);
  const [isError, setIsError] = useState<boolean>(false);
  const [data, setData] = useState<T | undefined>(undefined);

  const fetchData = useCallback(
    async (overridingOptions: UseFetchProps["options"] = {}) => {
      const requestOptions = {
        ...options,
        ...overridingOptions,
        withCredentials,
      };

      if (!withCredentials) {
        if (requestOptions.headers) {
          requestOptions.headers["Authorization"] = undefined;
        } else {
          requestOptions.headers = { Authorization: undefined };
        }
      }

      setIsLoading(true);

      try {
        const response = await ApiService(url, requestOptions);

        if (!response) {
          throw new Error("response is empty");
        }

        setData(response?.data);
        setIsError(false);
      } catch (err) {
        setData(undefined);
        setIsError(true);

        console.error(
          `[useFetch]: ${err}\n` +
            `URL: ${url}\n` +
            `with params: ${JSON.stringify(requestOptions)}`
        );
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    if (isPrevented) {
      return;
    }

    fetchData();
  }, []);

  return { data, isError, isLoading, refetch: fetchData };
};

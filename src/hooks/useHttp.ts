import { useState, useCallback } from "react";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface UseHttpResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  sendRequest: (
    url: string,
    method?: HttpMethod,
    body?: any,
    headers?: HeadersInit
  ) => Promise<void>;
}

export function useHttp<T = any>(): UseHttpResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendRequest = useCallback(
    async (
      url: string,
      method: HttpMethod = "GET",
      body: any = null,
      headers: HeadersInit = { "Content-Type": "application/json" }
    ) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, {
          method,
          body: body ? JSON.stringify(body) : null,
          headers,
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = (await response.json()) as T;
        setData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { data, loading, error, sendRequest };
}

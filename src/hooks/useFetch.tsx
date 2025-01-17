import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";

interface FetchError {
  status: number | null;
  message: string;
}

export const BASE_URL = "http://localhost:8000";

if (!BASE_URL) {
  throw new Error(
    "BASE_URL is not defined. Please check your environment variables."
  );
}

const useFetch = <T,>(
  url: string,
  options: AxiosRequestConfig = {}
): { data: T | undefined; loading: boolean; error: FetchError | null } => {
  const [data, setData] = useState<T | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<FetchError | null>(null);

  useEffect(() => {
    let isMounted = true; // Prevent state updates if the component unmounts

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${BASE_URL}${url}`, options);
        if (isMounted) {
          setData(response.data);
        }
      } catch (err) {
        if (isMounted) {
          if (axios.isAxiosError(err)) {
            setError({
              status: err.response?.status || null,
              message:
                err.response?.data?.message ||
                "Failed to fetch data. Please try again.",
            });
          } else {
            setError({ status: null, message: "An unknown error occurred." });
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url, options]);

  return { data, loading, error };
};

export default useFetch;

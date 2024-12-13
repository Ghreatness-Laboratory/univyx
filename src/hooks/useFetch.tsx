import { useEffect, useState } from "react";

interface FetchError {
  status: number | null;
  message: string;
}

const useFetch = <T,>(url: string): { data: T | undefined; loading: boolean; error: FetchError | null } => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<FetchError | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw { status: response.status, message: "Failed to fetch data. Please try again." };
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        if (error instanceof Error) {
          setError({ status: null, message: error.message });
        } else {
          setError(error as FetchError);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;

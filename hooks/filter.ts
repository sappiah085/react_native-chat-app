import { user_type } from "@/firebase/context";
import { useEffect, useState } from "react";

export const useFilterEmail = (
  filter: string,
  delay: number,
  callback: any
) => {
  const [data, setData] = useState<user_type[]>([]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      const data = await callback(filter);
      setData(data || []);
    }, delay);
    // Cleanup function
    return () => clearTimeout(timer);
  }, [filter]); // Added data_to_filter to dependencies

  return data;
};

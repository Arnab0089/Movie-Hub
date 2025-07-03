import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetch = (endpoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true); // ✅ Start loading
      const response = await axios.get(endpoint);
      setData(response.data.results || []); // ✅ fallback if results is undefined
      setLoading(false); // ✅ Stop loading
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false); // ✅ Ensure loading stops on error too
    }
  };

  useEffect(() => {
    if (endpoint) {
      fetchData(); // ✅ Run when endpoint changes
    }
  }, [endpoint]);

  return {
    data,
    loading,
  };
};

export default useFetch;

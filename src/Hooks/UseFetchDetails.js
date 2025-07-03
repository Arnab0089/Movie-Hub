import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetchDetails = (endpoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true); // optionally show loading indicator
      const response = await axios.get(endpoint);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching details:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (endpoint) {
      fetchData();
    }
  }, [endpoint]); // ✅ trigger fetch when endpoint changes

  return {
    data,
    loading,
  };
};

export default useFetchDetails;

import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Component/Header/Header';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setBannerData, setImageURL } from './store/movieSlice';

export default function App() {
  const dispatch = useDispatch();

  const fetchTrendingData = async () => {
    try {
      const response = await axios.get('/trending/all/week');
      dispatch(setBannerData(response.data.results));
    } catch (error) {
      console.error('Error fetching trending data:', error);
    }
  };

  const fetchConfiguration = async () => {
    try {
      const response = await axios.get('/configuration');
      dispatch(setImageURL(response.data.images.secure_base_url + 'original/'));
    } catch (error) {
      console.error('Error fetching configuration:', error);
    }
  };
  useEffect(() => {
    fetchTrendingData();
    fetchConfiguration();
  }, []);
  return (
    <div>
      <Header />
      <div>
        <Outlet />
      </div>
    </div>
  );
}

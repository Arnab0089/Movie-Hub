import React, { useEffect, useState } from 'react';
import Banner from './Banner';
import { useSelector } from 'react-redux';
import HorizontalScrollCard from '../Pages/HorizontalScrollCard';
import axios from 'axios';
import useFetch from '../../Hooks/UseFetch';

export default function Home() {
  const trendingdata = useSelector((state) => state.movieData.bannerData);
  const [nowPlaying, setNowPlaying] = useState([]);
  const { data: top_rated } = useFetch('/movie/top_rated');
  const { data: upcoming } = useFetch('/movie/upcoming');
  const { data: popular_tv } = useFetch('/tv/popular');
  const { data: onTheAIr } = useFetch('/tv/on_the_air');

  const fetchNowPlaying = async () => {
    try {
      const response = await axios.get('/movie/now_playing');
      setNowPlaying(response.data.results);
    } catch (error) {
      console.error('Error fetching now playing data:', error);
    }
  };
  useEffect(() => {
    fetchNowPlaying();
  }, []);
  return (
    <div className="text-light-white">
      <Banner />
      <HorizontalScrollCard
        data={trendingdata}
        heading={'Tranding Shows'}
        trending={true}
        viewMoreLink={'/trending-shows'}
        media_type={''}
      />
      <HorizontalScrollCard
        data={nowPlaying}
        heading={'Now Playing'}
        viewMoreLink={'/now-playing'}
        media_type={'movie'}
      />
      <HorizontalScrollCard
        data={top_rated}
        heading={'Top Rated Movies'}
        viewMoreLink={'/top-rated'}
        media_type={'movie'}
      />
      <HorizontalScrollCard
        data={popular_tv}
        heading={'Popular TV Shows'}
        viewMoreLink={'/popular-tv'}
        media_type={'tv'}
      />
      <HorizontalScrollCard
        data={upcoming}
        heading={'Upcoming Movies'}
        viewMoreLink={'/upcoming'}
        media_type={'movie'}
      />
      <HorizontalScrollCard
        data={onTheAIr}
        heading={'On The Air TV Shows'}
        viewMoreLink={'/on-the-air'}
        media_type={'tv'}
      />
    </div>
  );
}

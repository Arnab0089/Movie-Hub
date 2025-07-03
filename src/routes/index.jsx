import { createBrowserRouter as Router } from 'react-router-dom';
import App from '../App';
import Home from '../Component/Home/Home';
import Search from '../Component/Pages/Search';
import DetailsPage from '../Component/Details/detailsPage';
import MovieList from '../Component/Movies/MovieList';
import TvShowsList from '../Component/TV/TvShowsList';
import TrendingShow from '../Component/Trending/TrendingShow';
import NowPlaying from '../Component/Movies/NowPlaying';
import TopRatedMovies from '../Component/Movies/TopRatedMovies';
import PopularTvShows from '../Component/TV/PopularTvShows';
import Upcoming from '../Component/Movies/Upcoming';
import OntheAir from '../Component/TV/OntheAir';

const router = Router([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'search',
        element: <Search />,
      },
      {
        path: 'movies',
        element: <MovieList />,
      },
      {
        path: 'tv-shows',
        element: <TvShowsList />,
      },
      {
        path: ':explore/:id',
        element: <DetailsPage />,
      },
      {
        path: 'trending-shows',
        element: <TrendingShow />,
      },
      {
        path: 'now-playing',
        element: <NowPlaying />,
      },
      {
        path: 'top-rated',
        element: <TopRatedMovies />,
      },
      {
        path: 'popular-tv',
        element: <PopularTvShows />,
      },
      {
        path: 'upcoming',
        element: <Upcoming />,
      },
      {
        path: 'on-the-air',
        element: <OntheAir />,
      },
    ],
  },
]);

export default router;

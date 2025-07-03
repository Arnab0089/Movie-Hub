import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetchDetails from '../../Hooks/UseFetchDetails';
import { useSelector } from 'react-redux';
import Tagline from './Tagline';
import moment from 'moment';
import Divider from './Divider';
import CastData from './CastData';
import CrewData from './CrewData';
import useFetch from '../../Hooks/UseFetch';
import HorizontalScrollCard from '../Pages/HorizontalScrollCard';
import VideoPlay from './VideoPlay';

export default function DetailsPage() {
  const param = useParams();
  const imageURL = useSelector((state) => state.movieData.imageURL);
  const { data: detailsdata } = useFetchDetails(
    `/${param?.explore}/${param?.id}`,
  );
  const { data: creditsdata } = useFetchDetails(
    `/${param?.explore}/${param?.id}/credits`,
  );
  const { data: Similardata } = useFetch(
    `/${param?.explore}/${param?.id}/similar`,
  );

  const { data: recomendationsdata } = useFetch(
    `/${param?.explore}/${param?.id}/recommendations`,
  );

  const { data: videosdata } = useFetchDetails(
    `/${param?.explore}/${param?.id}/videos`,
  );

  const [selectedSection, setSelectedSection] = useState('cast');
  const [selectMovies, setSelectMovies] = useState('recomendation');
  const [playVideo, setPlayVideo] = useState(false);
  const [playVideoId, setPlayVideoId] = useState('');

  console.log(detailsdata);
  console.log(creditsdata);
  console.log(videosdata);

  const handelPlayVideo = (data) => {
    setPlayVideoId(data.id);
    setPlayVideo(true);
  };

  const writer = creditsdata?.crew
    ?.filter((member) => member.job === 'Writer' || member.job === 'Story')
    .map((writer) => writer.name);

  return (
    <>
      <div className="">
        {/* Poster */}
        <div className="relative w-full h-[280px] sm:h-[350px] md:h-[400px] lg:h-[500px] overflow-hidden">
          <img
            src={imageURL + detailsdata.backdrop_path}
            alt={
              detailsdata.title ||
              detailsdata.name ||
              'Backdrop image is not available right now'
            }
            className="w-full h-full object-cover object-top brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        </div>
        {/* Poster and Details */}
        <div className="flex items-start flex-col sm:flex-row justify-between">
          <div className="container mx-auto lg:ml-12 px-4 sm:px-6 py-8 sm:py-1 md:-mt-25  sm:flex items-end justify-between w-full sm:w-auto">
            <div className="-mt-50 sm:-mt-20 lg:ml-8 relative mx-auto w-fit ">
              <img
                src={imageURL + detailsdata.poster_path}
                alt={
                  detailsdata.title ||
                  detailsdata.name ||
                  'Backdrop image is not available right now'
                }
                className="h-96 w-65 lg:h-96 lg:w-65 sm:w-80 sm:h-80 object-cover rounded-b-lg shadow-lg  border-2  border-gray-300"
              />

              <button
                className="w-full mt-6 px-6 py-2 bg-gradient-to-r from-gray-500 to-white text-red-500 font-medium italic text-sm sm:text-lg rounded-2xl shadow-lg border-2 border-dark-navy transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400 hover:bg-gradient-to-r hover:from-orange-500 hover:to-white hover:text-white"
                onClick={() => handelPlayVideo(detailsdata)}
              >
                🎬 Play Now
              </button>
            </div>
          </div>
          {/* Details */}
          <div className="container mx-auto px-8 sm:px-6  pt-8">
            <h1 className="text-3xl font-bold mb-4 text-light-orange">
              {detailsdata.title || detailsdata.name}
            </h1>
            <p className="text-gray-300 mb-4">
              {detailsdata.overview || 'No overview available.'}
            </p>
            <Divider />

            <div className="grid grid-cols-2 lg:flex items-center mx-auto gap-4 mb-4">
              <span className="text-yellow-400 font-semibold">
                Rating: {Number(detailsdata.vote_average).toFixed(1)} ★
              </span>
              <span className="text-gray-400 font-semibold">
                Release date:{' '}
                <span className="text-light-orange font-medium">
                  {detailsdata.release_date
                    ? moment(detailsdata.release_date).format('MMM DD, YYYY')
                    : detailsdata.first_air_date
                    ? moment(detailsdata.first_air_date).format('MMM DD, YYYY')
                    : 'N/A'}
                </span>
              </span>
              <span className="text-gray-400 font-semibold">
                View:{' '}
                <span className="text-light-orange font-medium">
                  {detailsdata.vote_count}
                </span>
              </span>
              {detailsdata.runtime && (
                <span className="text-gray-400 font-semibold">
                  Duration:{' '}
                  <span className="text-light-orange font-medium">
                    {(Number(detailsdata.runtime) / 60).toFixed(0)} hr{' '}
                    {Number(detailsdata.runtime) % 60} min
                  </span>
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="container mx-auto px-8 sm:px-6 ">
          <Divider />
          {detailsdata.genres && detailsdata.genres.length > 0 ? (
            <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
              {detailsdata.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-dark-navy text-light-orange px-3 py-1 rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          ) : (
            <span className="text-gray-400">No genres available</span>
          )}
          <Divider />
          <Tagline text={detailsdata.tagline} />
          <Divider />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-6 ">
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="bg-gray-800 text-white px-4 py-2 rounded border border-gray-600 focus:outline-none"
          >
            <option value="cast">Star Cast</option>
            <option value="crew">Crew Members</option>
          </select>
        </div>

        {/* Conditional Rendering */}
        <div className="container mx-auto">
          {selectedSection === 'cast' && (
            <CastData imageURL={imageURL} creditsdata={creditsdata} />
          )}
          {selectedSection === 'crew' && (
            <CrewData imageURL={imageURL} creditsdata={creditsdata} />
          )}
        </div>

        {Similardata.length > 0 && recomendationsdata.length > 0 ? (
          <>
            <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-6 ">
              <select
                value={selectMovies}
                onChange={(e) => setSelectMovies(e.target.value)}
                className="bg-gray-800 text-white px-4 py-2 rounded border border-gray-600 focus:outline-none"
              >
                <option value="similar">Similar Movies</option>
                <option value="recomendation">Recommended Movies</option>
              </select>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-12 text-light-orange italic ">
              {selectMovies === 'similar' && (
                <HorizontalScrollCard
                  data={Similardata}
                  heading={'Similar Movies'}
                  media_type={param.explore}
                />
              )}
              {selectMovies === 'recomendation' && (
                <HorizontalScrollCard
                  data={recomendationsdata}
                  heading={'Recommended Movies'}
                  media_type={param.explore}
                />
              )}
            </div>
          </>
        ) : Similardata.length > 0 ? (
          <div className="container mx-auto px-4 sm:px-6 lg:px-12 text-light-orange italic ">
            <HorizontalScrollCard
              data={Similardata}
              heading={'Similar Movies'}
              media_type={param.explore}
            />
          </div>
        ) : recomendationsdata.length > 0 ? (
          <div className="container mx-auto px-4 sm:px-6 lg:px-12 text-light-orange italic ">
            <HorizontalScrollCard
              data={recomendationsdata}
              heading={'Recommended Movies'}
              media_type={param.explore}
            />
          </div>
        ) : null}

        {playVideo && (
          <VideoPlay
            data={videosdata}
            videoId={playVideoId}
            close={() => setPlayVideo(false)}
          />
        )}
      </div>
    </>
  );
}

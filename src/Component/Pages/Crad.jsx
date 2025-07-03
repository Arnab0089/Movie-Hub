import React from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';

export default function Crad({ data, trending, index, media_type }) {
  const imageURL = useSelector((state) => state.movieData.imageURL);
  const mediatype = data.media_type ?? media_type;
  return (
    <>
      <div className="w-full min-w-[250px] max-w-[250px]  rounded h-80 overflow-hidden relative hover:scale-105 transition-transform duration-300 ease-in-out  block">
        <Link to={'/' + mediatype + '/' + data.id} className="w-full h-full ">
          <img
            src={imageURL + data.poster_path}
            alt={
              data.title ||
              data.name + ' : The poster is not available right now'
            }
          />
          <div className="">
            {trending && (
              <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
                <h3 className="absolute top-2 left-0 text-white bg-black/50 px-2 py-1 rounded-r-full backdrop-blur-md">
                  #{index} Trending
                </h3>
              </div>
            )}
          </div>
          <div className="absolute bottom-0 left-0 w-full h-20 bg-black/50 text-white p-2">
            <h3 className="text-lg font-semibold line-clamp-1">
              {data.title || data.name}
            </h3>
            <div className="flex justify-between items-center mt-1">
              <div>
                <p className="text-sm">
                  {data.release_date
                    ? moment(data.release_date).format('MMM DD, YYYY')
                    : data.first_air_date
                    ? moment(data.first_air_date).format('MMM DD, YYYY')
                    : 'N/A'}
                </p>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <p className="font-semibold text-amber-300 bg-dark-navy rounded px-2 py-1">
                  Rating:
                </p>
                <span>{Number(data.vote_average).toFixed(1)}</span>
                <span className="text-yellow-400">★</span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}

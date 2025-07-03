import React from 'react';
import { useMediaQuery } from 'react-responsive';

export default function CastData({ creditsdata, imageURL }) {
  // Custom hook to detect screen width below 640px (mobile)
  const isMobile = useMediaQuery({ maxWidth: 639 });

  // Show 10 cast members on mobile, all on larger screens
  const castToShow = isMobile
    ? creditsdata?.cast?.filter((member) => member.profile_path).slice(0, 10)
    : creditsdata?.cast?.filter((member) => member.profile_path);

  return (
    <div className="relative container mx-auto px-4 sm:px-6 lg:px-12 py-6">
      <h2 className="text-2xl font-semibold text-white mb-4">Star Cast</h2>

      {castToShow && castToShow.length > 0 ? (
        <div
          className="grid grid-cols-2 gap-4 sm:flex sm:overflow-x-auto sm:scrollbar-hide p-4 rounded-lg shadow-lg"
          id="horizontal-scroll-container"
        >
          {castToShow.map((starCast) => (
            <div
              key={starCast.id || starCast.name}
              className="flex-none w-full sm:min-w-[150px] sm:max-w-[150px] flex flex-col items-center hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              <img
                src={imageURL + starCast.profile_path}
                alt={starCast.name}
                className="w-28 h-36 sm:w-full sm:h-auto aspect-[2/3] object-cover rounded-lg shadow-md mb-2"
              />
              <div className="text-center">
                <h3 className="text-sm font-semibold text-white truncate w-full">
                  {starCast.name}
                </h3>
                <p className="text-gray-400 text-sm font-medium italic">as</p>
                <p className=" text-light-orange text-xs truncate w-full">
                  {starCast.character || 'Role not specified'}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No cast information available.</p>
      )}
    </div>
  );
}

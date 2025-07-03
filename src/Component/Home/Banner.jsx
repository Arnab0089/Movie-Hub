import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaAngleRight } from 'react-icons/fa';
import { FaAngleLeft } from 'react-icons/fa';

export default function Banner() {
  const bannerData = useSelector((state) => state.movieData.bannerData);
  const imageURL = useSelector((state) => state.movieData.imageURL);

  console.log(bannerData);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNext = () => {
    if (currentImageIndex < bannerData.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else {
      setCurrentImageIndex(0); // Loop back to the first image
    }
  };

  const handlePrev = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    } else {
      setCurrentImageIndex(bannerData.length - 1); // Loop back to the last image
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex < bannerData.length - 1 ? prevIndex + 1 : 0,
      );
    }, 8000); // Change image every 4 seconds

    return () => clearInterval(interval); // Cleanup
  }, [bannerData.length, imageURL]);

  return (
    <section className="w-full h-full overflow-hidden">
      <div className="flex min-h-full max-h-[95vh] ">
        {bannerData.map((data, index) => (
          <div
            key={index}
            className="min-w-full h-[450px] lg:h-[95vh] overflow-hidden relative group transition-transform duration-500"
            style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
          >
            {/* Background Image */}
            <img
              src={`${imageURL}${data.backdrop_path}`}
              alt={data.title || data.name}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
            />
            {/* Buttons  */}
            <div className="absolute top-1/2 left-0 right-0  justify-between items-center px-4 sm:px-12 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden group-hover:md:flex">
              <button>
                <FaAngleLeft
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:text-light-orange hover:bg-light-white/50 hover:rounded-full hover: backdrop-blur-2xl hover:p-1 "
                  onClick={handlePrev}
                />
              </button>
              <button>
                <FaAngleRight
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:text-light-orange hover:bg-light-white/50 hover:rounded-full hover: backdrop-blur-2xl hover:p-1 "
                  onClick={handleNext}
                />
              </button>
            </div>

            {/* Gradient Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />

            {/* Content */}
            <div className="absolute bottom-0 z-20 w-full px-4 sm:px-12 pb-8 text-white">
              <div className="max-w-3xl">
                <h2 className="font-extrabold text-2xl sm:text-4xl drop-shadow-xl">
                  {data.title || data.name}
                </h2>
                <p className="mt-2 text-sm sm:text-base text-white/90 leading-relaxed">
                  {data.overview.length > 150
                    ? `${data.overview.slice(0, 150)}...`
                    : data.overview}
                </p>

                <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-4">
                  <p className="text-lg sm:text-2xl text-yellow-400 font-semibold">
                    <span className="italic">Rating:</span>{' '}
                    {Number(data.vote_average).toFixed(1)} ★
                  </p>
                  <span className="hidden sm:inline-block text-white/50">
                    |
                  </span>
                  <p className="text-white/80">
                    <span className="italic font-semibold">Views:</span>{' '}
                    {Number(data.popularity).toFixed(0)}
                  </p>
                </div>

                {/* Optional Button */}
                <button
                  onClick={() =>
                    (window.location.href = `/${data.media_type}/${data.id}`)
                  }
                  className="mt-5 px-5 py-2  bg-dark-navy hover:bg-gradient-to-l from-red-700 to-orange-500  text-light-white font-semibold rounded-full shadow-lg transition-all duration-500 ease-in-out hover:scale-105"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';

// export default function Banner() {
//   const bannerData = useSelector((state) => state.movieData.bannerData);
//   const imageURL = useSelector((state) => state.movieData.imageURL);

//   return (
//     <section className="w-full h-full">
//       <Carousel
//         autoPlay
//         infiniteLoop
//         showThumbs={false}
//         showStatus={false}
//         showIndicators={false}
//         interval={4000}
//         swipeable
//         emulateTouch
//         showArrows={true}
//         renderArrowPrev={(onClickHandler, hasPrev) =>
//           hasPrev && (
//             <button
//               onClick={onClickHandler}
//               className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 text-white text-3xl hover:text-orange-500 bg-black/30 hover:bg-black/50 p-2 rounded-full backdrop-blur-md"
//             >
//               ❮
//             </button>
//           )
//         }
//         renderArrowNext={(onClickHandler, hasNext) =>
//           hasNext && (
//             <button
//               onClick={onClickHandler}
//               className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 text-white text-3xl hover:text-orange-500 bg-black/30 hover:bg-black/50 p-2 rounded-full backdrop-blur-md"
//             >
//               ❯
//             </button>
//           )
//         }
//       >
//         {bannerData.map((data, index) => (
//           <div
//             key={index}
//             className="relative h-[450px] lg:h-[95vh] w-full overflow-hidden"
//           >
//             <img
//               src={`${imageURL}${data.backdrop_path}`}
//               alt={data.title || data.name}
//               className="w-full h-full object-cover"
//             />

//             {/* Overlay Gradient */}
//             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />

//             {/* Banner Content */}
//             <div className="absolute bottom-0 left-0 z-20 text-white px-4 sm:px-12 pb-8 w-full max-w-[600px] text-left">
//               <div className="max-w-3xl">
//                 <h2 className="font-extrabold text-2xl sm:text-4xl drop-shadow-lg">
//                   {data.title || data.name}
//                 </h2>
//                 <p className="mt-2 text-sm sm:text-base text-white/90 leading-relaxed">
//                   {data.overview.length > 150
//                     ? `${data.overview.slice(0, 150)}...`
//                     : data.overview}
//                 </p>

//                 <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-4 text-sm sm:text-base">
//                   <p className="text-yellow-400 font-semibold">
//                     <span className="italic">Rating:</span>{' '}
//                     {Number(data.vote_average).toFixed(1)} ★
//                   </p>
//                   <span className="hidden sm:inline text-white/50">|</span>
//                   <p className="text-white/80">
//                     <span className="italic font-semibold">Views:</span>{' '}
//                     {Number(data.popularity).toFixed(0)}
//                   </p>
//                 </div>

//                 <button className="mt-5 px-5 py-2 bg-dark-navy hover:bg-gradient-to-l from-red-700 to-orange-500 text-white font-semibold rounded-full shadow-md transition-all duration-300 hover:scale-105">
//                   Watch Now
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </Carousel>
//     </section>
//   );
// }

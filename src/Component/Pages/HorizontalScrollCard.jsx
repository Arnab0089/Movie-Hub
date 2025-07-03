import React, { useRef } from 'react';
import Crad from './Crad';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function HorizontalScrollCard({
  data = [],
  heading,
  trending,
  viewMoreLink,
  media_type,
}) {
  const containerRef = useRef();

  const handleNext = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 300;
    }
  };

  const handlePrev = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 300;
    }
  };

  return (
    <div className="w-full h-full px-4 md:px-8 lg:px-16 py-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">{heading}</h2>
        {viewMoreLink && (
          <Link
            to={viewMoreLink}
            className="text-primary border border-primary sm:px-4 sm:py-2 px-2 py-1 rounded bg-dark-navy hover:bg-primary hover:text-white transition-all sm:text-lg md:text-xl lg:text-2xl"
          >
            View More
          </Link>
        )}
      </div>

      <div className="relative">
        {/* Scrollable Card Container */}
        <div
          ref={containerRef}
          className="flex overflow-x-auto gap-4 scroll-smooth scrollbar-hide transition-all duration-300 ease-in"
          id="horizontal-scroll-container"
        >
          {data.map((item, index) => (
            <Crad
              key={item.id + '_card_' + index}
              data={item}
              index={index + 1}
              trending={trending}
              media_type={media_type}
            />
          ))}
        </div>

        {/* Scroll Buttons */}
        <div className="absolute top-1/2 left-0 right-0  justify-between px-2 transform -translate-y-1/2 pointer-events-none text-2xl hidden sm:flex ">
          <button
            onClick={handlePrev}
            className="pointer-events-auto bg-dark-navy hover:bg-dark-navy/80 text-white p-2 rounded-full shadow-md"
          >
            <FaAngleLeft className="text-2xl" />
          </button>
          <button
            onClick={handleNext}
            className="pointer-events-auto bg-dark-navy hover:bg-dark-navy/80 text-white p-2 rounded-full shadow-md"
          >
            <FaAngleRight className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
}

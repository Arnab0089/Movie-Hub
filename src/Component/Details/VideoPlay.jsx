import React from 'react';
import { IoCloseSharp } from 'react-icons/io5';

export default function VideoPlay({ data, close }) {
  return (
    <>
      <section className="fixed bg-black/50 top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center bg-opacity-50 backdrop:blur-xs">
        <div className="bg-black w-full  max-w-screen-lg aspect-video rounded-2xl  relative">
          <button>
            <IoCloseSharp
              className="text-white text-3xl absolute -top-8 right-4 cursor-pointer bg-red-600 rounded  hover:bg-red-700 transition-all duration-300"
              onClick={close}
            />
          </button>
          <iframe
            className="w-full h-full rounded-2xl"
            src={`https://www.youtube.com/embed/${data.results[0].key}?autoplay=1&mute=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </section>
    </>
  );
}

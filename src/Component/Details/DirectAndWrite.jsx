import React from 'react';

export default function DirectAndWrite({ creditsdata, writer, imageURL }) {
  const director = creditsdata?.crew?.find(
    (person) => person.job === 'Director',
  );
  const mainWriter = writer?.[0]; // Assuming writer is an array of names

  const isSamePerson =
    director?.name && mainWriter && director.name === mainWriter;

  return (
    <div className="w-full px-4 sm:px-6 lg:px-12 py-8">
      <div className="flex flex-col sm:flex-row gap-6  p-6 rounded-xl shadow-lg border border-zinc-700 sm:border-0  mx-auto">
        {isSamePerson ? (
          <div className="flex items-start gap-4">
            <img
              src={
                director?.profile_path ? imageURL + director.profile_path : ''
              }
              alt={director?.name || 'Director/Writer'}
              className="sm:w-32 sm:h-40 w-24 h-24 sm:rounded-2xl rounded-full object-cover border-2 border-gray-300 shadow-md"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-light-orange mb-2">
                Director & Writer
              </h2>
              <p className="text-gray-300 mb-4">
                {director?.name || 'Not available'}
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-start gap-4">
              <img
                src={
                  director?.profile_path
                    ? imageURL + director.profile_path
                    : 'https://via.placeholder.com/120x160?text=No+Image'
                }
                alt={director?.name || 'Director'}
                className="w-32 h-40 object-cover rounded-lg border-2 border-gray-300 shadow-md hidden sm:block"
              />
              <div>
                <h2 className="text-2xl font-semibold text-light-orange mb-2">
                  Director
                </h2>
                <p className="text-gray-300 mb-4">
                  {director?.name || 'Director not available'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-32 h-40 hidden sm:block" />
              <div>
                <h3 className="text-xl font-semibold text-light-orange mb-2">
                  Writers
                </h3>
                <p className="text-gray-300">
                  {writer && writer.length > 0
                    ? writer.join(', ')
                    : 'Writers not available'}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

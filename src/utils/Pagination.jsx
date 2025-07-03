import React from 'react';
import { returnPaginationRange } from './appUtils';
import SelectLimit from './SelectLimit';

export default function Pagination({
  totalPages,
  page,
  limit,
  siblings,
  total_count,
  onPageChange,
  onPageSelect,
}) {
  let array = returnPaginationRange(totalPages, page, limit, siblings);
  return (
    <div className="mt-8  mx-auto container flex items-center justify-between border border-gray-200 bg-dark-navy px-4 py-3 sm:px-6 rounded-t-2xl shadow-md-2xl">
      <div className="flex flex-col sm:hidden w-full gap-4 p-4 ">
        {/* Info Row */}
        <div className="flex flex-col items-center text-center gap-1">
          <p className="text-sm text-light-white">
            Showing <span className="font-bold text-light-orange">1</span> to{' '}
            <span className="font-bold text-light-orange">20</span> of{' '}
            <span className="font-bold text-light-orange">{total_count}</span>{' '}
            results
          </p>
        </div>
        {/* Navigation Buttons */}
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={() => onPageChange('Previous')}
            className="flex-1 py-2 px-3 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md border border-gray-300"
          >
            Previous
          </button>
          <button
            onClick={() => onPageChange('Next')}
            className="flex-1 py-2 px-3 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md border border-gray-300"
          >
            Next
          </button>
        </div>
      </div>

      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-light-white">
            Showing <span className="font-medium text-light-orange">1</span> to{' '}
            <span className="font-medium text-light-orange">20</span> of{' '}
            <span className="font-medium text-light-orange">{total_count}</span>{' '}
            results
          </p>
        </div>

        <div>
          <SelectLimit totalpage={totalPages} onPageSelect={onPageSelect} />
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              onClick={() => onPageChange('&laquo;')}
              className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              &laquo;
            </button>
            <button
              onClick={() => onPageChange('Previous')}
              className="relative inline-flex items-center  border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              Previous
            </button>
            {array.map((value, index) =>
              value === page ? (
                <button
                  key={typeof value === 'string' ? `dots-${index}` : value}
                  className="relative inline-flex items-center border border-dark-navy bg-blue-500 px-2 py-2 text-sm font-medium text-white"
                  aria-current="page"
                  onClick={() => onPageChange(value)}
                >
                  {value}
                </button>
              ) : (
                <button
                  key={typeof value === 'string' ? `dots-${index}` : value}
                  onClick={() => onPageChange(value)}
                  className="relative inline-flex items-center border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  {value}
                </button>
              ),
            )}
            <button
              onClick={() => onPageChange('Next')}
              className="relative inline-flex items-center border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              Next
            </button>
            <button
              onClick={() => onPageChange('&raquo;')}
              className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              &raquo;
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}

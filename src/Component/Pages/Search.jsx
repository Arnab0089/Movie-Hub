import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Crad from './Crad';
import { set } from 'lodash';
import Pagination from '../../utils/Pagination';

export default function Search() {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 20;
  const [totalcount, setTotalCount] = useState(0);

  // Decode the query string
  const queryParam = decodeURIComponent(location?.search?.slice(7) || '');
  const handlePageChange = (page) => {
    if (page === '&laquo;') {
      setPageNo(1);
    } else if (page === 'Previous') {
      setPageNo((prev) => (prev > 1 ? prev - 1 : 1));
    } else if (page === 'Next') {
      setPageNo((prev) => (prev < totalPages ? prev + 1 : totalPages));
    } else if (page === '&raquo;') {
      setPageNo(totalPages);
    } else {
      setPageNo(page);
    }
  };

  const handlePageSelect = (page) => {
    setPageNo(page);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('/search/multi', {
        params: {
          query: queryParam,
          page: pageNo,
        },
      });
      setData(response.data.results);
      setTotalPages(response.data.total_pages);
      setTotalCount(response.data.total_results);
    } catch (error) {
      console.error('Error fetching search data:', error);
    }
  };

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      if (pageNo < totalPages) {
        setPageNo((prevPageNo) => prevPageNo + 1);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [location?.search, pageNo]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="sm:pt-8 ">
      <div className="container mx-auto px-4 sm:px-8 py-8">
        <h1 className="sm:text-2xl font-bold mb-4 text-white text-lg">
          Search Results :
        </h1>
        <div className="container mx-auto px-8 sm:px-4">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 justify-center sm:justify-start ml-4 sm:ml-0">
            {data.map((searchData) =>
              searchData.media_type === 'movie' ||
              searchData.media_type === 'tv' ? (
                <Crad
                  data={searchData}
                  key={searchData.id + 'searchSection'}
                  media_type={searchData.media_type}
                />
              ) : null,
            )}
          </div>
        </div>
      </div>
      <Pagination
        totalPages={totalPages}
        page={pageNo}
        limit={limit}
        siblings={1}
        total_count={totalcount}
        onPageChange={handlePageChange}
        onPageSelect={handlePageSelect}
      />
    </div>
  );
}

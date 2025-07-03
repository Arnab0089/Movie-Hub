import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Crad from '../Pages/Crad';
import Pagination from '../../utils/Pagination';

export default function OntheAir() {
  const [pageNo, setPageNo] = useState(2);
  const [data, setData] = useState([]);
  const totalPages = 54; // Assuming a maximum of 500 pages for the API
  const limit = 20;
  const [totalcount, setTotalCount] = useState(0);

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
      const response = await axios.get('/tv/on_the_air', {
        params: {
          page: pageNo,
        },
      });
      setData(response.data.results);
      setTotalCount(response.data.total_results);
    } catch (error) {
      console.error('Error fetching movie data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageNo]);

  return (
    <>
      <div className="text-light-white  m-4">
        <div className="container mx-auto sm:px-4 sm:py-8 px-2 py-4">
          <h1 className="text-2xl font-bold">On the Air Tv Shows </h1>
          <p className="text-sm">Explore a wide range of Tv shows</p>
        </div>
        <div className="container mx-auto px-8 sm:px-4">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
            {data.map((exploreData, index) => {
              return (
                <Crad
                  data={exploreData}
                  key={exploreData.id + 'exploreSection'}
                  media_type={'tv'}
                />
              );
            })}
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
    </>
  );
}

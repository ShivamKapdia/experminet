import React from 'react';

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  //so let us consider that postsPerPage are 10 and totalPosts are 100 then  totalPosts/postsPerPage will be 10 and hence pageNUmbers array will contains numbers from 1 to 10 and hence in return we will show numbers from 1 to 10 using pagination bootstrap and we gave a button in each list which sets current page using paginate function.

  return (
    <nav>
      <ul className='pagination justify-content-center'>
        {pageNumbers.map(number => (
          <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
            <button onClick={() => paginate(number)} className='page-link shadow-sm'>
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
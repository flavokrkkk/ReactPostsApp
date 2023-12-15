//Создание компонента пагинации

import React from 'react';
import { usePagination } from '../../hooks/usePagination';

const Pagination = ({totalPages, page, changePage}) => {

    const pagesArray = usePagination(totalPages)

    return (
        <div className='page__wrapper'>
             {pagesArray.map(p => 
                <span
                    onClick={() => changePage(p)}
                    key={p}
                    className={page === p ? 'page page__active' : 'page'}>
                    {p}
                </span>
              )}
          </div>
    );
};

export default Pagination;
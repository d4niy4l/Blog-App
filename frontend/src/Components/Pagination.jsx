import React, { useState, useEffect } from 'react';

const Pagination = ({currentPage,isNext,isPrev, setNextPage}) => {
    return(
        <div className='flex flex-row xxs:gap-4 md:gap-6 lg:gap-10 text-yellow-300'>
            <button className={isPrev === true ? 'p-2 bg-gray-900 rounded-lg hover:scale-105' : 'p-2 bg-black rounded-lg text-white opacity-50' }
                onClick={()=>(setNextPage(currentPage-1))}
                disabled = {isPrev === false}
            >
                PREV
            </button>

            <div className='py-1 px-2 matchColor rounded-lg text-xl'>
                {currentPage}
            </div>

            <button className={isNext === true ? 'p-2 bg-gray-900 rounded-lg hover:scale-105' : 'p-2 bg-black rounded-lg text-white opacity-50'}
                onClick={()=>(setNextPage(currentPage+1))}
                disabled = {isNext === false}
            >
                NEXT
            </button> 
        </div>
    )
};

export default Pagination;
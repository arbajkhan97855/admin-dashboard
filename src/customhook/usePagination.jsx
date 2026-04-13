import React, { useEffect, useState } from "react";

export function usePagination(array = [], itemPerPage) {
  const [currentPage, setcurrentPage] = useState(1)
 
  const totalPage = Math.ceil(array.length / itemPerPage);
  const lastPageOfItem = currentPage * itemPerPage;
  const firstPageOfItem = lastPageOfItem - itemPerPage;
  

  const handlePrevPage = () =>{
    if(currentPage > 1){
        setcurrentPage(currentPage - 1)
    }
  }
  
 const handleNextPage = () =>{
    if(currentPage < totalPage){
        setcurrentPage(currentPage + 1)
    }
  }

useEffect(() => {
  setcurrentPage(1);
}, [array.length, itemPerPage]);

  return [array, lastPageOfItem, firstPageOfItem, currentPage, totalPage, handlePrevPage, handleNextPage];
}
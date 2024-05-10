import React from 'react';
import './styles/pagination.css';

const Pagination = ({ pokePerPage, totalPokemon, paginate, currentPage}) => {

const pageNumbers = [];

const totalPages = Math.ceil(totalPokemon/pokePerPage);

const firstPage = Math.max(1, currentPage - 1);

const lastPage = Math.min(totalPages, currentPage + 1);

for (let i = firstPage; i<= lastPage; i++) {
    pageNumbers.push(i);
}

const handleFirst= (event) => {
event.preventDefault();
paginate(1);
}
const handleLast= (event) => {
    event.preventDefault();
    paginate(totalPages);
   
}
const handlePlusOne= (event) => {
    event.preventDefault();
    if (currentPage < totalPages) {
        paginate(currentPage + 1)
    }
}
const handleLessOne = (event) => {
    event.preventDefault();
    if (currentPage > 1 ) {
        paginate(currentPage - 1)
    }
}
  return (
    <div className='pagination'>
        <button className='pagination__btn' onClick={handleFirst}>{'<<'}</button>
        <button className='pagination__btn' onClick={handleLessOne}>{'<'}</button>

        {pageNumbers.map(number => (
            <li className='pagination__number' key={number}><button onClick={(event)=>{
                event.preventDefault();
                paginate(number);
            }} href='/#/pokedex'>{number}</button></li>
        ))}

        <button className='pagination__btn' onClick={handlePlusOne}>{'>'}</button>
        <button className='pagination__btn' onClick={handleLast}>{'>>'}</button>
    </div>
  )
}

export default Pagination;
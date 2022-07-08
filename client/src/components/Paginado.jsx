import React from 'react';
import '../styles/Paginado.css';

export default function Paginado({vgPerPage, array, paginado}) {
    const pageNumbers = [];

    for(let i=1; i<=Math.ceil(array / vgPerPage); i++){
        pageNumbers.push(i)
    }
    return (
        <nav className='navigation'>
            <ul>{
                pageNumbers && pageNumbers.map(number => {
                    return(
                        <li key={number}>
                            <a onClick={(e) => paginado(e, number)} className="numberPage">{number}</a>
                        </li>
                    )
                })
            }
            </ul>
        </nav>
    )
}

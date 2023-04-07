import React from 'react'
import s from './Pagination.module.css'

export default function Pagination({ handlePrev, handleNext, currentPage}) {

    // const pageNumbers = []

    // for (let i = 1; i <= Math.ceil(allCountries / countriesPerPage); i++) {
    //     pageNumbers.push(i)
    // }

    return (
        <div className={s.bar}>

<h1 className={s.numero} >Pagina:{currentPage} </h1>
<button  className={s.prev} onClick={handlePrev} disabled={currentPage === 1 ? true : false}> Prev</button>
<button className={s.next} onClick={handleNext} disabled={currentPage === 24? true : false}> Next </button>

            {/* <ul>
                {pageNumbers &&
                    pageNumbers.map(number => (
                        <li key={number}>
                            <button id={s.number} className={currentPage === number ? s.active : null} onClick={() => paginado(number)}> {number} </button>
                        </li>
                    ))
                }
            
            </ul> */}
        </div>
    )
}
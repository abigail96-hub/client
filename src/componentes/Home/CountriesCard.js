import React from 'react'
import s from './CountriesCard.module.css';
import {Link} from 'react-router-dom'

export default function CountriesCard ({ id, name, img, continents, capital}) {
    return(
        <div className={s.cuadro} >      
            <div className={s.first}>  
                <img className={s.flag} src={img} alt={name} />
                <span className={s.country}>{name}</span>
            </div> 
            <div className={s.continent}>
                <span>Continent:</span>
                <span>{continents}</span>
            </div>
            <div className={s.continent}>
                <span>Capital:</span>
                <span>{capital}</span>
            </div>
            
            <div>
                <Link to={`/home/country/${id}`} className={s.link} >
                    <button className={s.btn}> More detail</button>
                </Link>
            </div>
        </div>
    )
}
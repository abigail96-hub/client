import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
// import notFoundImage from '../../images/error.jpg'
import style from './NotFound.module.css';
import Loading from '../Loading/LoadingComponent';


export default function NotFound() {

    const [isLoading, setIsLoading] = useState(false)
    useEffect(()=> {
        setIsLoading(true)
    }, [])
    
    if(isLoading) {
        setTimeout(() => {
              setIsLoading(false)
        }, 1000)
            return <Loading />
    }
    
    return (
        <div className={style.back}>
            <div id={style.notFoundCountry} > 
                {/* <img src={notFoundImage} alt='Not Found'/> */}
            </div>
            <div id={style.btn}>
                <Link to='/home'>   
                        <button> Back to countries </button>
                </Link> 
            </div>
        </div>
    )
}
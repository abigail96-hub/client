import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { cleanCountryDetail, getCountryById } from '../../redux/actions/actions';
// import logo from '../../images/info3.png';
import { Link } from 'react-router-dom';
import s from './CountryDetail.module.css';
import Loading from '../Loading/LoadingComponent';
import NotFound from '../NotFound/NotFound';

export default function Detail() {

    let { id } = useParams()
    let dispatch = useDispatch();
    let detail = useSelector(state => state.countryDetail);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true);
        dispatch(getCountryById(id));
        return () => dispatch(cleanCountryDetail())
    }, [dispatch, id])

    function formatNumber(number) {
        return new Intl.NumberFormat().format(number)
    }

    if (!detail.id) return <NotFound />

    if (isLoading) {
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
        return <Loading />
    }

    return (
        <div className={s.all}>
            <div className={s.up}>
                <div id={s.flag}>
                    <img id={s.img} src={detail.img} alt={detail.name} />
                </div>
                <span className={s.name}>
                    {detail.name}
                </span>
            </div>

            <div className={s.down}>
                <div id={s.cuadro}>
                    <span className={s.info}> Country Information</span>
                    <a href={detail.maps} target='blank'>
                        <img id={s.maps}  alt='logo' />
                    </a>
                </div>
                <div className={s.cuadro}>
                    <span className={s.span1}>Code:</span>
                    <span className={s.span2}>{detail.id}</span>
                </div>
                <div className={s.cuadro}>
                    <span className={s.span1}>Continent:</span>
                    <span className={s.span2}>{detail.continents}</span>
                </div>
                <div className={s.cuadro}>
                    <span className={s.span1}>Capital:</span>
                    <span className={s.span2}>{detail.capital}</span>
                </div>
                <div className={s.cuadro}>
                    <span className={s.span1}>Subregion:</span>
                    <span className={s.span2}>{detail.subregion}</span>
                </div>
                <div className={s.cuadro}>
                    <span className={s.span1}>Area:</span>
                    <span className={s.span2}>{formatNumber(detail.area)} km2</span>
                </div>
                <div className={s.cuadro}>
                    <span className={s.span1}>Population</span>
                    <span className={s.span2}>{formatNumber(detail.population)}</span>
                </div>
            </div>

            <div className={s.card2}>
                <div id={s.title}>
                    <p>Activities</p>
                </div>
                {
                    detail.activities && detail.activities.map(a => {
                        return (
                            <div key={a.id}>
                                <div className={s.cuadro}>
                                    <span id={s.activity}>{a.name}</span>
                                </div>
                                <div className={s.cuadro}>
                                    <span className={s.span3}>Difficult:</span>
                                    <span className={s.span4}>{a.difficult}</span>
                                </div>
                                <div className={s.cuadro}>
                                    <span className={s.span3}>Duration:</span>
                                    <span className={s.span4}>{a.duration}</span>
                                </div>
                                <div className={s.cuadro}>
                                    <span className={s.span3}>Season:</span>
                                    <span className={s.span4}>{a.season}</span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className={s.btn}>
                <Link to='/home'>
                    <button> Back to countries </button>
                </Link>
            </div>
        </div>

    )
}
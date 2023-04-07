import React from 'react';
import { useSelector } from 'react-redux';
import s from './FilterBar.module.css';


export default function FilterBar({ handleClickActivity, handleClickFilter, handleClickContinent }) {

    const activities = useSelector(state => state.activities)

    return (
        <div className={s.all}>
            <div id={s.f1}>
                <p className={s.search}>
                    Filter by Continent:
                </p>
                <select id='firstSelect' onChange={e => handleClickContinent(e)}>
                    <option value='All'>All continents</option>
                    <option value='Africa'>Africa</option>
                    <option value='Antarctica'>Antartica</option>
                    <option value='Asia'>Asia</option>
                    <option value='Europe'>Europe</option>
                    <option value='South America'>South America</option>
                    <option value='North America'>North America</option>
                    <option value='Oceania'>Oceania</option>
                </select>
            </div>
            <div>
                <p className={s.search}>
                    Filter by Activity:
                </p>
                <select id='secondSelect' onChange={e => handleClickActivity(e)} >
                    <option value='All'>Select activity</option>
                    {activities && activities.map(a => (
                        <option value={a.name} key={a.id}>{a.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <p className={s.search}>
                    Sort by:
                </p>
                <select id='thirdSelect' onChange={e => handleClickFilter(e)}>
                    <option value='All'>Please select</option>
                    <option value='asc'>A-Z</option>
                    <option value='desc'>Z-A</option>
                    <option value='maxPop'>Ascending population</option>
                    <option value='minPop'>Descending population</option>
                    <option value='maxArea'>Largest Area</option>
                    <option value='minArea'>Smaller Area</option>
                </select>
            </div>
            {/* <div className={s.btn}>
                <button onClick={e => handleClickReset(e)}>Reset filters</button> */}
            </div>
        
    )
}
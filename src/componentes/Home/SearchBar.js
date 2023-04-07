import React from 'react'
import { useDispatch } from 'react-redux'
import { getCountryByName } from '../../redux/actions/actions'
import s from './SearchBar.module.css';

export default function SearchBar({ setCurrentPage, name, setName}){
  const dispatch = useDispatch();

  function handleChange(e) {
    e.preventDefault();
    setName(e.target.value);
    dispatch(getCountryByName(e.target.value));
    setCurrentPage(1);
    document.getElementById("firstSelect").getElementsByTagName('option')[0].selected = 'selected';
    document.getElementById("secondSelect").getElementsByTagName('option')[0].selected = 'selected';
    document.getElementById("thirdSelect").getElementsByTagName('option')[0].selected = 'selected';
}

return (

    <div className={s.all}>   
    <span className={s.search}>
        Search country by name:
    </span>
    <form className={s.bar}  >
        <input  type='text' 
                id='name' 
                placeholder="Country name..." 
                autoComplete='off' 
                value={name}
                className={s.input}
                onChange={(e) => handleChange(e)}
         />             
    </form>
</div>








)






}
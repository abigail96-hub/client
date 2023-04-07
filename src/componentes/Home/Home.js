import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCountries, getActivities, orderBy, filterByContinent, filterByActivities, cleanCountries } from '../../redux/actions/actions';
import CountriesCard from './CountriesCard';
import s from './Home.module.css';
import FilterBar from './FilterBar';
import Pagination from './Pagination'
import SearchBar from './SearchBar';
import Loading from '../Loading/LoadingComponent';




export default function Home() {

    const dispatch = useDispatch();
    const allCountries = useSelector((state => state.countries));
    const [orden, setOrden] = useState('');
    let [resetChange, setResetChange] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [countriesPerPage, setCountriesPerPage] = useState(8);
    const lastIndex = currentPage * countriesPerPage;
    const firstIndex = lastIndex - countriesPerPage;
    const currentCountries = allCountries?.slice(firstIndex, lastIndex);
    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
   

    // const lastIndex = currentPage === 1 ? 9 : currentPage * countriesPerPage - 1
    // const firstIndex = currentPage === 1 ? 0 : lastIndex - countriesPerPage                



    // const paginado = (pageNumber) => {
    //     setCurrentPage(pageNumber);
    // }


// const nextHanlder = () => {
//     const totalElements  = allCountries.length;
//     const nextPage = currentPage + 1;
//     const firstIndex = nextPage * countriesPerPage;

//     if(firstIndex === totalElements) return;
//     setCurrentPage(nextPage)

// }

// const prevHanlder = () => {

// setCurrentPage(prev => prev -1)
     


// }



function handlePrev(e){
    e.preventDefault();

    setCurrentPage(prev => prev -1);
}

function handleNext(e){
    e.preventDefault();
    const totalElements  = allCountries.length;
    const nextPage = currentPage + 1;
    const firstIndex = nextPage * countriesPerPage;

    if(firstIndex === totalElements) return;
    setCurrentPage(prev => prev +1);
}




    useEffect(() => {
        // setSecond(true)
        setIsLoading(true);
        dispatch(getCountries(setIsLoading));
        dispatch(getActivities());
        return () => dispatch(cleanCountries())
    }, []);

    function handleClickContinent(e) {
        e.preventDefault()
        dispatch(filterByContinent(e.target.value));
        setCurrentPage(1);
       
    }

    function handleClickActivity(e) {
        e.preventDefault();
        dispatch(filterByActivities(e.target.value));

    }
    function handleClickFilter(e) {
        e.preventDefault();
        dispatch(orderBy(e.target.value));
        setOrden(`Ordenado ${e.target.value} ${resetChange}`); }



        function handleClickReset(e){
            e.preventDefault();
            dispatch(getCountries(setIsLoading));
        }


  
   

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className={s.all}>
            <div className={s.container}>
                <div className={s.horizontal}>
                    <div className={s.bar}>
                        <SearchBar className={s.search} setCurrentPage={setCurrentPage} name={name} setName={setName} />
                        <FilterBar className={s.filter}
                            handleClickActivity={handleClickActivity}
                            handleClickReset={handleClickReset} 
                            handleClickFilter={handleClickFilter}
                            handleClickContinent={handleClickContinent}
                        />
                    </div>
                    <div className={s.cards}>
                        {
                            currentCountries?.length > 0 ?
                                currentCountries?.map(c => {
                                    return (
                                        <CountriesCard key={c.id} id={c.id} name={c.name} img={c.img} continents={c.continents} capital={c.capital} />
                                    )
                                }) :
                                <div id={s.noCountries}>
                                    <p>
                                        No countries were found with these parameters.
                                    </p>
                                    <p>
                                        Try a new search ...
                                    </p>
                                </div>


                        }
                    </div>
                </div>

              

                <Pagination 
                allCountries={allCountries?.length}
                countriesPerPage={countriesPerPage}
                currentPage={currentPage}
                handlePrev={handlePrev}
                handleNext={handleNext}
                // countriesPerPage={countriesPerPage}
                //     allCountries={allCountries?.length}
                //     paginado={paginado}
                //     currentPage={currentPage}
                />

             {/* <footer>
                
                <div className={s.socialiconscontainer}>
                <a href={"www.linkedin.com/in/abigail-cortés-sánchez-8252381a3"} class={s.socialicon}></a>
                <a href="" class={s.socialicon}></a>
                <a href="" class={s.socialicon}></a>
                 </div>
             
             <ul className={s.menu}> 
              <li className={s.item}>Github</li>
             <li className={s.item}>linkedin</li>
             <li className={s.item}>Henry Pi </li>
             </ul> 
             <span className={s.copyright}>&copy; 2023, Henry Countries Pi</span>
             </footer> */}

            
            </div>
           
        </div>
        
    )
}

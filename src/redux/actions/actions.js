import axios from 'axios';


export function getCountries(setisLoading){
return async function (dispatch){
    try {
      let allCountries = await axios.get("http://localhost:3001/country")
      dispatch({
        type: 'GET_COUNTRIES',
        payload: allCountries.data
      })
      setisLoading(false)
    } 
    catch (error) {
      console.log('Error getCountries' + error)
    }
 
} 
   
}




export function getCountryById(id){
  return async function(dispatch){
    try{
        let countryDetail = await axios.get(`http://localhost:3001/country/${id}`)
        return dispatch({
            type: 'GET_COUNTRY_DETAIL',
            payload: countryDetail.data
        })
    }
    catch(error){
        console.log('Error getCountryById' + error)
    }
}
}
 

 

export function getCountryByName(name){

  return async function(dispatch){
    try{
        let countryByName = await axios.get(`http://localhost:3001/country?name=${name}`)
        return dispatch({
            type: 'GET_COUNTRY_BY_NAME',
            payload: countryByName.data
        })
    }
    catch(error){
        console.log('Error getCountryByName'+ error)
    }
}
}



export function  filterByContinent(payload){
 return{
      type: 'FILTER_BY_CONTINENT',
      payload
 }
}

export function orderBy(payload){
    return{
        type: 'ORDER_BY',
        payload
    }
} 


export function postActivity(payload){
  return async function (dispatch){
      try{
          let activity = await axios.post(`http://localhost:3001/activity/`, payload)
          return dispatch({
              type: 'POST_ACTIVITY',
              payload: activity.data
          })
      }
      catch(error){
          console.log('Error postActivity' + error)
      }
  }
}





export function getActivities(){
  
  return async function (dispatch) {
      try{
          let allActivities = await axios.get("http://localhost:3001/activity/");
          // console.log("---------",allActivities.data)
          return dispatch({
              type: 'GET_ACTIVITIES',
              payload: allActivities.data
          })
      }
      catch(error){
          console.log('Error getActivities' + error)
      }
  }
}








export function filterByActivities(payload){
  return{
   type: 'FILTER_BY_ACTIVITIES',
   payload
  } 
}

export function cleanCountries(){
  return{
      type: 'CLEAN_COUNTRIES'
  }
}

export function cleanCountryDetail(){
  return{
      type: 'CLEAN_COUNTRY_DETAIL'
  }
}
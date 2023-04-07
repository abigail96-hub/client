import './App.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import LandingPage from './componentes/LandingPage/LandingPage';
import React from 'react'
import Home from './componentes/Home/Home'
import NavBar from './componentes/NavBar/NavBar';
import Detail from './componentes/CountryDetail/CountryDetail';
import ActivityCreate from './componentes/ActivityCreate/activityCreate';
import NotFound from './componentes/NotFound/NotFound';






function App() {
  return (
    <div>
    <BrowserRouter> 
    <Switch> 
  <Route exact path={'/'} component={LandingPage} />
  <Route exact path={'/home'} component={Home} />
  <Route exact path={'/home/country/:id'} component={Detail}/>
  
  <Route exact path={'/home/activity/'} component={ActivityCreate}/>
  <Route element={NotFound}/>
      </Switch>
      <Route path={'/home'} render={({match}) => <NavBar match={match}/>}/>
      </BrowserRouter>
    </div>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Dashboard from './core/Dashboard';
import MovieList from './movies/MovieList';
import MovieDetails from './movies/MovieDetails';
import AddMovie from './movies/AddMovie';
import EditMovie from './movies/EditMovie';

import DirectorsList from './directors/DirectorsList';
import DirectorDetails from './directors/DirectorDetails';
import AddDirector from './directors/AddDirector';
import EditDirector from './directors/EditDirector';


import ActorList from './actors/ActorList';
import ActorDetails from './actors/ActorDetails';
import AddActor from './actors/AddActor';
import EditActor from './actors/EditActor';



function App() {
  
  return (
    <Router>
    <div className="App">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/movies">Movies</Link>
          </li>

          <li>
            <Link to="/directors">Directors</Link>
          </li>

          <li>
            <Link to="/actors">Actors</Link>
          </li>
        </ul>
      </nav>


      <Switch>
        <Route exact path="/movies" component={MovieList}/>
        <Route exact path="/movies/add" component={AddMovie}/>
        <Route exact path="/movies/:id" component={MovieDetails}/>
        <Route exact path="/movies/:id/edit" component={EditMovie}/>

        <Route exact path="/directors" component={DirectorsList}/>
        <Route exact path="/directors/add" component={AddDirector}/>
        <Route exact path="/directors/:id" component={DirectorDetails}/>
        <Route exact path="/directors/:id/edit" component={EditDirector}/>
          
        <Route exact path="/actors" component={ActorList}/>
        <Route exact path="/actors/add" component={AddActor}/>
        <Route exact path="/actors/:id" component={ActorDetails}/>
        <Route exact path="/actors/:id/edit" component={EditActor}/>
          

        <Route exact path="/" component={Dashboard}/>
          
        
      </Switch>
    </div>
    </Router>
  );
}

export default App;
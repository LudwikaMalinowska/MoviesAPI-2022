import './App.css';

import {
  BrowserRouter as Router,
  Route, Switch,
  Link
} from "react-router-dom";

import Dashboard from './ui/core/Dashboard'

import MovieList from './ui/movies/MovieList';
import MovieDetails from './ui/movies/MovieDetails';
import MovieForm from './ui/movies/MovieForm';

import PersonList from './ui/persons/PersonList';
import PersonDetails from './ui/persons/PersonDetails';
import PersonForm from './ui/persons/PersonForm';

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
              <Link to="/persons">Persons</Link>
            </li>
          </ul>
        </nav>


        <Switch>
        <Route exact path="/movies" component={MovieList}/>
        <Route exact path="/movies/add" component={MovieForm}/>
        <Route exact path="/movies/:idMovie" component={MovieDetails}/>
        <Route exact path="/movies/:idMovie/edit" component={MovieForm}/>

        <Route exact path="/persons" component={PersonList}/>
        <Route exact path="/persons/add" component={PersonForm}/>
        <Route exact path="/persons/:id" component={PersonDetails}/>
        <Route exact path="/persons/:id/edit" component={PersonForm}/>

        <Route exact path="/" component={Dashboard}/>
        </Switch>

      </div>
    </Router>
  );
}

export default App;

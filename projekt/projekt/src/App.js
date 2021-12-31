import './App.css';

import {
  BrowserRouter as Router,
  Route, Switch,
  Link
} from "react-router-dom";

import i18next from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import Backend from 'i18next-http-backend';
import languages from './config/languages';

import Dashboard from './ui/core/Dashboard'

import MovieList from './ui/movies/MovieList';
import MovieDetails from './ui/movies/MovieDetails';
import MovieForm from './ui/movies/MovieForm';

import PersonList from './ui/persons/PersonList';
import PersonDetails from './ui/persons/PersonDetails';
import PersonForm from './ui/persons/PersonForm';

import ActorList from './ui/actors/ActorList';


const language = languages.find(value => value === localStorage.getItem('language'));

i18next.use(Backend)
  // .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: language || 'en',
    // aktywuje LanguageDetector 
    // detection: { order: ["path", "navigator"] },
    fallbackLng: 'en',
    ns: [ 'main' ],
    defaultNS: 'main',
    react: {
      wait: true,
      useSuspense: false
    },
    interpolation: {
      escapeValue: false
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    }
  })


function App() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  }

  return (
    <Router>
      <div className="App">
        <button onClick={() => changeLanguage('pl')}>PL</button>
        <button onClick={() => changeLanguage('en')}>EN</button>
        <nav>
          <ul>
            <li>
              <Link to="/">{t("home")}</Link>
            </li>
            <li>
              <Link to="/movies">{t("movies")}</Link>
            </li>
            <li>
              <Link to="/persons">{t("persons")}</Link>
            </li>
            <li>
              <Link to="/actors">{t("actors")}</Link>
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

        <Route exact path="/actors" component={ActorList}/>
        
        <Route exact path="/" component={Dashboard}/>
        </Switch>

      </div>
    </Router>
  );
}

export default App;

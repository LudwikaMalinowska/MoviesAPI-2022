import logo from './logo.svg';
import './App.css';

//In react-router-dom v6, "Switch" is replaced by routes "Routes".
import {
  BrowserRouter as Router,
  Route, Switch,
  Link
} from "react-router-dom";


import i18next from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import languages from './config/languages';


import UserList from './ui/users/UserList';
import UserDetails from './ui/users/UserDetails';

import ProductList from "./ui/products/ProductList";
import ProductDetails from "./ui/products/ProductDetails";
import EditProduct from './ui/products/EditProduct';
import Dashboard from './ui/core/Dashboard';


const language = languages.find(value => value === localStorage.getItem('language'));

i18next.use(Backend)
  // .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: language || 'en',
    // aktywuje LanguageDetector 
    // detection: { order: ["path", "navigator"] },
    fallbackLng: 'en',
    ns: [ 'en', 'pl' ],
    defaultNS: 'en',
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
              <Link to="/users">{t("users")}</Link>
            </li>
            <li>
              <Link to="/products">{t("products")}</Link>
            </li>
          </ul>
        </nav>


        <Switch>
        <Route exact path="/users" component={UserList}/>
        <Route exact path="/users/:idUser" component={UserDetails}/>

        <Route exact path="/products" component={ProductList}/>
        <Route exact path="/products/:id" component={ProductDetails}/>
        <Route exact path="/products/:id/edit" component={EditProduct}/>

        <Route exact path="/" component={Dashboard}/>
        </Switch>

      </div>
    </Router>
   
  );
}
//and in Route change component={...} to element={...}

export default App;

import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import UserList from './users/UserList';
import UserDetails from './users/UserDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            {/* <li>
              <Link to="/">Home</Link>
            </li> */}
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>


        <Switch>
        <Route exact path="/users" component={UserList}/>
        <Route exact path="/users/:idUser" component={UserDetails}/>
        </Switch>

      </div>
    </Router>
   
  );
}

export default App;

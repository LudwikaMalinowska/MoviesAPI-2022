import logo from './logo.svg';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import {Route, Switch, Redirect} from 'react-router-dom';
import Page from './components/Page';
import Todo from './components/Todo';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Page}/>
        <Route exact path="/todos/:todoId" component={Todo}/>
        {/* <Route exact path="/todos" component={Page}/> */}
      </Switch>
    </div>
  );
}

export default App;

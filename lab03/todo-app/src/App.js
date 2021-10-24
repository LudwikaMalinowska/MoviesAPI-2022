import logo from './logo.svg';
import './App.css';
import TodoForm from './components/todos/TodoForm';
import TodoList from './components/todos/TodoList';
import {Route, Switch, Redirect} from 'react-router-dom';
import TodoPage from './components/todos/TodoPage';
import Todo from './components/todos/Todo';
import NotesPage from './components/notes/NotesPage';
import NoteDetails from './components/notes/NoteDetails';
import Page from "./components/Page";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Page}/>
        <Route exact path="/todos/:todoId" component={Todo}/>
        <Route exact path="/todos" component={TodoPage}/>
        <Route exact path="/notes" component={NotesPage}/>
        <Route exact path="/notes/:noteId" component={NoteDetails}/>
      </Switch>
    </div>
  );
}

export default App;

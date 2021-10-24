import {useState} from 'react';
import { connect } from "react-redux";

import EditForm from './EditForm';


// http://localhost:3000/todos/1
const Todo = (props) => {
    const [editMode, setEditMode] = useState(false);
    const todoId = props.match.params.todoId;
    const todo = props.todos.find(todo => todo.id == todoId);
    return (
    <div className="todo">
        <p>Nazwa: {todo.name} </p>
        <p>Data: {todo.date} </p>
        <p>Zrobione: {String(todo.done)}</p> 
        {todo.done ? null : <button onClick={() => props.finishTodoAction(todo)}>Wykonane</button>}
        {editMode ? <EditForm setEditMode={setEditMode} {...todo}/> : <button onClick={() => {
            setEditMode(true)
        }}>Edytuj</button>}
        <button onClick={() => props.deleteTodoAction(todo)}>X</button>
    </div>
    )
}

const mapStateToProps = (state) => {
    
    // const todo = state.filter(todo => todo.id === todoId);
    return {
        todos: state
    };
}

const mapDispatchToProps = {
    
}


export default connect(mapStateToProps, mapDispatchToProps)(Todo);
import {useState} from 'react';
import { connect } from "react-redux";

import EditForm from './EditForm';
import { deleteTodoAction, finishTodoAction, editTodoAction } from '../../actions/TodoActions';


// http://localhost:3000/todos/1
const Todo = (props) => {
    const [editMode, setEditMode] = useState(false);
    // const todos = props.state.todos;
    // const todoId = props.match.params.todoId;
    // const todo = todos.find(todo => todo.id == todoId);

    const todo = props.todoToShow;
    // console.log(props);
    // console.log(todo);

    const content = todo ?  (
    <div className="todo">
        <p>Nazwa: {todo.name} </p>
        <p>Data: {todo.date} </p>
        <p>Zrobione: {String(todo.done)}</p> 

        {todo.done ? null : <button onClick={() => props.finishTodoAction(todo)}>Wykonane</button>}

        {editMode? <EditForm setEditMode={setEditMode} {...todo}/> : <button onClick={() => {
            setEditMode(true);
        }}>Edytuj</button>}
        
        <button onClick={() => props.deleteTodoAction(todo)}>X</button>
    </div>
    ) : null;



    return (
        <>
        {content}
        </>
    )
}

const mapStateToProps = (state, props) => {
    //console.log(props);
    const todoId = props.match.params.todoId;
    const todoToShow = state.todos.find(todo => todo.id == todoId);
    
    return {
        state,
        todoToShow
    }
}

const mapDispatchToProps = {
    deleteTodoAction,
    finishTodoAction,
    editTodoAction
}


export default connect(mapStateToProps, mapDispatchToProps)(Todo);
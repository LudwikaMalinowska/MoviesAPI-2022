import {useState} from 'react';
import { connect } from "react-redux";
import { deleteTodoAction, editTodoAction, finishTodoAction} from "../actions/TodoActions";
import EditForm from './EditForm';

const TodoList = (props) => {
    const [editMode, setEditMode] = useState(false);
    const content = props.todos ? props.todos.map(todo => (
        <div key={todo.id}>
        <p>{todo.name} {todo.date} {String(todo.done)}</p>
        {todo.done ? null : <button onClick={() => props.finishTodoAction(todo)}>Wykonane</button>}
        {editMode ? <EditForm setEditMode={setEditMode} {...todo}/> : <button onClick={() => {
            setEditMode(true)
        }}>Edytuj</button>}
        <button onClick={() => props.deleteTodoAction(todo)}>X</button>
        </div>)) : null;
    console.log(props)
    return (
        <div>{content}</div>
    )
}

const mapStateToProps = (state) => {
    return {
        todos: state
    };
}

const mapDispatchToProps = {
    deleteTodoAction,
    editTodoAction,
    finishTodoAction
}


export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
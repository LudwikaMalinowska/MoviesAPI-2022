import {useState} from 'react';
import { connect } from "react-redux";
import { deleteTodoAction, editTodoAction, finishTodoAction} from "../../actions/TodoActions";
import EditForm from './EditForm';

const TodoList = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState('');

    const todos = props.state.todos;

    const content = todos ? todos.map(todo => (
        <div key={todo.id}>
        <p>{todo.name} {todo.date} {String(todo.done)}</p>

        {todo.done ? null : <button onClick={() => props.finishTodoAction(todo)}>Wykonane</button>}

        {(editMode && editId == todo.id)  ? <EditForm setEditMode={setEditMode} setEditId={setEditId} {...todo}/> : <button onClick={() => {
            setEditId(todo.id);
            setEditMode(true)
        }}>Edytuj</button>}

        <button onClick={() => props.deleteTodoAction(todo)}>X</button>

        </div>)) : null;
    // console.log(props)
    // console.log("content: ", content);
    return (
        <div>{content}</div>
    )
}

const mapStateToProps = (state) => {
    return {
        state
    };
}

const mapDispatchToProps = {
    deleteTodoAction,
    editTodoAction,
    finishTodoAction
}


export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
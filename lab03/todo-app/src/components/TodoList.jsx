import { connect } from "react-redux";
import { deleteTodoAction} from "../actions/TodoActions";

const TodoList = ({todos, deleteTodoAction}, props) => {
    const content = todos.map(todo => (<div>
        {todo.name} 
        <button onClick={() => deleteTodoAction(todo)}>X</button>
        </div>));
    return (
        <div></div>
    )
}

const mapStateToProps = (state) => {
    return {
        todos: state.todos
    };
}

const mapDispatchToProps = {
    deleteTodoAction
}


export default connect(mapStateToProps, mapDispatchToProps)(TodoList);

import { useEffect } from "react";
import { Formik, Field, Form, ErrorMessage} from "formik";
import { connect } from 'react-redux';
import {v4 as uuidv4 } from 'uuid';
import {addTodoAction} from '../actions/TodoActions';




const TodoForm = ({todos, addTodoAction}, props) => {
    // useEffect(() => {
    //     console.log('Todos', todos);
    // }, [todos])

    const initialValues = {
        id: uuidv4(),
        name: "",
        date: "",
        done: false
    }
    const handleSubmit = (values) => {
        addTodoAction(values);
    }

  return (

    <Formik 
      initialValues={initialValues}
      onSubmit={(values) => handleSubmit(values)}
      enableReinitialize={true}
    >
      <Form>
        <label >Nazwa : </label>
        <Field name="name"></Field>
        {/* <ErrorMessage name="name" component="div"/> */}

        <label >Data: </label>
        <Field name="date" type="date"></Field>
        {/* <ErrorMessage name="date" component="div"/> */}
        
        <button type="submit">Dodaj</button>
      </Form>
    </Formik>
  )

};

const mapStateToProps = (state) => {
    return {
        todos: state.todos
    }
};

const mapDispatchToProps = {
    addTodoAction
};


export default connect(mapStateToProps, mapDispatchToProps)(TodoForm);
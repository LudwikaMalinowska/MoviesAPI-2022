
import { useEffect } from "react";
import { Formik, Field, Form, ErrorMessage} from "formik";
import { connect } from 'react-redux';
import {v4 as uuidv4 } from 'uuid';
import {editTodoAction} from '../../actions/TodoActions';




const EditForm = (props) => {
    // useEffect(() => {
    //     console.log('Todos', todos);
    // }, [todos])

    const initialValues = {
        name: props.name,
        date: props.date,
        done: props.done
    }
    const handleSubmit = (values) => {
        console.log(values);
        props.editTodoAction({id: props.id, ...values});
        props.setEditMode(false);
        props.setEditId('');
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

        <label >Done: </label>
        <Field name="done" type="checkbox"></Field>
        
        <button type="submit">Zatwierdź</button>
      </Form>
    </Formik>
  )

};

const mapStateToProps = (state) => {
    return {
        todos: state
    }
};

const mapDispatchToProps = {
    editTodoAction
};


export default connect(mapStateToProps, mapDispatchToProps)(EditForm);
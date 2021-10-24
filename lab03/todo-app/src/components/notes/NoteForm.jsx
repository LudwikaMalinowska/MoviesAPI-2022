import { connect } from "react-redux";
import { Formik, Field, Form, ErrorMessage} from "formik";
import {v4 as uuidv4 } from 'uuid';

import { addNoteAction, editNoteAction, deleteNoteAction } from "../../actions/NotesActions";

const NoteForm = (props) => {
    const initialValues = {
        id: uuidv4(),
        content: "",
    }
    const handleSubmit = (values) => {
        props.addNoteAction(values);
    }

  return (

    <Formik 
      initialValues={initialValues}
      onSubmit={(values) => handleSubmit(values)}
      enableReinitialize={true}
    >
      <Form>
        <label >Treść notatki : </label>
        <Field name="content"></Field>
        
        <button type="submit">Dodaj</button>
      </Form>
    </Formik>
  )
}

const mapStateToProps = (state) => {
    return {
        state
    }
};

const mapDispatchToProps = {
    addNoteAction,
};


export default connect(mapStateToProps, mapDispatchToProps)(NoteForm);
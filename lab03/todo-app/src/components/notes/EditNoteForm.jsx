import { Formik, Field, Form} from "formik";
import { connect } from 'react-redux';
import {editNoteAction} from '../../actions/NotesActions';


const EditNoteForm = (props) => {

    const initialValues = {
        content: props.content
    }
    const handleSubmit = (values) => {
        console.log(values);
        props.editNoteAction({id: props.id, ...values});
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
        <label >Treść notatki : </label>
        <Field name="content"></Field>
        
        <button type="submit">Zatwierdź</button>
      </Form>
    </Formik>
  )

};

const mapStateToProps = (state) => {
    return {
        notes: state
    }
};

const mapDispatchToProps = {
    editNoteAction
};


export default connect(mapStateToProps, mapDispatchToProps)(EditNoteForm);


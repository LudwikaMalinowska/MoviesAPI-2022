import {useState} from "react";
import { connect } from "react-redux";
import { addNoteAction, editNoteAction, deleteNoteAction } from "../../actions/NotesActions";
import EditNoteForm from "./EditNoteForm";

const NoteList = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState('');

    const notes = props.state.notes;
    const content = notes ? (notes.map(note => (
    <div className="note" key={note.id}
    noteToShow={note} >
        <p>Notatka: {note.content}</p>

        {(editMode && editId == note.id) ? <EditNoteForm 
        setEditMode={setEditMode} 
        setEditId={setEditId}
        {...note}/> : <button onClick={() => {
            setEditId(note.id)
            setEditMode(true)
            }}>Edytuj</button>}

        <button onClick={() => props.deleteNoteAction(note)}>X</button>
    </div>)))
    : null;
    
    return (
     <div>{content}</div>
    );
}

const mapStateToProps = (state) => {
    return {
        state
    }
};

const mapDispatchToProps = {
    editNoteAction,
    deleteNoteAction
};


export default connect(mapStateToProps, mapDispatchToProps)(NoteList);
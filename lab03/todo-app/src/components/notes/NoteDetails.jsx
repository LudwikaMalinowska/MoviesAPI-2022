import {useState} from "react";
import { connect } from "react-redux";
import { addNoteAction, editNoteAction, deleteNoteAction } from "../../actions/NotesActions";
import EditNoteForm from "./EditNoteForm";

// http://localhost:3000/notes/1
const NoteDetails = (props) => {
    const [editMode, setEditMode] = useState(false);
    const note = props.noteToShow;

    const pageContent = note ? (
        <div className="note">
            <p>Notatka: {note.content}</p>
            
            {editMode ? <EditNoteForm setEditMode={setEditMode} {...note}/> : <button onClick={() => {
            setEditMode(true)
            }}>Edytuj</button>}

            <button onClick={() => props.deleteNoteAction(note)}>X</button>
        </div>
    ) : null;

    return (
        <>
        {pageContent}
        </>
    )
}

const mapStateToProps = (state, props) => {
    const noteId = props.match.params.noteId;
    const noteToShow = state.notes.find(note => note.id == noteId);
    return {
        state,
        noteToShow
    }
};

const mapDispatchToProps = {
    editNoteAction,
    deleteNoteAction
};


export default connect(mapStateToProps, mapDispatchToProps)(NoteDetails);
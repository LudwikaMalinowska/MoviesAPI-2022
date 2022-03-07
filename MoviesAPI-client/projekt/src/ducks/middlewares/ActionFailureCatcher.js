const failureCatcher = store => next => action => {
    
    let result = next(action);
    

    if (result.error) {
        let errorSource = "";
        if (action.type.startsWith("MOVIE")) 
            errorSource = "Movie";
        else if (action.type.startsWith("PERSON")) 
            errorSource = "Person";
        else if (action.type.startsWith("ACTOR")) 
            errorSource = "Actor";
        alert(errorSource + ": Error connecting to the database!");
        return;
    }
    else {
        return result;
    }
    
}

export default failureCatcher;
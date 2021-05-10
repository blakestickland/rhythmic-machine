import React, { useContext, useState, memo } from 'react'
//import { sequenceList } from '../../constants/config'
import { Context } from '../../hooks/useStore'
import API from "../../utils/API"
import './styles.css'


const SavePattern = () => {
    const { sequence, trackList, patternList } = useContext(Context);

    // const maxid = 0;
    // patternList.map(function(obj){     
    //     if (obj.id > maxid) maxid = obj.id;    
    // });

    const [formObject, setFormObject] = useState({ title: "" })
    
    // When the form is submitted, use the API.saveBook method to save the book data
    // Then reload books from the database
    //TODO spread the formObject, need an onChange that updates the 
    //TODO[ ...formObject, title: e.target.value]
function handleFormSubmit(event) {
    event.preventDefault();
    setFormObject({...formObject, title: event.target.value}) // TODO needs to be inside the handleChange
    if (formObject.title) {
        API.savePattern({
            title: formObject.title,
            noteCount: formObject.noteCount,
            trackList: trackList 
        })
        .then(() => setFormObject({
            title: "",
        }))
        // .then(() => loadBooks())
        .catch(err => console.log(err));
    }
};
    return (
            <form>
                <label>Add a new pattern:</label>
                {/* <input onChange={handleOnChange} type="text" name="title"  placeholder="Enter pattern name" /> */}
                <input type="submit" value="Save" onClick={handleFormSubmit}></input>
            </form>
    )
};

export default memo(SavePattern)
import React, { memo } from 'react'
import './styles.css'


const SavePattern = ({ handleFormSubmit, handleInputChange }) => {
    return (
            <form>
                <label className="label_add_pattern">Add a new pattern:</label>
                <input className="form_element" onChange={handleInputChange} type="text" name="title"  placeholder="Enter pattern name" />
                <input className="form_element" type="submit" value="Save" onClick={handleFormSubmit}></input>
            </form>
    )
};

export default memo(SavePattern)
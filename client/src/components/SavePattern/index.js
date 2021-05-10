import React, { memo } from 'react'
import './styles.css'


const SavePattern = ({ handleFormSubmit, handleInputChange }) => {
    return (
            <form>
                <label>Add a new pattern:</label>
                <input onChange={handleInputChange} type="text" name="title"  placeholder="Enter pattern name" />
                <input type="submit" value="Save" onClick={handleFormSubmit}></input>
            </form>
    )
};

export default memo(SavePattern)
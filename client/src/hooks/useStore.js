import React, { useState, createContext, useEffect, useReducer } from "react";
import API from "../utils/API";

const initialState = {
    selectedSequence: {},
    toggleNote: () => {},
    selectSequence: () => {},
    sequenceConfigList: [],
};

const Context = createContext({
    selectedSequence: {},
    toggleNote: () => {},
    selectSequence: () => {},
    sequenceConfigList: [],
});

const appReducer = (state, action) => {
    switch (action.type) {
        case 'SET_SEQUENCE_LIST':
            return {
                ...state, 
                sequenceConfigList: action.value,
                selectedSequence: action.value[0]
            }
        case 'SET_SEQUENCE':
            return {
                ...state, 
                selectedSequence: state.sequenceConfigList.find(seq => seq.id === parseInt(action.value))
            }
        case 'SET_ON_NOTES':
            let newTrackList = state.selectedSequence.trackList.map((track, trackID) => {
                if (action.trackID === trackID) {
                    return {
                        ...track,
                        onNotes: action.value
                    }
                } else {
                    return track
                }
            })
            const sequence = {...state.selectedSequence, trackList: newTrackList}
            return {
                ...state,
                selectedSequence: sequence
            }
        default:
            return state
    }
}

const Provider = ({ children }) => {
    const [sequence, dispatch] = useReducer(appReducer, { initialState })

    const loadSequences = () => {
        API.getPatterns()
        .then((res) => {
            dispatch({
                type: 'SET_SEQUENCE_LIST',
                value: res.data
            })
        })
        .catch((err) => console.log(err));
    }

    useEffect(() => {
        // Loads all patterns and sets them to patterns
        loadSequences();
    }, []);

    const toggleNote = ({ trackID, stepID }) => {
        let newOnNotes;
        const onNotes = sequence.selectedSequence.trackList[trackID].onNotes

        if (onNotes.indexOf(stepID) === -1) {
            newOnNotes = [...onNotes, stepID];
        } else {
            newOnNotes = onNotes.filter(col => col !== stepID);
        }
        dispatch({
            type: 'SET_ON_NOTES',
            value: newOnNotes,
            trackID
        })
    }

    const selectSequence = (sequenceID) => {
        dispatch({
            type: 'SET_SEQUENCE',
            value: sequenceID,
        })
    }
    return (
        <Context.Provider value={{     
            sequence,
            toggleNote,
            selectSequence,
            loadSequences
     }}>
            {children}
        </Context.Provider>
    );
};

export { Provider, Context };

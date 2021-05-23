import React, { useState, createContext, useEffect, useReducer } from "react";
import API from "../utils/API";

const initialState = {
    sequence: {},
    toggleNote: () => {},
    selectSequence: () => {},
    sequenceConfigList: [],
    trackList: [],
};

const Context = createContext({
    sequence: {},
    toggleNote: () => {},
    selectSequence: () => {},
    sequenceConfigList: [],
    trackList: [],
});

const appReducer = (state, action) => {
    switch (action.type) {
        case 'SET_SEQUENCE_LIST':
            return {
                sequenceConfigList: action.value
            }
        case 'SET_SEQUENCE':
            return {
                ...state.sequenceConfigList.find(seq => seq.id === action.value)
            }
        case 'SET_ON_NOTES':
            let newTrackList = state.trackList.map((track, trackID) => {
                if (action.trackID === trackID) {
                    return {
                        ...track,
                        onNotes: action.value
                    }
                } else {
                    return track
                }
            })
            return {
                ...state,
                trackList: newTrackList
            }
        default:
            return state
    }
}

const Provider = ({ children }) => {
    const [seq, dispatch] = useReducer(appReducer, { initialState })

    const [ tempSequenceList, setTempSequenceList ] = useState();
    const [ sequence, setSequence ] = useState();
    const [ trackList, setTrackList ] = useState();

    useEffect(() => {
        // Loads all patterns and sets them to patterns
        API.getPatterns()
            .then((res) => {
                dispatch({
                    type: 'SET_SEQUENCE_LIST',
                    value: res.data
                })
                dispatch({
                    type: 'SET_SEQUENCE',
                    value: res.data[0],
                })
                // setSequence(res.data[0]);
                // setTempSequenceList(res.data);
                // setTrackList(res.data[0].trackList);
            })
            .catch((err) => console.log(err));
    }, []);

    const toggleNote = ({ trackID, stepID }) => {
        let newOnNotes;
        const onNotes = sequence.trackList[trackID].onNotes

        if (onNotes.indexOf(stepID) === -1) {
            newOnNotes = [...onNotes, stepID];
        } else {
            newOnNotes = onNotes.filter(col => col !== stepID);
        }
        let newTrackList = sequence.trackList.map((track, index) => {
            if (index === trackID) {
                const newVar = {...sequence.trackList[trackID], onNotes:newOnNotes};
                return newVar;
            } else {
                return track;
            }
        })
        // setSequence({...sequence, trackList: newTrackList});
        // setTrackList(newTrackList);
        // console.log(sequence);
        dispatch({
            type: 'SET_ON_NOTES',
            value: newOnNotes,
            trackID
        })
    }

    // const selectSequence = sequenceID => {
    //     const mySequence = tempSequenceList.find((seq) => seq.id === sequenceID);
    //     setSequence(mySequence);
    // }
    const selectSequence = (sequenceID) => {
        dispatch({
            type: 'SET_SEQUENCE',
            value: sequenceID,
        })
    }
    console.log("seq is: ", seq.initialState);
    return (
        <Context.Provider value={{     
            sequence: seq.initialState.sequence,
            toggleNote: toggleNote,
            selectSequence: selectSequence,
            sequenceConfigList: seq.initialState.sequenceConfigList,
            trackList: trackList,
            setSequence: setSequence,
     }}>
            {children}
        </Context.Provider>
    );
};

export { Provider, Context };

import React, { useState, createContext, useEffect } from "react";
import API from "../utils/API";

const Context = createContext({
    sequence: {},
    toggleNote: () => {},
    selectSequence: () => {},
    sequenceConfigList: [],
    trackList: [],
    word: "word",
});

const Provider = ({ children }) => {
    const [ tempSequenceList, setTempSequenceList ] = useState();
    const [ sequence, setSequence ] = useState();
    const [ trackList, setTrackList ] = useState();

    useEffect(() => {
        // Loads all patterns and sets them to patterns
        API.getPatterns()
            .then((res) => {
                console.log("The API call from useStore returned: ", res.data);
                setSequence(res.data[0]);
                setTempSequenceList(res.data);
                setTrackList(res.data[0].trackList);
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
        setSequence({...sequence, trackList: newTrackList});
        setTrackList(newTrackList);
        console.log(sequence);
    }

    const selectSequence = sequenceID => {
        const mySequence = tempSequenceList.find((seq) => seq.id === sequenceID);
        setSequence(mySequence);
    }

    return (
        <Context.Provider value={{     
            sequence: sequence,
            toggleNote: toggleNote,
            selectSequence: selectSequence,
            sequenceConfigList: tempSequenceList,
            trackList: trackList,
            setSequence: setSequence,
     }}>
            {children}
        </Context.Provider>
    );
};

export { Provider, Context };

import React, { useState, createContext, useEffect } from "react";
// import { sequenceList } from "../constants/config";
import API from "../utils/API";

const Context = createContext({
    sequence: {},
    toggleNote: () => {},
    selectSequence: () => {},
    //selectedSequence: {},
    sequenceConfigList: [],
    trackList: []
});

const Provider = ({ children }) => {
    // const [sequence, dispatch] = useReducer(appReducer, {  });
    // const [sequenceConfigList] = useReducer(appReducer);
    
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
        //TODO NEW____________________________
        // console.log(sequence);

        let newTrackList = sequence.trackList.map((track, index) => {
            if (index === trackID) {
                const newVar = {...sequence.trackList[trackID], onNotes:newOnNotes};

                // let currentTrackVariable = track.onNotes;
                // currentTrackVariable.push(newOnNotes);
                // let newTrack = {...track, onNotes: currentTrackVariable}
                return newVar;
            } else {
                return track;
            }
        })
        // const newVar = {...sequence.trackList[trackID], onNotes:newOnNotes};
        // console.log("newVar is: ", newVar);
        console.log("newOnNotes is: ", newOnNotes);
        console.log("newTrackList", newTrackList);
        setSequence({...sequence, trackList: newTrackList});
        //TODO Need to work out how to get newTrackList into sequence
        // return sequence.trackList = newTrackList;
        //TODO____________________________ TO HERE  
        // const onNotes = trackListIndex.onNotes;

        // setTrackList(trackListIndex);
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
            //selectedSequence: {},
            sequenceConfigList: tempSequenceList,
            trackList: trackList
     }}>
            {children}
        </Context.Provider>
    );
};

export { Provider, Context };

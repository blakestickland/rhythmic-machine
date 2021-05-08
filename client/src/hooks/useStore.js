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

// useEffect()

// const appReducer = (state, action) => {
//     switch (action.type) {
//         case "SET_SEQUENCE":
//             console.log("state is", state);
//             return state.sequenceConfigList.find((seq) => seq.id === action.value)
            
//                 // ...state, 
//             ;
//         case "SET_SEQUENCE_CONFIG":
//             return {
//                 ...state,
//                 sequenceConfigList: action.value,
//             };
//         case "SET_ON_NOTES":
//             let newTrackList = state.trackList.map((track, trackID) => {
//                 if (action.trackID === trackID) {
//                     return {
//                         ...track,
//                         onNotes: action.value,
//                     };
//                 } else {
//                     return track;
//                 }
//             });
//             return {
//                 ...state,
//                 trackList: newTrackList,
//             };
//         case "SET_STATE":
//             return {
//                 sequence: action.newState[0],
//                 toggleNote: () => {},
//                 selectSequence: () => {},
//                 //selectedSequence: {},
//                 sequenceConfigList: action.newState,            
//             };
//         default:
//             return state;
//     }
// };

const Provider = ({ children }) => {
    // const [sequence, dispatch] = useReducer(appReducer, {  });
    // const [sequenceConfigList] = useReducer(appReducer);
    
    const [ tempSequenceList, setTempSequenceList ] = useState();
    const [ sequence, setSequence ] = useState();
    const [ trackList, setTrackList ] = useState();

    useEffect(() => {
        //API call
        // Loads all patterns and sets them to patterns
        API.getPatterns()
            .then((res) => {
                // setPatterns(res.data)
                console.log("The API call from useStore returned: ", res.data);
                // selectSequenceConfig(res.data);
                setTempSequenceList(res.data);
                // appReducer({type:  "SET_STATE", newState: res.data})
                setSequence(res.data[0]);
            })
            .catch((err) => console.log(err));
        //call selectSequenceConfig
    }, []);

    const toggleNote = ({ trackID, stepID }) => {
        const onNotes = sequence.trackList[trackID].onNotes
        let newOnNotes;
        if (onNotes.indexOf(stepID) === -1) {
            newOnNotes = [...onNotes, stepID];
        } else {
            newOnNotes = onNotes.filter((col) => col !== stepID);
        }
        setTrackList(newOnNotes);
        // const onNotes = trackListIndex.onNotes;

        // setTrackList(trackListIndex);
    }

    const selectSequence = sequenceID => {
        const mySequence = tempSequenceList.find((seq) => seq.id === sequenceID);
        setSequence(mySequence);
    }

    // const toggleNote = ({ trackID, stepID }) => {
    //     let newOnNotes;
    //     const onNotes = sequence.trackList[trackID].onNotes;

    //     if (onNotes.indexOf(stepID) === -1) {
    //         newOnNotes = [...onNotes, stepID];
    //     } else {
    //         newOnNotes = onNotes.filter((col) => col !== stepID);
    //     }
    //     dispatch({
    //         type: "SET_ON_NOTES",
    //         value: newOnNotes,
    //         trackID,
    //     });
    // };

    // const selectSequence = (sequenceID) => {
    //     dispatch({
    //         type: "SET_SEQUENCE",
    //         value: sequenceID,
    //     });
    // };
    // const selectSequenceConfig = (sequenceConfig) => {
    //     dispatch({
    //         type: "SET_SEQUENCE_CONFIG",
    //         value: sequenceConfig,
    //     });
    // };

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

import React, { useState, memo } from "react";
import useSound from "use-sound";
import Note from "../Note";
import "./styles.css";

const Track = ({
    trackID,
    currentStepID,
    title,
    noteCount,
    onNotes,
    soundFilePath,
}) => {
    const [volume, setVolume] = useState(0.7);

    const [play] = useSound(soundFilePath, { volume });

    const notes = [...Array(noteCount)].map((el, i) => {
        const isNoteOn = onNotes.indexOf(i) !== -1;
        const isNoteOnCurrentStep = currentStepID === i;
        const stepID = i;

        return (
            <Note
                key={i}
                trackID={trackID}
                stepID={stepID}
                isNoteOn={isNoteOn}
                isNoteOnCurrentStep={isNoteOnCurrentStep}
                play={play}
            />
        );
    });

    return (
        <div className="track">
            <header className="track_title">{title}</header>
            <main className="track_notes">{notes}</main>
        </div>
    );
};

export default memo(Track);

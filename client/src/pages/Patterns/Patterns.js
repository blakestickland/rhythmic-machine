import React, { useState, useEffect, useContext } from "react";
import API from "../../utils/API";
import "./Patterns.css";

import ToolBar from "../../components/Toolbar";
import Steps from "../../components/Steps";
import TrackList from "../../components/TrackList";
import { Context } from "../../hooks/useStore";
import useStyles from "../../hooks/useStyles";
import useTimer from "../../hooks/useTimer";

function Patterns() {
    const { sequence, loadSequences } = useContext(Context);
    const [formObject, setFormObject] = useState({
      id: 20,
      title: "",
      noteCount: 16,
      trackList: []
    });

    // Handles updating component state when the user types into the input field
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value });
    }

    // When the form is submitted, use the API.savePattern method to save the sequence data
    // Then reload sequenceConfigList from the database
    function handleFormSubmit(event) {
        event.preventDefault();
        if (formObject.title) {
            API.savePattern({
                id: sequence?.sequenceConfigList?.length,
                title: formObject.title,
                noteCount: formObject.noteCount,
                trackList: sequence.selectedSequence.trackList,
            })
                .then(() =>
                    setFormObject({
                        title: "",
                    })
                )
                .then(() => loadSequences())
                .catch((err) => console.log(err));
        }
    }

    //___________  react-808 functional components start
    const baseBPMPerOneSecond = 60;
    const stepsPerBar = 16;
    const beatsPerBar = 4;
    const barsPerSequence = 1;
    const totalSteps = stepsPerBar * barsPerSequence;
    const totalBeats = beatsPerBar * barsPerSequence;

    const [BPM, setBPM] = useState(120);
    const [startTime, setStartTime] = useState(null);
    const [pastLapsedTime, setPastLapse] = useState(0);
    const [currentStepID, setCurrentStep] = useState(null);
    const [getNotesAreaWidthInPixels] = useStyles(totalSteps);

    const notesAreaWidthInPixels = getNotesAreaWidthInPixels(totalSteps);
    const timePerSequence = (baseBPMPerOneSecond / BPM) * 1000 * totalBeats;
    const timePerStep = timePerSequence / totalSteps;
    const isSequencePlaying = startTime !== null;
    const playerTime = useTimer(isSequencePlaying);
    const lapsedTime = isSequencePlaying
        ? Math.max(0, playerTime - startTime)
        : 0;
    const totalLapsedTime = pastLapsedTime + lapsedTime;

    useEffect(() => {
        if (isSequencePlaying) {
            setCurrentStep(
                Math.floor(totalLapsedTime / timePerStep) % totalSteps
            );
        } else {
            setCurrentStep(null);
        }
    }, [isSequencePlaying, timePerStep, totalLapsedTime, totalSteps]);

    const toolBarProps = {
        setStartTime,
        setPastLapse,
        setBPM,
        isSequencePlaying,
        startTime,
        BPM,
        handleInputChange,
        handleFormSubmit,
    };

    const trackListProps = {
        currentStepID,
    };
    //___________  react-808 functional components end

    return (
        <div>
            <main className="app shadow-lg">
                <header className="app_header">
                    <ToolBar {...toolBarProps} />
                </header>
                <Steps count={totalSteps} />
                <div className="app_content">
                    <TrackList {...trackListProps} />
                </div>
                <footer className="app_footer">
                    <h1 className="app_title">RHYTHMIC MACHINE</h1>
                    Code based on{" "}
                    <a href="https://github.com/joeshub/react-808">
                        REACT-808 on Github
                    </a>
                    , Built by <a href="http://seifi.org/">Joe Seifi</a>
                </footer>
            </main>
        </div>
    );
}

export default Patterns;

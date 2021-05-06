import React from "react";
// import DrumPadGrid from "../DrumPadGrid";
// import DrumPadRows from "../DrumPadRows";
import "./style.css";

function DrumMachine() {
    return (
        <div>
            <div className="app-grid">
                <button className="play-stop-button">Play / Stop</button>
                <button className="metronome">Toggle metronome</button>
                <div id="tempoBox">
                    Tempo: <span id="showTempo">120</span>BPM
                    <input
                        id="tempo"
                        type="range"
                        min="30.0"
                        max="180.0"
                        step="1"
                        defaultValue="120"
                    />
                </div>
            </div>
            {/* <DrumPadRows /> */}
        </div>
    );
}

export default DrumMachine;

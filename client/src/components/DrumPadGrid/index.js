import React from "react";
// import DrumPad from "../DrumPad";
// import SoundSelector from "../SoundSelector";
import "./style.css";

const DrumPadGrid = (props) => {
    return(
        <div className="pads">
            {/* {props.pads.map((row, rowIndex) => {
                return (
                    <div className="row" 
                    key={rowIndex}
                    >
                        <SoundSelector
                            key={rowIndex}
                            selectedDrum={props.selectedDrum[rowIndex]}
                            createdDrums={props.createdDrums}
                            onSelectDrum={(e) => props.onSelectDrum(e, rowIndex)}
                        />
                        {row.map((pad, index) => {
                            return (
                                <DrumPad
                                    key={index}
                                    rowIndex={rowIndex}
                                    id={index}
                                    state={pad}
                                    pos={props.pos}
                                    toggleActive={() =>
                                        props.toggleActive(rowIndex, index)
                                    }
                                    padNumber={index}
                                />
                            );
                        })}
                    </div>
                );
            })}; */}
        </div>
    )
};

export default DrumPadGrid;

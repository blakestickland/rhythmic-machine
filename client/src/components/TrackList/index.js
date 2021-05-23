import React, { useContext, memo } from 'react'
import { Context } from '../../hooks/useStore'
import { soundFiles, sequenceList } from '../../constants/config'
import Track from '../Track'

const TrackList = ({ currentStepID }) => {
    const { sequence } = useContext(Context)

    return (
        <div className="track-list">
            {(sequence.selectedSequence && sequence.selectedSequence.trackList) ? sequence.selectedSequence.trackList.map((track, trackID) => { // changed trackList to sequence 21:21
        const { title, onNotes, soundFile } = track
        const soundFilePath = soundFiles[soundFile]

        return (
            <Track
                key={trackID}
                trackID={+trackID}
                currentStepID={currentStepID}
                title={title}
                noteCount={sequenceList[0].noteCount}
                onNotes={onNotes}
                soundFilePath={soundFilePath}
            />
        )
    }) : ""}
        </div>
    )
}

export default memo(TrackList)
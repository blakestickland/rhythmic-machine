import React, { useContext, memo } from 'react'
import { Context } from '../../hooks/useStore'
import { soundFiles } from '../../constants/config'
import Track from '../Track'

const TrackList = ({ currentStepID }) => {
    const { sequence, trackList } = useContext(Context)
    // const content = 

    return (
        <div className="track-list">
            {trackList ? trackList.map((track, trackID) => {
        const { title, onNotes, soundFile } = track
        const soundFilePath = soundFiles[soundFile]

        return (
            <Track
                key={trackID}
                trackID={+trackID}
                currentStepID={currentStepID}
                title={title}
                noteCount={sequence.noteCount}
                onNotes={onNotes}
                soundFilePath={soundFilePath}
            />
        )
    }) : ""}
        </div>
    )
}

export default memo(TrackList)
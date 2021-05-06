const soundFiles = {
    'clap': '/sounds/909claps/clap01.wav',
    'closedHat': '/sounds/909hats/closedHats01.wav',
    'snare': '/sounds/909snares/snare01.wav',
    'kick': '/sounds/909kicks/kick01.wav',
}

const sequenceList = [
    {
        id: 0,
        title: 'Sequence 1',
        noteCount: 16,
        trackList: [
            {
                title: 'Kick',
                soundFile: 'kick',
                onNotes: [0, 4, 8, 12],
            },
            {
                title: 'Snare',
                soundFile: 'snare',
                onNotes: [4, 11, 12],
            },
            {
                title: 'Clap',
                soundFile: 'clap',
                onNotes: [2, 6, 10, 14],
            },
            {
                title: 'Closed Hat',
                soundFile: 'closedHat',
                onNotes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
            }
        ]
    },
]


export { soundFiles, sequenceList }
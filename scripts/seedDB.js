const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/rhythmicMachinePatterns"
);

const patternSeed = [
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
  {
    id: 1,
    title: 'Bad drum fill',
    noteCount: 16,
    trackList: [
        {
            title: 'Kick',
            soundFile: 'kick',
            onNotes: [12, 13, 14, 15],
        },
        {
            title: 'Snare',
            soundFile: 'snare',
            onNotes: [8, 9, 10, 11],
        },
        {
            title: 'Clap',
            soundFile: 'clap',
            onNotes: [4, 5, 6, 7],
        },
        {
            title: 'Closed Hat',
            soundFile: 'closedHat',
            onNotes: [0, 1, 2, 3],
        }
    ]
},
  {
    id: 2,
    title: 'Stuttery',
    noteCount: 16,
    trackList: [
        {
            title: 'Kick',
            soundFile: 'kick',
            onNotes: [0, 6, 8, 11, 12],
        },
        {
            title: 'Snare',
            soundFile: 'snare',
            onNotes: [4, 12, 13],
        },
        {
            title: 'Clap',
            soundFile: 'clap',
            onNotes: [14, 15],
        },
        {
            title: 'Closed Hat',
            soundFile: 'closedHat',
            onNotes: [1, 2, 3, 5, 6, 8, 9, 10, 12, 13, 14, 15],
        }
    ]
},
]

db.Pattern.remove({})
  .then(() => db.Pattern.collection.insertMany(patternSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

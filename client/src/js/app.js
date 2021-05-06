// for cross browser compatibility
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

window.onload = () => {
    // console.log(audioContext);
    // const onOff = document.getElementById("on-off");
    // const span = document.getElementsByTagName("span")[0];
    // let waveform = "sawtooth";
    // let waveformTypes = document.getElementsByTagName('li');

    // function select () {
    //     waveform = document.getElementById(this.id).id;
    //     console.log(waveform);
    // }

    // for (let i = 0; i < waveformTypes.length; i++) {
    //     waveformTypes[i].addEventListener('click', select);
    // }

    // let osc = false;

    // let freqSliderVal = document.getElementsByTagName("input")[1].value;
    // console.log("Frequency value is: " + freqSliderVal);

    // setInterval(() => {
    //     if (!osc) {
    //         console.log("Oscillator is stopped. Waiting for oscillator to start.");
    //     } else {
    //         freqSliderVal = document.getElementsByTagName("input")[1].value;
    //         osc.frequency.value = freqSliderVal;
    //         console.log("Oscillator is playing. Frequency value is: " + freqSliderVal);
    //         osc.type = waveform;
    //     }
    // }, 50);

    // onOff.addEventListener("click", () => {
    //     if (!osc) {
    //         osc = audioContext.createOscillator();
    //         osc.type = waveform;
    //         osc.frequency.value = freqSliderVal;
    //         osc.connect(audioContext.destination);
    //         osc.start(audioContext.currentTime);

    //         onOff.value = "stop";
    //         span.innerHTML = "Click to stop oscillator";
    //     } else {
    //         osc.stop(audioContext.currentTime);
    //         osc = false;
    //         onOff.value = "start";
    //         span.innerHTML = "Click to start oscillator";
    //     }
    // });

    // ___________ START: PLAYING BACK A SOUNDFILE 

    // get the audio element
    const audioElement = document.querySelector("audio");

    // select our play button
    const playButton = document.querySelector("button");

    playButton.addEventListener(
        "click",
        function () {
            // check if context is in suspended state (autoplay policy)
            if (audioContext.state === "suspended") {
                audioContext.resume();
            }

            // play or pause track depending on state
            if (this.dataset.playing === "false") {
                audioElement.play();
                this.dataset.playing = "true";
            } else if (this.dataset.playing === "true") {
                audioElement.pause();
                this.dataset.playing = "false";
            }
        },
        false
    );

    audioElement.addEventListener(
        "ended",
        () => {
            playButton.dataset.playing = "false";
        },
        false
    );

    const gainNode = audioContext.createGain();

    // pass it into the audio context
    const track = audioContext.createMediaElementSource(audioElement);
    track.connect(gainNode).connect(audioContext.destination);

    const volumeControl = document.querySelector("#volume");

    volumeControl.addEventListener(
        "input",
        function () {
            gainNode.gain.value = this.value;
        },
        false
    );
    // ___________ END:   PLAYING BACK A SOUNDFILE 


//     // ____________________ BEGIN loading the sample
//     async function getFile(audioContext, filepath) {
//         const response = await fetch(filepath);
//         const arrayBuffer = await response.arrayBuffer();
//         const audioBuffer = await audioContext.decdeAudioData(arrayBuffer);
//         return audioBuffer;
//     }
//     // ____________________ END loading the sample

//     // __________________ BEGIN set up the sample
//     async function setupSample() {
//         const filePath = "dtmf.mp3";
//         const sample = await getFile(audioCtx, filePath);
//         return sample;
//     }
//     // __________________ END set up the sample

//     setupSample().then((sample) => {
//         // sample is our buffered file
//     });
//     // _________________ BEGIN playing the sample
//     function playSample(audioContext, audioBuffer, time) {
//         const sampleSource = audioContext.createBufferSource();
//         sampleSource.buffer = audioBuffer;
//         sampleSource.connect(audioContext.destination);
//         sampleSource.start(time);
//         return sampleSource;
//     }
//     // _________________ END playing the sample

//     // ___________ BEGIN setup default BPM
//     let tempo = 60.0;
//     const bpmControl = document.querySelector("#bpm");
//     bpmControl.addEventListener(
//         "input",
//         function () {
//             tempo = Number(this.value);
//         },
//         false
//     );
//     // ___________ END setup default BPM

//     //_____ variables to define how far ahead we want to look, and how far ahead we want to schedule
//     const lookahead = 25.0; // How frequently to call scheduling function (in milliseconds)
//     const scheduleAheadTime = 0.1; // How far ahead to schedule audio (sec)
//     //_____ variables to define how far ahead we want to look, and how far ahead we want to schedule

//     let currentNote = 0;
//     let nextNoteTime = 0.0; // when the next note is due.

//     function nextNote() {
//         const secondsPerBeat = 60.0 / tempo;

//         nextNoteTime += secondsPerBeat; // Add beat length to last beat time

//         // Advance the beat number, wrap to zero
//         currentNote++;
//         if (currentNote === 4) {
//             currentNote = 0;
//         }

//         const notesInQueue = [];

//         function scheduleNote(beatNumber, time) {
//             // push the note on the queue, even if we're not playing.
//             notesInQueue.push({ note: beatNumber, time: time });

//             if (
//                 pads[0]
//                     .querySelectorAll("button")
//                     [beatNumber].getAttribute("aria-checked") === "true"
//             ) {
//                 playSweep(time);
//             }
//             if (
//                 pads[1]
//                     .querySelectorAll("button")
//                     [beatNumber].getAttribute("aria-checked") === "true"
//             ) {
//                 playPulse(time);
//             }
//             if (
//                 pads[2]
//                     .querySelectorAll("button")
//                     [beatNumber].getAttribute("aria-checked") === "true"
//             ) {
//                 playNoise(time);
//             }
//             if (
//                 pads[3]
//                     .querySelectorAll("button")
//                     [beatNumber].getAttribute("aria-checked") === "true"
//             ) {
//                 playSample(audioCtx, dtmf, time);
//             }
//         }
//     }

//     function scheduler() {
//         // while there are notes that will need to play before the next interval, schedule them and advance the pointer.
//         while (nextNoteTime < audioCtx.currentTime + scheduleAheadTime ) {
//             scheduleNote(currentNote, nextNoteTime);
//             nextNote();
//         }
//         timerID = window.setTimeout(scheduler, lookahead);
//     }

//     let lastNoteDrawn = 3;

// function draw() {
//     let drawNote = lastNoteDrawn;
//     let currentTime = audioCtx.currentTime;

//     while (notesInQueue.length && notesInQueue[0].time < currentTime) {
//         drawNote = notesInQueue[0].note;
//         notesInQueue.splice(0,1);   // remove note from queue
//     }

//     // We only need to draw if the note has moved.
//     if (lastNoteDrawn != drawNote) {
//         pads.forEach(function(el, i) {
//             el.children[lastNoteDrawn].style.borderColor = 'hsla(0, 0%, 10%, 1)';
//             el.children[drawNote].style.borderColor = 'hsla(49, 99%, 50%, 1)';
//         });

//         lastNoteDrawn = drawNote;
//     }
//     // set up to draw again
//     requestAnimationFrame(draw);
// }

// // when the sample has loaded allow play
// let loadingEl = document.querySelector('.loading');
// const playButton = document.querySelector('[data-playing]');
// let isPlaying = false;
// setupSample()
//     .then((sample) => {
//         loadingEl.style.display = 'none'; // remove loading screen

//         dtmf = sample; // to be used in our playSample function

//         playButton.addEventListener('click', function() {
//             isPlaying = !isPlaying;

//             if (isPlaying) { // start playing

//                 // check if context is in suspended state (autoplay policy)
//                 if (audioCtx.state === 'suspended') {
//                     audioCtx.resume();
//                 }

//                 currentNote = 0;
//                 nextNoteTime = audioCtx.currentTime;
//                 scheduler(); // kick off scheduling
//                 requestAnimationFrame(draw); // start the drawing loop.
//                 this.dataset.playing = 'true';

//             } else {

//                 window.clearTimeout(timerID);
//                 this.dataset.playing = 'false';

//             }
//         })
//     });

}; // ____ END window.onload function

// // __________________________ START DRUM MACHINE TO END OF FILE
// document.addEventListener('DOMContentLoaded', function() {
// var futureTickTime = audioContext.currentTime,
//     counter = 1,
//     tempo = 120,
//     secondsPerBeat = 60 / tempo,
//     counterTimeValue = (secondsPerBeat / 4),
//     osc = audioContext.createOscillator(),
//     metronomeVolume = audioContext.createGain(),
//     timerID = undefined,
//     isPlaying = false;

//     //____________________ BEGIN AudioFileLoader from audiolib.js
//     function audioFileLoader (fileDirectory) {
//         var soundObj = {};
//         var playSound = undefined;
//         var getSound = new XMLHttpRequest();
//         soundObj.fileDirectory = fileDirectory;
//         getSound.open("GET", soundObj.fileDirectory, true);
//         getSound.responseType = "arraybuffer";
//         getSound.onload = function() {
//             audioContext.decodeAudioData(getSound.response, function(buffer) {
//                 soundObj.soundToPlay = buffer;
//             });
//         };

//         getSound.send();

//         soundObj.play = function(time, setStart, setDuration) {
//             playSound = audioContext.createBufferSource();
//             playSound.buffer = soundObj.soundToPlay;
//             playSound.connect(audioContext.destination);
//             playSound.start(
//                 audioContext.currentTime + time || audioContext.currentTime,
//                 setStart || 0,
//                 setDuration || soundObj.soundToPlay.duration
//             );
//         };

//         soundObj.stop = function(time) {
//             playSound.stop(audioContext.currentTime + time || audioContext.currentTime);
//         };
//         return soundObj;
//     }

//     //____________________ END  AudioFileLoader from audiolib.js

//     // ________________________ BEGIN load sound samples

//     var kick = audioFileLoader("../sounds/909kicks/kick01.mp3");
//     var snare = audioFileLoader("../sounds/909snares/snare01.mp3")
//     var closedHats = audioFileLoader("../sounds/909hats/closedHats01.mp3")
//     var clap = audioFileLoader("../sounds/909claps/clap01.mp3")

//     // ________________________ END load sound samples

//     // _________________________ LOAD array tracks

//     var kickTrack = [],
//     snareTrack = [],
//     closedHatsTrack = [],
//     clapTrack = []

//     // _________________________ END array tracks

//     // _________________ API call
//     document.addEventListener('DOMContentLoaded', function() {
//         var httpRequest = new  XMLHttpRequest()
//         httpRequest.onreadystatechange = function (data) {
//             var patchParams = data;
//             console.log(patchParams); // data object
//         }
//         httpRequest.open('GET', "js/data.json")
//         httpRequest.send()

//         // $.getJSON("js/data.json", function(data) {
//         //     var patchParams = data;
//         //     console.log(patchParams); // data object
//         // });
//     });
//     // ____________________ end API call

//     function scheduleSound(trackArray, sound, count, time) {
//         for (var i = 0; i < trackArray.length; i += 1) {
//             if (count === trackArray[i]) {
//                 sound.play(time);
//             }
//         }
//     }

//     // ________________________ BEGIN metronome

//     function playMetronome(time, playing) {
//         if (playing) {
//             osc = audioContext.createOscillator();
//             osc.connect(metronomeVolume);
//             metronomeVolume.connect(audioContext.destination);
//             osc.frequency.value = 500;
//             if (counter === 1) {
//                 osc.frequency.value = 500;
//             } else {
//                 osc.frequency.value = 300;
//             }
//             osc.start(time);
//             osc.stop(time + 0.1);
//         }
//     }

//     // _________________________ END metronome

//     function playTick() {
//         secondsPerBeat = 60 / tempo;
//         counterTimeValue = (secondsPerBeat / 4);
//         console.log("This is 16th note: " + counter);
//         counter += 1;
//         futureTickTime += counterTimeValue;
//         if ( counter > 16 ) {
//             counter = 1;
//         }
//     }

//     function scheduler() {
//         if (futureTickTime < audioContext.currentTime + 0.1) {
//             playMetronome(futureTickTime, true);

//             scheduleSound(kickTrack, kick, counter, futureTickTime - audioContext.currentTime);
//             scheduleSound(snareTrack, snare, counter, futureTickTime - audioContext.currentTime);
//             scheduleSound(clapTrack, clap, counter, futureTickTime - audioContext.currentTime);
//             scheduleSound(closedHatsTrack, closedHats, counter, futureTickTime - audioContext.currentTime);
//             playTick();
//         }
//         timerID = window.setTimeout(scheduler, 0);
//     }
//     function play() {
//         isPlaying = !isPlaying;

//         if (isPlaying) {
//             counter = 1;
//             futureTickTime = audioContext.currentTime;
//             scheduler();
//         } else {
//             window.clearTimeout(timerID);
//         }
//     }

//     // ________________________ BEGIN create grid
//     for (var i = 1; i <= 4; i += 1) {
//         $(".app-grid").append("<div class='track-" + i + "-container'/></div>");

//         for (var j = 1; j < 17; j += 1) {
//             $(".track-" + i + "-container").append("<div class='grid-item track-step step-" + j + "'</div>");
//         }
//     }
//     // _________________________ END create grid

//     // __________________________ BEGIN Grid interactivity
//     function sequenceGridToggler (domEle, arr) {
//         $(domEle).on("mousedown", ".grid-item", function() {

//             var gridIndexValue = $(this).index(); // ________ Get index of grid item
//             var offset = gridIndexValue + 1; // ___________ Add +1 so value starts at 1 instead of zero.
//             var index = arr.indexOf(offset); // __________ Check if value exists in array.

//             if (index > -1) { // _________________ if index of item exists...
//                 arr.splice(index, 1);  // __________ then remove it.....
//                 $(this).css("backgroundColor", ""); // _______ and change color of DOM element to default.
//             } else {  // _______ If item does not exist.....
//                 arr.push(offset);  // _____________ then push it to track array.
//                 $(this).css("background-color", "purple");  // __________ and change color of DOM element to purple.
//             }
//         });
//     }

//     sequenceGridToggler(".track-1-container", kickTrack);
//     sequenceGridToggler(".track-2-container", snareTrack);
//     sequenceGridToggler(".track-3-container", closedHatsTrack);
//     sequenceGridToggler(".track-4-container", clapTrack);
//     // _____________________   END Grid interactivity

//     $(".play-stop-button").on("click", function() {
//         play();
//     });

//     // _________________________ BEGIN metronome toggle
//     $(".metronome").on("click", function() {
//         if (metronomeVolume.gain.value) {
//             metronomeVolume.gain.value = 0;
//         } else {
//             metronomeVolume.gain.value = 1;
//         }
//     });

//     $("#tempo").on("click", function () {
//         tempo = this.value;
//         $("#showTempo").html(tempo);
//     });
//     // ___________________________ END metronome toggle

// });

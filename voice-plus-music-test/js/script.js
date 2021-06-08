// import * as Tone from '/node_modules/tone/build/Tone.js';

const speechButton = document.getElementById('talk');
let ul = document.querySelector('ul');
let newListItem = document.createElement('li');
let text;

var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();
recognition.interimResults = true;

let sequence1, simpSynth;
let bgMelody = ["C3", ["E3", "G3"], "D3", ["C3", "A3"], "B2", "C2", ["E3", "A2"], "G2", "C4"];
let injuMelody = ["E3", ["D3", "E3", "F3", "E3"], "B4", ["B2", "A2"], "A3", "B3", "C3", "B2"];
let injuMelodyTwo = ["B3", ["G3", "A3"], "E3", null, "E3", "G3", "A3", "A3", "B3"];

let bpm = 150;
let kickBeat = null
let snareBeat = null
let hihatBeat = null

const play = document.getElementById('play')
const pause = document.getElementById('pause')
play.style.display = "none"

const kickPatterns = [
    [0, 1, 0, 0, 0, 1, 0, 0],
    [0, 1, 0, 0, 1, 1, 0, 0],
    [1, 1, 0, 0, 1, 1, 0, 0],
    [0, 1, 0, 0, 0, 1, 1, 0]
]

const snarePatterns = [
    [0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 1, 1, 0, 0, 1],
    [0, 0, 0, 1, 1, 0, 0, 1]
]

const randomKick = kickPatterns[Math.floor(Math.random() * kickPatterns.length)];
// console.log(randomKick);

const randomSnare = snarePatterns[Math.floor(Math.random() * snarePatterns.length)];
// console.log(randomSnare);

let underEight = Math.floor(Math.random() * 8) + 1;
let underThirteen = Math.floor(Math.random() * 13) + 1;
let underFive = Math.floor(Math.random() * 5) + 1;

recognition.addEventListener('result', (e) => {
    text = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')

    newListItem.innerText = text;
    ul.appendChild(newListItem)

    if (e.results[0].isFinal) {
        newListItem = document.createElement('li')
    }
})

recognition.addEventListener('end', (e) => {
    let lowerText = text.toLowerCase()

    if (lowerText.search('random') >= 0 || lowerText.search('doe maar wat') >= 0 || lowerText.search('geef me een beat') >= 0) {
        let newListItem = document.createElement('li'); // create li
        let text = document.createTextNode(`Wat vind je van een ${lowerText}? Laten we verder gaan met een snare! Wat voor snare wil je?`); // create text node

        createInstruments();

        newListItem.appendChild(text); // append text node to li node
        ul.appendChild(newListItem); // append li node to list

    } else if (lowerText.search('langzaam') >= 0 || lowerText.search('langzamer') >= 0 || lowerText.search('rustiger') >= 0) {
        let newListItem = document.createElement('li'); // create li
        let text = document.createTextNode(`Oke je wilt het dus ${lowerText}. Komt voor elkaar!`); // create text node

        bpm = bpm - 30;
        console.log(bpm)
        createInstruments();

        newListItem.appendChild(text); // append text node to li node
        ul.appendChild(newListItem); // append li node to list
    } else if (lowerText.search('snel') >= 0 || lowerText.search('sneller') >= 0 || lowerText.search('faster') >= 0) {
        let newListItem = document.createElement('li'); // create li
        let text = document.createTextNode(`Oke je wilt het dus ${lowerText}. Komt voor elkaar!`); // create text node

        bpm = bpm + 30;
        console.log(bpm)
        createInstruments();

        newListItem.appendChild(text); // append text node to li node
        ul.appendChild(newListItem); // append li node to list
    } else {
        unrecognized()
    }
})



pause.addEventListener('click', pauseButton)
play.addEventListener('click', playButton)
speechButton.addEventListener('click', talk)
synthBtn.addEventListener('click', async () => {
    //     const synth = new Tone.PolySynth(Tone.Synth).toDestination();
    //     const now = Tone.now()
    //     synth.triggerAttack("D4", now);
    //     // synth.triggerRelease("D4", now + 0.5);
    //     synth.triggerAttack("F4", now + 0.5);
    //     // synth.triggerRelease("F4", now + 1);
    //     synth.triggerAttack("A4", now + 1);
    //     // synth.triggerRelease("A4", now + 1.5);
    //     synth.triggerAttack("C5", now + 1.5);
    //     // synth.triggerRelease("C5", now + 2);
    //     synth.triggerAttack("E5", now + 2);
    //     // synth.triggerRelease("E5", now + 2.5);
    //     Tone.Transport.start()
    //     Tone.Transport.bpm.value = 100;
    // Tone.start();
    // sequence1.start();
    setup();
});

function unrecognized() {
    let newListItem = document.createElement('li')
    let text = document.createTextNode("I have no idea what you're talking about")
    newListItem.appendChild(text)
    ul.appendChild(newListItem)
}

function createInstruments() {
    blip.sampleLoader()
        .samples({
            'kick': `./sounds/kick${underEight}.wav`,
            'snare': `./sounds/snare${underThirteen}.wav`,
            'hihat': `./sounds/hihat${underFive}.wav`,
        })
        .done(loaded)
        .load();

    function loaded() {

        console.log("Samples are now loaded");

        var kick = blip.clip().sample('kick');
        var snare = blip.clip().sample('snare');
        var hihat = blip.clip().sample('hihat');

        kickBeat = blip.loop()
            .tempo(bpm)
            .data(randomKick)
            .tick(function (t, d) {
                if (d) {
                    kick.play(t)
                }
            });

        snareBeat = blip.loop()
            .tempo(bpm)
            .data(randomSnare)
            .tick(function (t, d) {
                if (d) {
                    snare.play(t)
                }
            });

        hihatBeat = blip.loop()
            .tempo(bpm)
            .tick(function (t) {
                hihat.play(t)
            });

        kickBeat.start();
        snareBeat.start();
        hihatBeat.start();

    }
}

function stopAudio() {
    if (kickBeat !== null) {
        kickBeat.stop()
    }
    if (snareBeat !== null) {
        snareBeat.stop()
    }
    if (hihatBeat !== null) {
        hihatBeat.stop()
    }
}

function talk() {
    console.log("Speech enabled")
    recognition.start()
    stopAudio()
}

function pauseButton() {
    stopAudio()
    pause.style.display = "none"
    play.style.display = "inline"
}

function playButton() {
    if (!kickBeat !== null) {
        kickBeat.start()
    }
    if (!snareBeat !== null) {
        snareBeat.start()
    }
    if (!hihatBeat !== null) {
        hihatBeat.start()
    }
    console.log('Hello world')
    play.style.display = "none"
    pause.style.display = "inline"
}

function setup() {
    //Make the synth like normal
    simpSynth = new Tone.Synth({
        oscillator: {
            volume: 0.1,
            type: "fatsawtooth"
        },
        envelope: {
            attack: 0.05,
            decay: 0.5,
            sustain: 0.5,
            release: 1
        }
    }).toDestination(); //sends the synth's output to the speakers

    //Here we generate the sequencer.
    sequence1 = new Tone.Sequence(function (time, note) { //the object has a built in function where we call triggerAttackRelease(), which is what makes our synthesizer generate sound
        simpSynth.triggerAttackRelease(note, 0.5);
        //adding the console log lets the programmer see the current note being generated
        console.log(note);
    }, injuMelodyTwo, '4n');
    Tone.Transport.bpm.value = 150; //how many beats(quarter notes) per minute
    Tone.Transport.start(); //starts the transport
    sequence1.start();
}
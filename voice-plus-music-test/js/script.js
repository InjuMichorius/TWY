// const audioCtx = new AudioContext();

const speechButton = document.getElementById('talk');
let ul = document.querySelector('ul');
let newListItem = document.createElement('li');
let text;

var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();
recognition.interimResults = true;

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
console.log(randomKick);

const randomSnare = snarePatterns[Math.floor(Math.random() * snarePatterns.length)];
console.log(randomSnare);

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

recognition.addEventListener('end', (e) => {
    let lowerText = text.toLowerCase()

    if (lowerText.search('random') >= 0 || lowerText.search('doe maar wat') >= 0) {
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

function unrecognized() {
    let newListItem = document.createElement('li')
    let text = document.createTextNode("I have no idea what you're talking about")
    newListItem.appendChild(text)
    ul.appendChild(newListItem)
}

pause.addEventListener('click', pauseButton)
play.addEventListener('click', playButton)
speechButton.addEventListener('click', talk)

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
// const audioCtx = new AudioContext();

const speechButton = document.getElementById('talk');
let ul = document.querySelector('ul');
let newListItem = document.createElement('li');
let text;

var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();
recognition.interimResults = true;

const playBtn = document.getElementById('play');
const pauseBtn = document.getElementById('pause');

let bpm = 150;

const kickPattern1 = [0, 1, 0, 0, 0, 1, 0, 0];
const kickPattern2 = [0, 1, 0, 0, 1, 1, 0, 0];
const kickPattern3 = [1, 1, 0, 0, 1, 1, 0, 0];
const kickPattern4 = [0, 1, 0, 0, 0, 1, 1, 0];

const snarePattern1 = [0, 0, 0, 1, 0, 0, 0, 1];
const snarePattern2 = [1, 0, 0, 1, 1, 0, 0, 1];

speechButton.addEventListener('click', function () {
    console.log("Speech enabled")
    recognition.start()
})

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

    if (lowerText.search('random') >= 0 || lowerText.search('doe maar wat') >= 0) {
        let newListItem = document.createElement('li'); // create li
        let text = document.createTextNode(`Wat vind je van een ${lowerText}? Laten we verder gaan met een snare! Wat voor snare wil je?`); // create text node
        let underEight = Math.floor(Math.random() * 8) + 1;
        let underThirteen = Math.floor(Math.random() * 13) + 1;
        let underFour = Math.floor(Math.random() * 4) + 1;

        blip.sampleLoader()
            .samples({
                'kick': `./sounds/kick${underEight}.wav`,
                'snare': `./sounds/snare${underThirteen}.wav`,
                'hihat': `./sounds/hihat${underFour}.wav`,
            })
            .done(loaded)
            .load();

        function loaded() {

            console.log("Samples are now loaded");

            var kick = blip.clip()
                .sample('kick');

            var snare = blip.clip()
                .sample('snare');

            var hihat = blip.clip()
                .sample('hihat');

            var kickBeat = blip.loop()
                .tempo(bpm)
                .data(kickPattern1)
                .tick(function (t, d) {
                    if (d) {
                        kick.play(t)
                    }
                });

            var snareBeat = blip.loop()
                .tempo(bpm)
                .data(snarePattern1)
                .tick(function (t, d) {
                    if (d) {
                        snare.play(t)
                    }
                });

            var hihatBeat = blip.loop()
                .tempo(bpm)
                .tick(function (t) {
                    hihat.play(t)
                });

            kickBeat.start();
            snareBeat.start();
            hihatBeat.start();

            pauseBtn.addEventListener('click', function () {
                kickBeat.stop();
                snareBeat.stop();
                hihatBeat.stop();
            });

        }

        newListItem.appendChild(text); // append text node to li node
        ul.appendChild(newListItem); // append li node to list

    } else if (lowerText.search('snare') >= 0) {
        let newListItem = document.createElement('li'); // create li
        let text = document.createTextNode(`I think this ${lowerText} will fit nicely! What about a hihat?`); // create text node

        //add Mp3 here
        // currentSnare = new Audio('./audio/snares/snare.mp3')
        // currentKick.play()
        // currentSnare.play()

        newListItem.appendChild(text); // append text node to li node
        ul.appendChild(newListItem); // append li node to list
    } else if (lowerText.search('hihat') >= 0) {
        let newListItem = document.createElement('li'); // create li
        let text = document.createTextNode(`Just a classic ${lowerText} :). Maybe you can add some rides!`); // create text node

        //add Mp3 here
        // currentRide = new Audio('./audio/rides/ride.mp3')
        // currentKick.play()
        // currentSnare.play()
        // currentRide.play()

        newListItem.appendChild(text); // append text node to li node
        ul.appendChild(newListItem); // append li node to list
    } else if (lowerText.search('crash') >= 0) {
        let newListItem = document.createElement('li'); // create li
        let text = document.createTextNode(`Ah, so you like ${lowerText}? What about this Crash?`); // create text node

        //add Mp3 here
        // currentCrash = new Audio('./audio/crashes/crash.mp3')
        // currentKick.play()
        // currentSnare.play()
        // currentRide.play()
        // currentCrash.play()

        newListItem.appendChild(text); // append text node to li node
        ul.appendChild(newListItem); // append li node to list
    } else if (lowerText.search('normaal') >= 0) {
        currentBeat.playbackRate = 1
        currentBeat.play()
    } else if (lowerText.search('sneller') >= 0) {
        currentBeat.playbackRate = 1.2
        currentBeat.play()
    } else if (lowerText.search('langzamer') >= 0) {
        currentBeat.playbackRate = 0.8
        currentBeat.play()
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
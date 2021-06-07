//Global variables
const speechButton = document.getElementById('talk')
let ul = document.querySelector('ul')
let newListItem = document.createElement('li')

let text
let currentBeat
let currentVocal
let bpm = 120;

const kickPattern1 = [0, 1, 0, 0, 0, 1, 0, 0];
const kickPattern2 = [0, 1, 0, 0, 1, 1, 0, 0];
const kickPattern3 = [1, 1, 0, 0, 1, 1, 0, 0];
const kickPattern4 = [0, 1, 0, 0, 0, 1, 1, 0];

const snarePattern1 = [0, 0, 0, 1, 0, 0, 0, 1];
const snarePattern2 = [1, 0, 0, 1, 1, 0, 0, 1];

//Code for voice recognition
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new window.SpeechRecognition()
recognition.interimResults = true

//Loadng Audio files
blip.sampleLoader()
    .samples({
        'kick1': './audio/kicks/kick1.wav',
        // 'kick1': './audio/kicks/kick1.wav',
        // 'kick2': './audio/kicks/kick2.wav',
        // 'kick3': './audio/kicks/kick3.wav',
        // 'kick4': './audio/kicks/kick4.wav',
        // 'kick5': './audio/kicks/kick5.wav',
        // 'kick6': './audio/kicks/kick6.wav',
        // 'kick7': './audio/kicks/kick7.wav',
        // 'kick8': './audio/kicks/kick8.wav',
        // 'snare': './audio/snares/snare.mp3',
        // 'snare1': './audio/snares/snare1.wav',
        // 'snare2': './audio/snares/snare2.wav',
        // 'snare3': './audio/snares/snare3.wav',
        // 'snare4': './audio/snares/snare4.wav',
        // 'snare5': './audio/snares/snare5.wav',
        // 'snare6': './audio/snares/snare6.wav',
        // 'snare7': './audio/snares/snare7.wav',
        // 'snare8': './audio/snares/snare8.wav',
        // 'snare9': './audio/snares/snare9.wav',
        // 'snare10': './audio/snares/snare10.wav',
        // 'snare11': './audio/snares/snare11.wav',
        // 'snare12': './audio/snares/snare12.wav',
        // 'snare13': './audio/snares/snare13.wav',
        // 'hihat': './audio/hihats/hihat.wav',
        // 'hihat1': './audio/hihats/hihat1.wav',
        // 'hihat2': './audio/hihats/hihat2.wav',
        // 'hihat3': './audio/hihats/hihat3.wav',
        // 'hihat4': './audio/hihats/hihat4.wav',
        // 'tom1': './audio/toms/tom1.wav',
        // 'tom2': './audio/toms/tom2.wav',
        // 'tom3': './audio/toms/tom3.wav',
        // 'tom4': './audio/toms/tom4.wav',
        // 'vocals1': './audio/vocals/vocals1.wav',
        // 'vocals2': './audio/vocals/vocals2.wav',
        // 'vocals3': './audio/vocals/vocals3.wav',
        // 'vocals4': './audio/vocals/vocals4.wav',
        // 'crash': './audio/crshes/crash.wav',
        // 'crash1': './audio/crashes/crash1.wav',
        // 'crash2': './audio/crashes/crash2.wav',
        // 'crash3': './audio/crashes/crash3.wav',
        // 'ride': './audio/rides/ride.wav'
    })
    .done(callback)
    .load();

function callback() {

    console.log("IK VOER MEZELF UIT")
    kick = blip.clip()
        .sample('kick1');

    snare = blip.clip()
        .sample('snare1');

    hihat = blip.clip()
        .sample('hihat1');

    let kickBeat = blip.loop()
        .tempo(bpm)
        .data(kickPattern1)
        .tick(function(t, d) {
            if (d) {
                kick.play(t)
            }
        });

    let snareBeat = blip.loop()
        .tempo(bpm)
        .data(snarePattern2)
        .tick(function(t, d) {
            if (d) {
                snare.play(t)
            }
        });

    let hihatBeat = blip.loop()
        .tempo(bpm)
        .tick(function(t) {
            hihat.play(t)
        });

    kickBeat.start();
    snareBeat.start();
    hihatBeat.start();
}

// var playBtn = document.querySelector('#play');
// playBtn.addEventListener('click', function() {
//     console.log("TEST");

// });

//Catch user's voice, turn it into a string and display on chat
recognition.addEventListener('result', (e) => {
    text = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')

    newListItem.innerText = text
    ul.appendChild(newListItem)

    if (e.results[0].isFinal) {
        newListItem = document.createElement('li')
    }
})

//This function will look if the user used a voice command, after he/she finished talking
recognition.addEventListener('end', (e) => {
    let lowerText = text.toLowerCase()

    if (lowerText.search('kick') >= 0 || lowerText.search('kik') >= 0) {
        let newListItem = document.createElement('li'); // create li
        let text = document.createTextNode(`What about this ${lowerText}? Let's continue with a snare! What kind would you like?`); // create text node


        //add Mp3 here
        // currentKick = new Audio('./audio/kicks/kick.mp3')
        // currentKick.play()

        newListItem.appendChild(text); // append text node to li node
        ul.appendChild(newListItem); // append li node to list
    } else if (lowerText.search('trommel') >= 0) {
        let newListItem = document.createElement('li'); // create li
        let text = document.createTextNode(`I think this ${lowerText} will fit nicely! What about a hihat?`); // create text node

        //add Mp3 here
        currentSnare = new Audio('./audio/snares/snare.mp3')
        currentKick.play()
        currentSnare.play()

        newListItem.appendChild(text); // append text node to li node
        ul.appendChild(newListItem); // append li node to list
    } else if (lowerText.search('hihat') >= 0) {
        let newListItem = document.createElement('li'); // create li
        let text = document.createTextNode(`Just a classic ${lowerText} :). Maybe you can add some rides!`); // create text node

        //add Mp3 here
        currentRide = new Audio('./audio/rides/ride.mp3')
        currentKick.play()
        currentSnare.play()
        currentRide.play()

        newListItem.appendChild(text); // append text node to li node
        ul.appendChild(newListItem); // append li node to list
    } else if (lowerText.search('crash') >= 0) {
        let newListItem = document.createElement('li'); // create li
        let text = document.createTextNode(`Ah, so you like ${lowerText}? What about this Crash?`); // create text node

        //add Mp3 here
        currentCrash = new Audio('./audio/crashes/crash.mp3')
        currentKick.play()
        currentSnare.play()
        currentRide.play()
        currentCrash.play()

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

//Start voice recognition when user clicks button
speechButton.addEventListener('click', function() {
    recognition.start()
})

//Response when bot doesn't understand user-input
function unrecognized() {
    let newListItem = document.createElement('li')
    let text = document.createTextNode("I have no idea what you're talking about")
    newListItem.appendChild(text)
    ul.appendChild(newListItem)
}
import { setupBeat, stopBeat, startBeat } from './modules/beat.js'
import { setupMelody, stopMelody, startMelody } from './modules/melody.js'

const speechButton = document.getElementById('talk')
const chatBox = document.querySelector('.chat_messages')
const playButton = document.getElementById('play')
const pauseButton = document.getElementById('pause')
let newMessage
let userResponse
let text

var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
var recognition = new SpeechRecognition()
recognition.interimResults = true

let bpm = 150

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

let randomKick = kickPatterns[Math.floor(Math.random() * kickPatterns.length)]
let randomSnare = snarePatterns[Math.floor(Math.random() * snarePatterns.length)]

let underEight = Math.floor(Math.random() * 8) + 1;
let underThirteen = Math.floor(Math.random() * 13) + 1;
let underFive = Math.floor(Math.random() * 5) + 1;

speechButton.addEventListener('click', () => {

    talk()
    console.log('click')

    newMessage = document.createElement('li')

    newMessage.classList.add('message')
    newMessage.classList.add('you')

    userResponse = document.createElement('p')

    let userMeta = document.createElement('p')
    userMeta.classList.add('text_meta')
    userMeta.innerText = 'You'

    newMessage.appendChild(userMeta)
    chatBox.appendChild(newMessage)

    chatBox.scrollTop = chatBox.scrollHeight
})

recognition.addEventListener('result', (e) => {
    text = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')

    userResponse.innerText = text
    newMessage.appendChild(userResponse)

    if (e.results[0].isFinal) {
        userResponse = document.createElement('p')
    }

    chatBox.scrollTop = chatBox.scrollHeight
})

recognition.addEventListener('end', (e) => {
    let lowerText = text.toLowerCase()

    if (lowerText.search('random') >= 0 || lowerText.search('doe maar wat') >= 0 || lowerText.search('geef me een beat') >= 0) {
        const reply = 'Wat vind je van deze sicke beat? Moet het tempo aangepast nog aangepast denk je? Anders gaan we verder met een melodie'
        twyResponseMessage(reply)

        setupBeat(underEight, underThirteen, underFive, randomKick, randomSnare, bpm)

    } else if (lowerText.search('langzaam') >= 0 || lowerText.search('langzamer') >= 0 || lowerText.search('rustiger') >= 0) {
        const reply = `Oke je wilt het dus ${lowerText}. Komt voor elkaar!`
        twyResponseMessage(reply)

        bpm = bpm - 30
        setupBeat(underEight, underThirteen, underFive, randomKick, randomSnare, bpm)

    } else if (lowerText.search('snel') >= 0 || lowerText.search('sneller') >= 0 || lowerText.search('faster') >= 0) {
        const reply = `Oke je wilt het dus ${lowerText}. Komt voor elkaar!`
        twyResponseMessage(reply)

        bpm = bpm + 30
        setupBeat(underEight, underThirteen, underFive, randomKick, randomSnare, bpm)

    } else if (lowerText.search('melodie') >= 0 || lowerText.search('melody') >= 0) {
        const reply = 'Nice, laten we het wat opfleuren met meer geluid!'
        twyResponseMessage(reply)

        setupBeat(underEight, underThirteen, underFive, randomKick, randomSnare, bpm)
        setupMelody(bpm)

    } else {
        const reply = 'Ik snap er geen kut van'
        twyResponseMessage(reply)
    }
})

playButton.addEventListener('click', play)
pauseButton.addEventListener('click', pause)

function twyResponseMessage(response) {
    let twyMessage = document.createElement('li')
    let twyMeta = document.createElement('p')
    let twyResponse = document.createElement('p')
    twyMessage.classList.add('message')
    twyMessage.classList.add('twy')
    twyMeta.classList.add('text_meta')
    twyResponse.classList.add('text')
    twyMeta.innerText = 'TWY'
    twyResponse.innerText = response
    twyMessage.appendChild(twyMeta)
    twyMessage.appendChild(twyResponse)
    chatBox.appendChild(twyMessage)

    chatBox.scrollTop = chatBox.scrollHeight
}

function talk() {
    console.log("Speech enabled")
    stopBeat()
    stopMelody()
    recognition.start()
}

function pause() {
    console.log('click')
    stopBeat()
    stopMelody()
    playButton.classList.remove('inactive')
    pauseButton.classList.add('inactive')
}

function play() {
    console.log('click')
    startBeat()
    startMelody()
    pauseButton.classList.remove('inactive')
    playButton.classList.add('inactive')

}
import { setupBeat, stopBeat, startBeat } from './modules/beat.js'
import { setupMelody, stopMelody, startMelody } from './modules/melody.js'
import { setupEffect, lowerVolume } from './modules/effects.js'

const speechButton = document.getElementById('talk')
const chatBox = document.querySelector('.chat_messages')
const playButton = document.getElementById('play')
const pauseButton = document.getElementById('pause')
const loading = document.querySelector('.loading')
let newMessage
let userResponse
let text

let melodyPlayed = false;

var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
var recognition = new SpeechRecognition()
recognition.interimResults = true

const beat = ["beat", "doe maar wat", "random", "ritme", "slagwerk", "trommel", "kick", "kik", "snare", "hihat", "basedrum", "tom", "crash", "ride"]
const melody = ["melodie", "melody", "lied", "deun", "loop", "tune", "wijs", "muziekstuk", "riedel", "klank", "compositie"]
const slower = ["langzaam", "sloom", "slomer", "slow", "traag", "trager", "treuzelend", "zacht", "kalm", "rustig", "lui", "geleidelijk", "saai"]
const faster = ["fast", "speed", "snel", "hard", "rap", "vlug", "vlot", "gauw", "subiet"]
const effect = ["effect", "effekt", "transitie", "trans", "gevolg", "lijp"]

const checkIfExists = beat.concat(melody, slower, faster, effect)

const lighting = document.querySelector('.twy-image')
const blade = document.querySelector('.blade')

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

let underEight = Math.floor(Math.random() * 8) + 1
let underThirteen = Math.floor(Math.random() * 13) + 1
let underFive = Math.floor(Math.random() * 5) + 1

const melodies = [
    ["C3", ["E3", "G3"], "D3", ["C3", "A3"], "B2", "C2", ["E3", "A2"], "G2", "C4"],
    ["E3", ["D3", "E3", "F3", "E3"], "B4", ["B2", "A2"], "A3", "B3", "C3", "B2"],
    ["B3", ["G3", "A3"], "E3", null, "E3", "G3", "A3", "A3", "B3"],
    ["C#4", "D#4", "G#3", "D#4", "F4", ["G#4", "F#4", "F4"], "C#4", "D#4", "G#3", null, null]
]

let randomMelody = melodies[Math.floor(Math.random() * melodies.length)]

window.addEventListener('load', () => {
    const reply = "Hey jij daar! Mijn naam is TWY :) Ik hou van muziek maken en ik ben ontzettend benieuwd naar de muziek die jullie op aarde luisteren. Laten we beginnen met een beat, wat voor beat wil je?"
    twyResponseMessage(reply)
})

speechButton.addEventListener('click', () => {

    talk()
    console.log(checkIfExists)
    console.log('click')

    pauseButton.disabled = false;
    pauseButton.classList.remove('inactive')
    playButton.classList.add('inactive')

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

    compareData(lowerText)

    // if (lowerText.search('random') >= 0 || lowerText.search('doe maar wat') >= 0 || lowerText.search('geef me een beat') >= 0) {
    //     const reply = 'Wat vind je van deze sicke beat? Moet het tempo aangepast nog aangepast denk je? Anders gaan we verder met een melodie'
    //     twyResponseMessage(reply)

    //     setTimeout(() => {
    //         setupBeat(underEight, underThirteen, underFive, randomKick, randomSnare, bpm)
    //     }, 1500)

    // } else if (lowerText.search('langzaam') >= 0 || lowerText.search('langzamer') >= 0 || lowerText.search('rustiger') >= 0) {
    //     const reply = `Oke je wilt het dus ${lowerText}. Komt voor elkaar!`
    //     twyResponseMessage(reply)

    //     setTimeout(() => {
    //         bpm = bpm - 30
    //         setupBeat(underEight, underThirteen, underFive, randomKick, randomSnare, bpm)

    //         if (melodyPlayed == true) {
    //             setupMelody(randomMelody, bpm)
    //         }
    //     }, 1500)

    // } else if (lowerText.search('snel') >= 0 || lowerText.search('sneller') >= 0 || lowerText.search('faster') >= 0) {
    //     const reply = `Oke je wilt het dus ${lowerText}. Komt voor elkaar!`
    //     twyResponseMessage(reply)

    //     setTimeout(() => {
    //         bpm = bpm + 30
    //         setupBeat(underEight, underThirteen, underFive, randomKick, randomSnare, bpm)

    //         if (melodyPlayed == true) {
    //             setupMelody(randomMelody, bpm)
    //         }
    //     }, 1500)

    // } else if (lowerText.search('melodie') >= 0 || lowerText.search('melody') >= 0) {
    //     const reply = 'Nice, laten we het wat opfleuren met meer geluid! Wat dacht je hiervan?'
    //     twyResponseMessage(reply)

    //     setTimeout(() => {
    //         setupBeat(underEight, underThirteen, underFive, randomKick, randomSnare, bpm)
    //         setupMelody(randomMelody, bpm)
    //         melodyPlayed = true
    //     }, 1500)

    // } else if (lowerText.search('effect') >= 0) {
    //     const reply = 'Nu word het pas echt vet! De muziek kan raar gaan klinken'
    //     twyResponseMessage(reply)

    //     setTimeout(() => {
    //         setupBeat(underEight, underThirteen, underFive, randomKick, randomSnare, bpm)
    //         if (melodyPlayed == true) {
    //             setupMelody(randomMelody, bpm)
    //             setupEffect()
    //         }
    //     }, 1500)

    // } else if (lowerText.search('zachter') >= 0) {
    //     const reply = 'Ik zal de muziek zachter zetten'
    //     twyResponseMessage(reply)

    //     setTimeout(() => {
    //         setupBeat(underEight, underThirteen, underFive, randomKick, randomSnare, bpm)
    //         if (melodyPlayed == true) {
    //             setupMelody(randomMelody, bpm)
    //             lowerVolume()
    //         }
    //     }, 1500)

    // } else {
    //     const reply = 'Huh ik snap niet wat je bedoelt :(. Misschien moet je wat anders zeggen'
    //     twyResponseMessage(reply)
    // }
})

playButton.addEventListener('click', play)
pauseButton.addEventListener('click', pause)

function twyResponseMessage(response) {
    loading.classList.add('hidden')
    setTimeout(() => {
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

        loading.classList.remove('hidden')
    }, 1000);

}

function twyResetConversation(response) {
    loading.classList.add('hidden')
    setTimeout(() => {
        let twyMessage = document.createElement('li')
        let twyMeta = document.createElement('p')
        let twyResponse = document.createElement('p')
        let twyButton = document.createElement('button')
        twyMessage.classList.add('message')
        twyMessage.classList.add('twy')
        twyMeta.classList.add('text_meta')
        twyResponse.classList.add('text')
        twyButton.classList.add('reset')
        twyMeta.innerText = 'TWY'
        twyResponse.innerText = response
        twyButton.innerText = 'Opnieuw'

        twyMessage.appendChild(twyMeta)
        twyMessage.appendChild(twyResponse)
        twyMessage.appendChild(twyButton)
        chatBox.appendChild(twyMessage)

        chatBox.scrollTop = chatBox.scrollHeight

        loading.classList.remove('hidden')

        const refreshButton = document.querySelector('.reset')
        refreshButton.addEventListener('click', () => {
            console.log('click')
            location.reload()
        })
    }, 1000);

}

function compareData(speechToText) {
    // if (checkIfExists.includes(speechToText)) {
    const existsToString = checkIfExists.toString()

    console.log(existsToString)

    if (speechToText.search(existsToString)) {
        beat.filter((item) => {
            if (speechToText.includes(item)) {
                const reply = 'Wat vind je van deze sicke beat? Moet het tempo aangepast nog aangepast denk je? Anders gaan we verder met een melodie'
                twyResponseMessage(reply)

                setTimeout(() => {
                    setupBeat(underEight, underThirteen, underFive, randomKick, randomSnare, bpm)
                }, 1500)
            }
        })
        slower.filter((item) => {
            if (speechToText.includes(item)) {
                const reply = `Oke je wilt het dus langzamer. Komt voor elkaar!`
                twyResponseMessage(reply)

                setTimeout(() => {
                    bpm = bpm - 30
                    setupBeat(underEight, underThirteen, underFive, randomKick, randomSnare, bpm)

                    if (melodyPlayed == true) {
                        setupMelody(randomMelody, bpm)
                    }
                }, 1500)
            }
        })
        faster.filter((item) => {
            if (speechToText.includes(item)) {
                const reply = `Oke je wilt het dus langzamer. Komt voor elkaar!`
                twyResponseMessage(reply)

                setTimeout(() => {
                    bpm = bpm + 30
                    setupBeat(underEight, underThirteen, underFive, randomKick, randomSnare, bpm)

                    if (melodyPlayed == true) {
                        setupMelody(randomMelody, bpm)
                    }
                }, 1500)
            }
        })
        melody.filter((item) => {
            if (speechToText.includes(item)) {
                const reply = 'Nice, laten we het wat opfleuren met meer geluid! Wat dacht je hiervan?'
                twyResponseMessage(reply)

                setTimeout(() => {
                    setupBeat(underEight, underThirteen, underFive, randomKick, randomSnare, bpm)
                    setupMelody(randomMelody, bpm)
                    melodyPlayed = true
                }, 1500)
            }
        })
        effect.filter((item) => {
            if (speechToText.includes(item)) {
                const reply = 'Nu word het pas echt vet! De muziek kan raar gaan klinken'
                twyResponseMessage(reply)

                setTimeout(() => {
                    setupBeat(underEight, underThirteen, underFive, randomKick, randomSnare, bpm)
                    if (melodyPlayed == true) {
                        setupMelody(randomMelody, bpm)
                        setupEffect()
                    }
                }, 1500)

                setTimeout(() => {
                    const endmessage = 'Ik heb alles gedaan om een vette tune voor je te maken. Wil je er nog één maken, druk de knop'
                    twyResetConversation(endmessage)
                }, 2500)



            }
        })
    } else if (checkIfExists.indexOf(speechToText) >= -1) {
        console.log('HET WERKT NIET')
        const reply = 'Huh ik snap niet wat je bedoelt :(. Misschien moet je wat anders zeggen'
        twyResponseMessage(reply)
    }
}

function talk() {
    console.log("Speech enabled")
    stopBeat()
    stopMelody()
    recognition.start()
}

function pause() {
    // console.log('click')
    stopBeat()
    stopMelody()
    playButton.classList.remove('inactive')
    pauseButton.classList.add('inactive')
    lighting.classList.remove('default')
    blade.classList.remove('defaultBlade')
}

function play() {
    lighting.classList.add('default')
    blade.classList.add('defaultBlade')
    // console.log('click')
    startBeat()
    startMelody()
    pauseButton.classList.remove('inactive')
    playButton.classList.add('inactive')

}
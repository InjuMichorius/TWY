const button = document.getElementById('play')
const audioCtx = new AudioContext()
let audio = new Audio()
audio.src = './audio/fountain.mp3'
console.log(audioCtx)

button.addEventListener('click', playSong)

function playSong() {
    const oscillator = audioCtx.createOscillator()
    oscillator.connect(audioCtx.destination)

    oscillator.type = 'triangle'
    oscillator.start()

    setTimeout(function(){}, 1000)
}

// let audio = new Audio('')

// audio.play()
// audio.addEventListener('playing', function () {
//     console.log('Audio started playing')
// })

// audio.addEventListener('ended', function () {
//     console.log('audio ended')
// })
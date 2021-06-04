let messages = document.querySelector('ul')
let gameForm = document.querySelector('#gameForm')
let input = document.querySelector('#textInput')

Pizzicato.volume = 0.2;

gameForm.addEventListener('submit', (event) => {
    event.preventDefault()
    if (input.value) {
        sendMessage();
        input.value = ''
    }
})

function sendMessage() {
    let element = document.createElement('li')
    element.classList.add('message')
    element.classList.add('you')
    element.innerHTML = element.innerHTML + `
        <p class="text_meta">
            YOU
        </p>
        <p class="text">
            ${input.value}
        </p>
    `;

    document.querySelector('.chat_messages').appendChild(element)

    messages.scrollTop = messages.scrollHeight

    if (input.value.includes("hey")) {
        setTimeout(function() {
            let elementTWY = document.createElement('li')
            elementTWY.classList.add('message')
            elementTWY.classList.add('twy')
            elementTWY.innerHTML = elementTWY.innerHTML + `
            <p class="text_meta">
                TWY
            </p>
            <p class="text">
                Heyy jij daar! TWY hier!
            </p><br>
            <p class="text">
                Ik maak nummers voor iedereen want ik ben een synthetische artiest! Voor wie zal ik nu een nummer maken?
            </p>
            `;

            document.querySelector('.chat_messages').appendChild(elementTWY)

            messages.scrollTop = messages.scrollHeight
        }, 1000);
    } else if (input.value.includes("moeder")) {
        setTimeout(function() {
            let elementTWY = document.createElement('li')
            elementTWY.classList.add('message')
            elementTWY.classList.add('twy')
            elementTWY.innerHTML = elementTWY.innerHTML + `
            <p class="text_meta">
                TWY
            </p>
            <p class="text">
                Vet dat ik muziek mag maken! Laten we beginnen bij een beat!
            </p><br>
            <p class="text">
                Wat voor beat moet ik gebruiken?
            </p>
            `;

            document.querySelector('.chat_messages').appendChild(elementTWY)

            messages.scrollTop = messages.scrollHeight
        }, 1000);
    } else if (input.value.includes("hiphop")) {
        setTimeout(function() {
            let elementTWY = document.createElement('li')
            elementTWY.classList.add('message')
            elementTWY.classList.add('twy')
            elementTWY.innerHTML = elementTWY.innerHTML + `
            <p class="text_meta">
                TWY
            </p>
            <p class="text">
                Dus je wilt een hiphop achtige beat? Wat van je hier van?
                <button class="btnPlay" id="inputBtn">Play</button>
                <button class="btnStop" id="inputBtn">Stop</button>
            </p><br>
            <p class="text">
                Typ 'sneller' als je een snellere beat wilt, of 'langzamer' als je een langzamere beat wilt.
            </p>
            `;

            document.querySelector('.chat_messages').appendChild(elementTWY)

            messages.scrollTop = messages.scrollHeight

            const start = document.querySelector(".btnPlay");
            const stop = document.querySelector(".btnStop");

            var hiphop = new Pizzicato.Sound({
                source: 'file',
                options: {
                    path: './audio/80BPM-beat.wav',
                    loop: true
                }
            }, function() {
                // Sound loaded!
            });

            start.addEventListener('click', () => {
                hiphop.play()
            })

            stop.addEventListener('click', () => {
                hiphop.stop()
            })
        }, 1000);
    } else if (input.value.includes("sneller")) {
        setTimeout(function() {
            let elementTWY = document.createElement('li')
            elementTWY.classList.add('message')
            elementTWY.classList.add('twy')
            elementTWY.innerHTML = elementTWY.innerHTML + `
            <p class="text_meta">
                TWY
            </p>
            <p class="text">
                <button class="btnPlay quickerPlay" id="inputBtn">Play</button>
                <button class="btnStop quickerStop" id="inputBtn">Stop</button>
            </p>
            `;

            document.querySelector('.chat_messages').appendChild(elementTWY)

            messages.scrollTop = messages.scrollHeight

            const start = document.querySelector(".quickerPlay");
            const stop = document.querySelector(".quickerStop");

            var sneller = new Pizzicato.Sound('./audio/120BPM-beat.wav', function() {
                // Sound loaded!
            });

            start.addEventListener('click', () => {
                sneller.play();
            })

            stop.addEventListener('click', () => {
                sneller.stop();
            })
        }, 1000);
    } else if (input.value.includes("slomer")) {
        setTimeout(function() {
            let elementTWY = document.createElement('li')
            elementTWY.classList.add('message')
            elementTWY.classList.add('twy')
            elementTWY.innerHTML = elementTWY.innerHTML + `
            <p class="text_meta">
                TWY
            </p>
            <p class="text">
                <button class="btnPlay slowerPlay" id="inputBtn">Play</button>
                <button class="btnStop slowerStop" id="inputBtn">Stop</button>
            </p>
            `;

            document.querySelector('.chat_messages').appendChild(elementTWY)

            messages.scrollTop = messages.scrollHeight

            const start = document.querySelector(".slowerPlay");
            const stop = document.querySelector(".slowerStop");

            var slomer = new Pizzicato.Sound('./audio/60BPM-beat.wav', function() {
                // Sound loaded!
            });

            start.addEventListener('click', () => {
                slomer.play();
            })

            stop.addEventListener('click', () => {
                slomer.stop();
            })
        }, 1000);
    } else if (input.value.includes("top")) {
        setTimeout(function() {
            let elementTWY = document.createElement('li')
            elementTWY.classList.add('message')
            elementTWY.classList.add('twy')
            elementTWY.innerHTML = elementTWY.innerHTML + `
            <p class="text_meta">
                TWY
            </p>
            <p class="text">
                Nu we een beat hebben, gaan we door naar de melody! Wat vind je hiervan?
                <button class="btnPlay quickerPlay" id="inputBtn">Play</button>
                <button class="btnStop quickerStop" id="inputBtn">Stop</button>
            </p>
            `;

            document.querySelector('.chat_messages').appendChild(elementTWY)

            messages.scrollTop = messages.scrollHeight

            const start = document.querySelector(".quickerPlay");
            const stop = document.querySelector(".quickerStop");

            var sound = new Pizzicato.Sound({
                source: 'wave',
                options: {
                    type: 'sawtooth',
                    frequency: 240
                }
            });

            var pingPongDelay = new Pizzicato.Effects.PingPongDelay({
                feedback: 0.6,
                time: 0.4,
                mix: 0.5
            });

            sound.addEffect(pingPongDelay);
            sound.play();

            start.addEventListener('click', () => {
                sound.play();
            })

            stop.addEventListener('click', () => {
                sound.stop();
            })
        }, 1000);
    } else if (input.value.includes("top")) {
        setTimeout(function() {
            let elementTWY = document.createElement('li')
            elementTWY.classList.add('message')
            elementTWY.classList.add('twy')
            elementTWY.innerHTML = elementTWY.innerHTML + `
            <p class="text_meta">
                TWY
            </p>
            <p class="text">
               Oke top dat we nu een beat hebben.
            </p><br>
            <p class="text">
               Laat ik er een melodie bij maken. Wat voor melodie wil je?
            </p>
            `;

            document.querySelector('.chat_messages').appendChild(elementTWY)

            messages.scrollTop = messages.scrollHeight
        }, 1000);
    } else if (input.value.includes("song")) {
        setTimeout(function() {
            let elementTWY = document.createElement('li')
            elementTWY.classList.add('message')
            elementTWY.classList.add('twy')
            elementTWY.innerHTML = elementTWY.innerHTML + `
            <p class="text_meta">
                TWY
            </p>
            <p class="text">
                <a href="https://soundcloud.com/robotwy/fountain">Here</a> you can find my newest release!
            </p>
            `;

            document.querySelector('.chat_messages').appendChild(elementTWY)

            messages.scrollTop = messages.scrollHeight
        }, 1000);
    }
}

// TESSTTTTT
const start = document.querySelector(".testStart");
const stop = document.querySelector(".testStop");
const high = document.querySelector(".testHigh");
const low = document.querySelector(".testLow");
const remove = document.querySelector(".testRemove");

var acousticGuitar = new Pizzicato.Sound('./audio/80BPM-beat.wav', function() {
    // Sound loaded!
});

// var soundSine = new Pizzicato.Sound({
//     source: 'wave',
//     options: {
//         type: 'sine',
//         frequency: 240
//     }
// });

// var soundSquare = new Pizzicato.Sound({
//     source: 'wave',
//     options: {
//         type: 'square',
//         frequency: 240
//     }
// });

// var soundTriangle = new Pizzicato.Sound({
//     source: 'wave',
//     options: {
//         type: 'triangle',
//         frequency: 240
//     }
// });

// var soundSaw = new Pizzicato.Sound({
//     source: 'wave',
//     options: {
//         type: 'sawtooth',
//         frequency: 240
//     }
// });

var lowPassFilter = new Pizzicato.Effects.LowPassFilter({
    frequency: 1000,
    peak: 10
});

var highPassFilter = new Pizzicato.Effects.HighPassFilter({
    frequency: 1000,
    peak: 10
});

var pingPongDelay = new Pizzicato.Effects.PingPongDelay({
    feedback: 0.6,
    time: 0.4,
    mix: 0
})

start.addEventListener('click', () => {
    // sound.addEffect(pingPongDelay);
    // sound.start();

    acousticGuitar.play()
})

stop.addEventListener('click', () => {
    // sound.removeEffect(pingPongDelay);
    // sound.stop();

    acousticGuitar.stop()
})

low.addEventListener('click', () => {
    acousticGuitar.addEffect(lowPassFilter)
})

high.addEventListener('click', () => {
    acousticGuitar.addEffect(highPassFilter)
})

remove.addEventListener('click', () => {
    acousticGuitar.removeEffect(highPassFilter)
})
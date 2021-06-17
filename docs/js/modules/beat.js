let kickBeat = null
let snareBeat = null
let hihatBeat = null
const lighting = document.querySelector('.twy-image')
const blade = document.querySelector('.blade')

export function setupBeat(randomEight, randomThirteen, randomFive, randomKickPattern, randomSnarePattern, beatsPerMinute) {
    blip.sampleLoader()
        .samples({
            'kick': `./sounds/kick${randomEight}.wav`,
            'snare': `./sounds/snare${randomThirteen}.wav`,
            'hihat': `./sounds/hihat${randomFive}.wav`,
        })
        .done(loaded)
        .load();

    function loaded() {
        lighting.classList.add('default')
        blade.classList.add('defaultBlade')

        // console.log("Samples are now loaded")

        var kick = blip.clip().sample('kick')
        var snare = blip.clip().sample('snare')
        var hihat = blip.clip().sample('hihat')

        kickBeat = blip.loop()
            .tempo(beatsPerMinute)
            .data(randomKickPattern)
            .tick(function (t, d) {
                if (d) {
                    kick.play(t)
                }
            });

        snareBeat = blip.loop()
            .tempo(beatsPerMinute)
            .data(randomSnarePattern)
            .tick(function (t, d) {
                if (d) {
                    snare.play(t)
                }
            });

        hihatBeat = blip.loop()
            .tempo(beatsPerMinute)
            .tick(function (t) {
                hihat.play(t)
            });

        kickBeat.start()
        snareBeat.start()
        hihatBeat.start()

    }
}

export function stopBeat() {
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

export function startBeat() {
    if (!kickBeat !== null) {
        kickBeat.start()
    }
    if (!snareBeat !== null) {
        snareBeat.start()
    }
    if (!hihatBeat !== null) {
        hihatBeat.start()
    }
}
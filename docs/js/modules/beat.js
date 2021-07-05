// kickBeat, snareBeat and hihatBeat have to be globaly declared because they have to be started or pause seperately from the beat setup
let kickBeat = null
let snareBeat = null
let hihatBeat = null

// This function sets up the beat and takes in the radomly generated numbers and the randomly generated drum patterns as arrays and lastly it also takes in the beats per m inute
export function setupBeat(randomEight, randomThirteen, randomFive, randomKickPattern, randomSnarePattern, beatsPerMinute) {
    const lighting = document.querySelector('.twy-image')
    const blade = document.querySelector('.blade')

    // The sample loader uses the library Blip to load in the samples and create the loops
    // Source: https://jshanley.github.io/blip/
    blip.sampleLoader()
        // Loads in the samples. It only loads the samples which correspond with the randomly generated numbers. 
        .samples({
            'kick': `./sounds/kick${randomEight}.wav`,
            'snare': `./sounds/snare${randomThirteen}.wav`,
            'hihat': `./sounds/hihat${randomFive}.wav`,
        })
        .done(loaded)
        .load()

    // Once the samples are loaded they are able to be used in the loaded function
    function loaded() {
        // Variables have to be created for each instrument and be linked to a sample which was previously declared
        const kick = blip.clip().sample('kick')
        const snare = blip.clip().sample('snare')
        const hihat = blip.clip().sample('hihat')

        // Creating a loop for the kick which takes the beats per minute for the right speed and it takes the randomly generated kick pattern
        kickBeat = blip.loop()
            .tempo(beatsPerMinute)
            .data(randomKickPattern)
            .tick(function (t, d) {
                if (d) {
                    kick.play(t)
                }
            })

        // Creating a loop for the snaredrum which takes the beats per minute for the right speed and it takes the randomly generated snare pattern
        snareBeat = blip.loop()
            .tempo(beatsPerMinute)
            .data(randomSnarePattern)
            .tick(function (t, d) {
                if (d) {
                    snare.play(t)
                }
            })

        // Creating a loop for the hihat which only takes the beats per minute for the right speed
        hihatBeat = blip.loop()
            .tempo(beatsPerMinute)
            .tick(function (t) {
                hihat.play(t)
            })

        // Starts all the loops at once to make them play together
        kickBeat.start()
        snareBeat.start()
        hihatBeat.start()

        // Adds a class to the lighting effect on the page. This will trigger the right animation in CSS
        lighting.classList.add('default')
        blade.classList.add('defaultBlade')
    }
}

// This function checks if the beats are not null which will stop / pause them
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

// This function checks if not the beats are not null which will start / unpause them
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
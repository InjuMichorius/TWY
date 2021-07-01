// Source and inspiration for the code: https://pdm.lsupathways.org/3_audio/2_synthsandmusic/2_lesson_2/buildingasequence/

// let sequenceOne
// This function will create and play a melody, it takes in the notes for the melody as an array and the beats per minute as a number
export function setupMelody(melody, beatsPerMinute) {

    // Setting up the synth and sending it to the destination (which is the output)
    let synth = new Tone.Synth({
        // Parameters can be changed to change the synth's sound
        oscillator: {
            type: 'fatsawtooth',
            volume: -10
        },
        envelope: {
            attack: 0.05,
            decay: 0.5,
            sustain: 0.5,
            release: 1
        }
    }).toDestination()

    // Setting up a sequence, you have to specify the melody which are the notes in an array and the time or speed the melody is played in which in this case is four-four time (4n)
    let sequenceOne = new Tone.Sequence(function (time, note) {
        synth.triggerAttackRelease(note, 0.5)
    }, melody, '4n')

    // Sets the bpm by using the external value
    Tone.Transport.bpm.value = beatsPerMinute
    // Starts the melody and the sequence
    Tone.Transport.start()
    sequenceOne.start()
}

// Starts the melody when you click the unpause button
export function startMelody() {
    Tone.Transport.start()
}

// Stops the melody when you click the pause button
export function stopMelody() {
    Tone.Transport.stop()
}
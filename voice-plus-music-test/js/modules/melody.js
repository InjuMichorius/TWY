// let bgMelody = ["C3", ["E3", "G3"], "D3", ["C3", "A3"], "B2", "C2", ["E3", "A2"], "G2", "C4"];
// let injuMelody = ["E3", ["D3", "E3", "F3", "E3"], "B4", ["B2", "A2"], "A3", "B3", "C3", "B2"];
let injuMelodyTwo = ["B3", ["G3", "A3"], "E3", null, "E3", "G3", "A3", "A3", "B3"];

let sequenceOne

// source https://pdm.lsupathways.org/3_audio/2_synthsandmusic/2_lesson_2/buildingasequence/
export function setupMelody(beatsPerMinute) {
    let simpSynth = new Tone.Synth({
        oscillator: {
            volume: 0.1,
            type: "fatsawtooth"
        },
        envelope: {
            attack: 0.05,
            decay: 0.5,
            sustain: 0.5,
            release: 1
        }
    }).toDestination();

    sequenceOne = new Tone.Sequence(function (time, note) {
        simpSynth.triggerAttackRelease(note, 0.5);
        console.log(note);
    }, injuMelodyTwo, '4n')

    Tone.Transport.bpm.value = beatsPerMinute
    Tone.Transport.start()
    sequenceOne.start()
}

export function startMelody() {
    Tone.Transport.start()
    // sequenceOne.stop()
}

export function stopMelody() {
    Tone.Transport.stop()
    // sequenceOne.stop()
}
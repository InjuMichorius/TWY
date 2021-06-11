// import { Volume, Oscillator } from "tone"

export function setupEffect() {
    // const oscillator = new Tone.Oscillator().connect(autoFilter).start();
    const oscillator = new Tone.Oscillator().connect(autoPanner).start();
}

export function lowerVolume() {
    // const vol = new Tone.Volume().toDestination();
    // const oscillator = new Tone.Oscillator().connect(vol).start();
    // vol.volume.value = -30
}

// https://tonejs.github.io/docs/14.7.77/Volume

export function increaseVolume() {

}
// import { Volume, Oscillator } from "tone"

export function setupEffect() {
    // const oscillator = new Tone.Oscillator().connect(autoFilter).start();
    // const autoPanner = new Tone.AutoPanner("4n")
    // const autoFilter = new Tone.AutoFilter("4n")
    // const autoWah = new Tone.AutoWah(50, 6, -30)
    // const crusher = new Tone.BitCrusher(10)
    // const cheby = new Tone.Chebyshev(50)
    // const chorus = new Tone.Chorus(4, 2.5, 0.5)
    // const dist = new Tone.Distortion(1)
    // const feedbackDelay = new Tone.FeedbackDelay("4n", 1)
    // const freeverb = new Tone.Freeverb()
    // freeverb.dampening = 2000;
    // const shift = new Tone.FrequencyShifter(42)

    // const reverb = new Tone.JCReverb(1);
    // const delay = new Tone.FeedbackDelay(0.5);

    // const phaser = new Tone.Phaser({
    //     frequency: 15,
    //     octaves: 5,
    //     baseFrequency: 1000
    // })

    const pingPong = new Tone.PingPongDelay("4n", 0.2).start()

    // const tremolo = new Tone.Tremolo(9, 0.75).start()

    const oscillator = new Tone.Oscillator().conncect(pingPong).start();
}

export function lowerVolume() {
    // const vol = new Tone.Volume().toDestination();
    // const oscillator = new Tone.Oscillator().connect(vol).start();
    // vol.volume.value = -30
}

// https://tonejs.github.io/docs/14.7.77/Volume

export function increaseVolume() {

}
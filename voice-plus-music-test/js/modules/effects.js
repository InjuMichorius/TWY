// This function Applies a phaser effect over the melody 
export function setupEffect() {
    const phaser = new Tone.Phaser({
        // Parameters can be changed to change the effect's sound
        frequency: 200,
        octaves: 7,
        baseFrequency: 800
    })
}
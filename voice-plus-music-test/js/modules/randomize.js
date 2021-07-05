// Array which holds the kick patterns
const kickPatterns = [
    [0, 1, 0, 0, 0, 1, 0, 0],
    [0, 1, 0, 0, 1, 1, 0, 0],
    [1, 1, 0, 0, 1, 1, 0, 0],
    [0, 1, 0, 0, 0, 1, 1, 0]
]

// Array which holds the snare drum patterns
const snarePatterns = [
    [0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 1, 1, 0, 0, 1],
    [0, 0, 0, 1, 1, 0, 0, 1]
]

// Picks a random array from the bigger array
const randomKick = kickPatterns[Math.floor(Math.random() * kickPatterns.length)]
const randomSnare = snarePatterns[Math.floor(Math.random() * snarePatterns.length)]

// Generates a number between 1 and 8
const underEight = Math.floor(Math.random() * 8) + 1
// Generates a number between 1 and 13
const underThirteen = Math.floor(Math.random() * 13) + 1
// Generates a number between 1 and 5
const underFive = Math.floor(Math.random() * 5) + 1

// Array that holds all the notes for the different melodies
const melodies = [
    ['C3', ['E3', 'G3'], 'D3', ['C3', 'A3'], 'B2', 'C2', ['E3', 'A2'], 'G2', 'C4'],
    ['E3', ['D3', 'E3', 'F3', 'E3'], 'B4', ['B2', 'A2'], 'A3', 'B3', 'C3', 'B2'],
    ['B3', ['G3', 'A3'], 'E3', null, 'E3', 'G3', 'A3', 'A3', 'B3'],
    ['C#4', 'D#4', 'G#3', 'D#4', 'F4', ['G#4', 'F#4', 'F4'], 'C#4', 'D#4', 'G#3', null, null],
    ['C3', 'D#3', 'G3', 'G#3', 'D#3', 'G#3', 'A#3', ['G3', 'G#3', 'G3', 'G#3', 'G3']],
    ['C3', ['G3', 'F#3', 'G3', 'F#3', 'G3'], 'D#3', 'C3'],
    [
        ['C4', 'B#3', 'A3', 'F3'], 'G3', ['G3', 'D4'], 'C4', 'B#3', 'A3', ['A3', 'A3'], 'C4', ['B#3', 'A3'], 'G3', ['B#4', 'A4', 'B#4', 'A4', 'B#4']
    ]
]

// Picks a random array from the bigger array
const randomMelody = melodies[Math.floor(Math.random() * melodies.length)]

export { randomKick, randomSnare, underEight, underThirteen, underFive, randomMelody }
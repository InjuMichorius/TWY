const songTempo = 150;

blip.sampleLoader()
    .samples({
        'kick': './sounds/kick1.wav',
        'snare': './sounds/snare9.wav',
        'hihat': './sounds/hihat1.wav'
    })
    .done(loaded)
    .load();

function loaded() {
    var kick = blip.clip()
        .sample('kick');

    var snare = blip.clip()
        .sample('snare');

    var hihat = blip.clip()
        .sample('hihat');

    var kickBeat = blip.loop()
        .tempo(songTempo)
        // .data([0, 1, 0, 0, 0, 1, 1, 0])
        .data([0, 1, 0, 0, 1, 1, 0, 0])
        .tick(function (t, d) {
            if (d) {
                kick.play(t)
            }
        });

    var snareBeat = blip.loop()
        .tempo(songTempo)
        .data([0, 0, 0, 1, 0, 0, 0, 1])
        .tick(function (t, d) {
            if (d) {
                snare.play(t)
            }
        });

    var hihatBeat = blip.loop()
        .tempo(songTempo)
        // .data([1, 1, 1, 1])
        .tick(function (t) {
            // if (d) {
            hihat.play(t)
            // }
        });

    // xX xQ xX xx

    document.getElementById('play').addEventListener('click', function () {
        kickBeat.start();
        snareBeat.start();
        hihatBeat.start();
    });
    document.getElementById('pause').addEventListener('click', function () {
        kickBeat.stop();
        snareBeat.stop();
        hihatBeat.stop();
    });
}
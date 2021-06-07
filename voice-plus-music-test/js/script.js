// const audioCtx = new AudioContext();

const songTempo = 150;
const kickPattern1 = [0, 1, 0, 0, 0, 1, 0, 0];
const kickPattern2 = [0, 1, 0, 0, 1, 1, 0, 0];
const kickPattern3 = [1, 1, 0, 0, 1, 1, 0, 0];
const kickPattern4 = [0, 1, 0, 0, 0, 1, 1, 0];

const snarePattern1 = [0, 0, 0, 1, 0, 0, 0, 1];
const snarePattern2 = [1, 0, 0, 1, 1, 0, 0, 1];

blip.sampleLoader()
    .samples({
        'kick': './sounds/kick1.wav',
        // 'kick': './sounds/kick6.wav',
        'snare': './sounds/snare9.wav',
        // 'snare': './sounds/snare7.wav',
        'hihat': './sounds/hihat1.wav'
        // 'hihat': './sounds/hihat4.wav'
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
        .data(kickPattern3)
        .tick(function (t, d) {
            if (d) {
                kick.play(t)
            }
        });

    var snareBeat = blip.loop()
        .tempo(songTempo)
        .data(snarePattern1)
        .tick(function (t, d) {
            if (d) {
                snare.play(t)
            }
        });

    var hihatBeat = blip.loop()
        .tempo(songTempo)
        .tick(function (t) {
            hihat.play(t)
        });

    // xX xQ xX xx
    const playBtn = document.getElementById('play');
    const pauseBtn = document.getElementById('pause');

    playBtn.addEventListener('click', function () {
        kickBeat.start();
        snareBeat.start();
        hihatBeat.start();
    });
    pauseBtn.addEventListener('click', function () {
        kickBeat.stop();
        snareBeat.stop();
        hihatBeat.stop();
    });

    // playBtn.onclick = function () {
    //     if (audioCtx.state === 'running') {
    //         audioCtx.suspend().then(function () {
    //             playBtn.textContent = 'Resume context';
    //         });
    //     } else if (audioCtx.state === 'suspended') {
    //         audioCtx.resume().then(function () {
    //             playBtn.textContent = 'Suspend context';
    //         });
    //     }
    // }
}
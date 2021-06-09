export function setupBeat(randomEight, randomThirteen, randomFive, kickPattern, snarePattern, hihitPattern, randomKickPattern, randomSnarePattern, beatsPerMinute) {
    blip.sampleLoader()
        .samples({
            'kick': `./sounds/kick${randomEight}.wav`,
            'snare': `./sounds/snare${randomThirteen}.wav`,
            'hihat': `./sounds/hihat${randomFive}.wav`,
        })
        .done(loaded)
        .load();

    function loaded() {

        console.log("Samples are now loaded");

        var kick = blip.clip().sample('kick');
        var snare = blip.clip().sample('snare');
        var hihat = blip.clip().sample('hihat');

        kickPattern = blip.loop()
            .tempo(beatsPerMinute)
            .data(randomKickPattern)
            .tick(function (t, d) {
                if (d) {
                    kick.play(t)
                }
            });

        snarePattern = blip.loop()
            .tempo(beatsPerMinute)
            .data(randomSnarePattern)
            .tick(function (t, d) {
                if (d) {
                    snare.play(t)
                }
            });

        hihitPattern = blip.loop()
            .tempo(beatsPerMinute)
            .tick(function (t) {
                hihat.play(t)
            });

        kickPattern.start()
        snarePattern.start()
        hihitPattern.start()

    }
}
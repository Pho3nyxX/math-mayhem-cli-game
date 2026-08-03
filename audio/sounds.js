import player from "play-sound";

const audio = player({
    player: "mpv"
});

const sounds = {
    start: "./audio/start.mp3",
    easy: "./audio/easy.mp3",
    medium: "./audio/medium.mp3",
    hard: "./audio/hard.mp3",
    correct: "./audio/correct.mp3",
    wrong: "./audio/wrong.mp3",
    timeUp: "./audio/time-up.mp3",
    streak: "./audio/streak.mp3",
    warning: "./audio/warning.mp3",
    victory: "./audio/victory.mp3",
    failure: "./audio/failure.mp3"
};

export function playSound(type) {
    const file = sounds[type];

    if (!file) {
        console.log("Sound not found:", type);
        return;
    }

    audio.play(file, (err) => {
        if (err) console.log("Error playing sound:", err);
    });
}
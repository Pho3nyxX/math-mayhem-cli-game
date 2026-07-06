import readline from "readline";
import chalk from "chalk";
import { writeFile, readFile } from "node:fs";
import { scoreTiers } from "./scoreTiers.js";


(function () {

    const readLine = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })

    // variables & names
    let a = '9';
    let b = 5;
    let c = '8';
    let d = 'thunder';
    let e = 'is';
    let f = 'striking';
    let g = 0;
    let h = 12;
    let i = 'the';

    // questions and answers list
    const questions = {
        1: { text: "a + b?", level: "easy", answer: () => Number(a + b) },
        2: { text: "h - b?", level: "easy", answer: () => Number(h - b) },
        3: { text: "b + g?", level: "easy", answer: () => Number(b + g) },
        4: { text: "c + b?", level: "easy", answer: () => Number(c + b) },
        5: { text: "a - b?", level: "easy", answer: () => Number(a - b) },
        6: { text: "g + a?", level: "easy", answer: () => Number(g + a) },
        7: { text: "h + g?", level: "easy", answer: () => Number(h + g) },
        8: { text: "b + b?", level: "easy", answer: () => Number(b + b) },
        9: { text: "c - b?", level: "easy", answer: () => Number(c - b) },
        10: { text: "h - g?", level: "easy", answer: () => Number(h - g) },
        11: { text: "a + g?", level: "easy", answer: () => Number(a + g) },
        12: { text: "i + d?", level: "easy", answer: () => i + d },
        13: { text: "e + f?", level: "easy", answer: () => e + f },
        14: { text: "i + e?", level: "easy", answer: () => i + e },
        15: { text: "a + a?", level: "easy", answer: () => Number(a + a) },
        16: { text: "b * c?", level: "easy", answer: () => Number(b * c) },
        17: { text: "h / b?", level: "easy", answer: () => Number(h / b) },
        18: { text: "h % b?", level: "easy", answer: () => Number(h % b) },
        19: { text: "c - a?", level: "easy", answer: () => Number(c - a) },
        20: { text: "a * b?", level: "easy", answer: () => Number(a * b) },
        21: { text: "c * b?", level: "easy", answer: () => Number(c * b) },
        22: { text: "h + a?", level: "easy", answer: () => Number(h + a) },
        23: { text: "c + h?", level: "easy", answer: () => Number(c + h) },
        24: { text: "h - a?", level: "easy", answer: () => Number(h - a) },
        25: { text: "c / b?", level: "easy", answer: () => Number(c / b) },

        26: { text: "b + c + a?", level: "medium", answer: () => Number(b + c + a) },
        27: { text: "h / (b + g)?", level: "medium", answer: () => Number(h / (b + g)) },
        28: { text: "b + g + h?", level: "medium", answer: () => Number(b + g + h) },
        29: { text: "a + b + c?", level: "medium", answer: () => Number(a + b + c) },
        30: { text: "g + h + b?", level: "medium", answer: () => Number(g + h + b) },
        31: { text: "b + g * h?", level: "medium", answer: () => Number(b + g * h) },
        32: { text: "h + a * b?", level: "medium", answer: () => Number(h + a * b) },
        33: { text: "(h + a) * b?", level: "medium", answer: () => Number((h + a) * b) },
        34: { text: "a * b + c?", level: "medium", answer: () => Number(a * b + c) },
        35: { text: "c + b * h?", level: "medium", answer: () => Number(c + b * h) },
        36: { text: "h * b + a?", level: "medium", answer: () => Number(h * b + a) },
        37: { text: "a + b * c?", level: "medium", answer: () => Number(a + b * c) },
        38: { text: "(h / b) + c?", level: "medium", answer: () => Number((h / b) + c) },
        39: { text: "(h + g + a) * b?", level: "medium", answer: () => Number((h + g + a) * b) },
        40: { text: "b * h + g?", level: "medium", answer: () => Number(b * h + g) },
        41: { text: "h - b + g?", level: "medium", answer: () => Number(h - b + g) },
        42: { text: "b * (g + h)?", level: "medium", answer: () => Number(b * (g + h)) },
        43: { text: "h % b + g?", level: "medium", answer: () => Number(h % b + g) },
        44: { text: "b + c * g?", level: "medium", answer: () => Number(b + c * g) },
        45: { text: "(h - b) + g?", level: "medium", answer: () => Number((h - b) + g) },
        46: { text: "b ** 2 + g?", level: "medium", answer: () => Number(b ** 2 + g) },
        47: { text: "h / b + g?", level: "medium", answer: () => Number(h / b + g) },
        48: { text: "i + ' ' + d?", level: "medium", answer: () => i + ' ' + d },
        49: { text: "e + ' ' + f?", level: "medium", answer: () => e + ' ' + f },
        50: { text: "i + ' ' + e?", level: "medium", answer: () => i + ' ' + e },

        51: { text: "(b + g) ** 2?", level: "hard", answer: () => Number((b + g) ** 2) },
        52: { text: "a * (b + c)?", level: "hard", answer: () => Number(a * (b + c)) },
        53: { text: "(h - b) * a?", level: "hard", answer: () => Number((h - b) * a) },
        54: { text: "(c + a) * b?", level: "hard", answer: () => Number((c + a) * b) },
        55: { text: "(a + b + c) * b?", level: "hard", answer: () => Number((a + b + c) * b) },
        56: { text: "(h + g + a) * b?", level: "hard", answer: () => Number((h + g + a) * b) },
        57: { text: "b + g * h ** 2?", level: "hard", answer: () => Number(b + g * h ** 2) },
        58: { text: "(b + g * h) ** 2?", level: "hard", answer: () => Number((b + g * h) ** 2) },
        59: { text: "h ** 2 + b * g?", level: "hard", answer: () => Number(h ** 2 + b * g) },
        60: { text: "(h + b) ** 2?", level: "hard", answer: () => Number((h + b) ** 2) },
        61: { text: "b * h ** g?", level: "hard", answer: () => Number(b * h ** g) },
        62: { text: "(h - b) ** 2?", level: "hard", answer: () => Number((h - b) ** 2) },
        63: { text: "h ** (b % 3)?", level: "hard", answer: () => Number(h ** (b % 3)) },
        64: { text: "(b + g + h) ** 2?", level: "hard", answer: () => Number((b + g + h) ** 2) },
        65: { text: "b * (h % 5) + g?", level: "hard", answer: () => Number(b * (h % 5) + g) },
        66: { text: "(h ** 2) % b?", level: "hard", answer: () => Number((h ** 2) % b) },
        67: { text: "(b + g * h) % b?", level: "hard", answer: () => Number((b + g * h) % b) },
        68: { text: "(h + b * g) ** 2?", level: "hard", answer: () => Number((h + b * g) ** 2) },
        69: { text: "h ** 2 + b ** 2?", level: "hard", answer: () => Number(h ** 2 + b ** 2) },
        70: { text: "(b * h + g) % h?", level: "hard", answer: () => Number((b * h + g) % h) },
        71: { text: "(h + b) * (g + 1)?", level: "hard", answer: () => Number((h + b) * (g + 1)) },
        72: { text: "(b + g) * (h % 5)?", level: "hard", answer: () => Number((b + g) * (h % 5)) },
        73: { text: "(h ** 2 + b) % g?", level: "hard", answer: () => (h ** 2 + b) % g },
        74: { text: "(b * h) ** 2?", level: "hard", answer: () => Number((b * h) ** 2) },
        75: { text: "(h + b * g) % 7?", level: "hard", answer: () => Number((h + b * g) % 7) },
    };

    // print instructions
    console.log(chalk.yellow('\n=================================================================================='));
    console.log(chalk.green.bold('🎮  WELCOME TO MATH MAYHEM  🎮'));
    console.log(chalk.yellow('==================================================================================\n'));

    console.log(chalk.white('Get ready to test your speed, accuracy, and brain power!\n'));

    console.log(chalk.cyan('GAME RULES:'));
    console.log(chalk.white('• You will be given ') + chalk.green.bold('20 questions'));
    console.log(chalk.white('• Try to answer each question before time runs out'));
    console.log(chalk.white('• Score ') + chalk.green.bold('15 or higher') + chalk.white(' to PASS'));
    console.log(chalk.white('• Score ') + chalk.red.bold('14 or lower') + chalk.white(' to FAIL\n'));

    console.log(chalk.cyan('TIMER SYSTEM:'));
    console.log(chalk.white('• You start with ') + chalk.green.bold('50 seconds'));
    console.log(chalk.white('• Each correct answer ') + chalk.green.bold('REDUCES your time'));
    console.log(chalk.white('• The better you perform, the faster the game becomes!\n'));

    console.log(chalk.cyan('ADAPTIVE DIFFICULTY:'));
    console.log(chalk.white('• Get ') + chalk.green.bold('3 correct answers in a row') + chalk.white(' → Difficulty increases'));
    console.log(chalk.white('   EASY → MEDIUM → HARD'));
    console.log('');
    console.log(chalk.white('• Get ') + chalk.red.bold('2 wrong answers') + chalk.white(' → Difficulty decreases'));
    console.log(chalk.white('   HARD → MEDIUM → EASY\n'));

    console.log(chalk.cyan('DIFFICULTY BREAKDOWN:'));
    console.log(chalk.green('• EASY: ') + chalk.white('Simple arithmetic'));
    console.log(chalk.blue('• MEDIUM: ') + chalk.white('Mixed problems'));
    console.log(chalk.red('• HARD: ') + chalk.white('Complex / nested expressions\n'));

    console.log(chalk.magenta.bold('Stay sharp. Think fast. Adapt quickly.\n'));

    console.log(chalk.yellow('==================================================================================\n'));

    // show variable and value
    console.log("Variables and Values:");
    console.log("a =", a);
    console.log("b =", b);
    console.log("c =", c);
    console.log("d =", d);
    console.log("e =", e);
    console.log("f =", f);
    console.log("g =", g);
    console.log("h =", h);
    console.log("i =", i);

    let correctCount = 0;
    let incorrectCount = 0;
    let timer;
    let warningTimer;
    let answered = false;
    let currentQuestion;
    let correctQuestions = [];
    let incorrectQuestions = [];
    const path = "./scores.json";
    let currentUser;
    let scores = [];
    let highest;
    let timeLeft = 0;
    let countdown;
    let streak = 0;
    let highStreak = 0;
    let currentDifficulty = "easy";
    let totalAsked = 0;
    const maxQuestions = 20;
    let baseTime = 50;
    let timeDecrease = {
        easy: 1,
        medium: 2,
        hard: 3
    };
    let correct = {
        easy: 0,
        medium: 0,
        hard: 0
    };
    let wrongStreak = 0;
    let easyQuestion = [];
    let mediumQuestion = [];
    let hardQuestion = [];
    
    // group questions based on levels
    for (const [key, question] of Object.entries(questions)) {
        if (question.level === "easy") {
            easyQuestion.push([key, question]);
        } else if (question.level === "medium") {
            mediumQuestion.push([key, question]);
        } else if (question.level === "hard") {
            hardQuestion.push([key, question]);
        }
    }

    // adaptive timer adjustment
    function updateTime() {
        return baseTime
            - (correct.easy * timeDecrease.easy)
            - (correct.medium * timeDecrease.medium)
            - (correct.hard * timeDecrease.hard);
    }

    function getTier(score) {
        return scoreTiers.find(
            tier => score >= tier.min && score <= tier.max
        );
    }

    function getAnswer(choice, answer) {
        let correctAnswer = questions[choice].answer();;

        if (answer == correctAnswer) {
            console.log(chalk.green("✔") + " Correct.");

            // track correct answers
            correctCount++;

            // track correct answers per difficulty
            correct[currentDifficulty]++;

            // track streak 
            streak++;

            // reset when answer is correct
            wrongStreak = 0;

            if (streak > highStreak) {
                highStreak = streak;
                console.log(chalk.yellow(`New High Streak: ${highStreak}`));
            }

            // questions user got right
            correctQuestions.push(questions[choice].text);
        } else {
            console.log(chalk.red("✖") + ` Incorrect. Correct answer: ${correctAnswer}`);

            // track incorrect answers
            incorrectCount++;

            // reset streak
            streak = 0;

            // increase when user answer is wrong
            wrongStreak++;

            // questions user got wrong
            incorrectQuestions.push(questions[choice].text);
        }

        adjustDifficulty();
    }

    // randomly shuffle the question array and returns the first 'num' items
    function shuffleQuestions(entries, num) {
        const shuffled = [...entries].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
    }

    // bring game back to start
    function resetGame() {
        correctCount = 0;
        incorrectCount = 0;
        highStreak = 0;
        streak = 0;
        answered = false;

        correct = {
            easy: 0,
            medium: 0,
            hard: 0
        };

        // clear timers
        clearTimeout(timer);
        clearTimeout(warningTimer);

        console.clear();
        console.log("....Start of New Game....");
    }

    function askQuestions() {
        console.clear();

        if (totalAsked >= maxQuestions) {
            clearInterval(countdown);
            clearTimeout(timer);
            clearTimeout(warningTimer);

            console.log("\n--------------------------------");
            console.log("We've come to the end! You got...");
            console.log(`Correct: ${correctCount}`);
            console.log(`Incorrect: ${incorrectCount}`);
            console.log("--------------------------------\n");

            if (correctCount >= 15) {
                console.log("Well Done! You Passed!");
            } else {
                console.log("I'm Sorry! You Failed!");
            }

            let score = correctCount;
            let tier = getTier(score);

            console.log(`${tier.label} ${tier.emoji}`);
            console.log(tier.description);

            console.log("\nCorrect Questions:");
            console.log(correctQuestions);

            console.log("\nIncorrect Questions:");
            console.log(incorrectQuestions);

            saveScore(currentUser, correctCount, highStreak, tier.label, () => {
                // leaderboard
                scores.sort((a, b) => b.score - a.score);
                let top5 = scores.slice(0, 5);

                console.log("\nLeaderboard:");
                top5.forEach((rank, i) => {
                    console.log(`${i + 1}. ${rank.user}: ${rank.score}`);
                })

                readLine.question("\nDo you wish to play again? (Type 'yes', 'y' or 'no', 'n'). \n", function (replayAnswer) {
                    if (replayAnswer.toLowerCase() === 'yes' || replayAnswer.toLowerCase() === 'y') {
                        resetGame();
                        startGame();
                    } else {
                        readLine.close();
                    }
                });
            });

            return;
        }

        // update timer
        timeLeft = updateTime();

        // prevent negative timer
        timeLeft = Math.max(3, timeLeft);

        // clear any previous countdown
        clearInterval(countdown);

        let [questionKey, questionObj] = getNextQuestion();

        // increment questions asked
        totalAsked++;

        currentQuestion = questionKey;
        answered = false;

        process.stdout.write(`What is ${questionObj.text} `);
        console.log("");

        clearInterval(countdown);
        clearTimeout(timer);
        clearTimeout(warningTimer);

        // ui countdown
        countdown = setInterval(() => {
            process.stdout.write(`\rTime left: ${chalk.red(`${timeLeft}s`)}   `);

            timeLeft--;

            if (timeLeft <= 0) {
                clearInterval(countdown);
            }
        }, 1000);

        // warning timer 
        if (timeLeft > 5) {
            warningTimer = setTimeout(() => {
                let timerText = `Time left: ${timeLeft}s`;
                let warningText = "5 seconds left!";

                let width = process.stdout.columns;

                // space between left and right text
                let space = Math.max(1, width - (timerText.length + warningText.length));

                process.stdout.write(
                    `\r${chalk.red(timerText)}${" ".repeat(space)}${chalk.yellow(warningText)}`
                );
            }, (timeLeft - 5) * 1000);
        }

        // main timer (end question)
        timer = setTimeout(() => {
            if (!answered) {
                answered = true;

                clearInterval(countdown);

                console.log(chalk.red("\n Time's up!"));

                incorrectCount++;
                incorrectQuestions.push(questionObj.text);

                setTimeout(() => {
                    askQuestions();
                }, 1500);
            }
        }, timeLeft * 1000);
    }

    // save user score
    function saveScore(user, score, highStreak, label, callback) {

        readFile(path, "utf-8", (err, data) => {

            // check if file exist
            if (!err && data) {
                try {
                    scores = JSON.parse(data);
                } catch {
                    scores = [];
                }
            }

            // add new score
            scores.push({ user, score, highStreak, label });

            writeFile(path, JSON.stringify(scores, null, 2), (err) => {
                if (err) throw err;

                // calculate highest score
                highest = scores.reduce((max, current) => {
                    if (current.score > max.score) {
                        return current;
                    } else {
                        return max;
                    }
                });

                console.log(`
                    ========================
                    🏆 HIGHEST SCORE
                    ========================
                    User: ${highest.user}
                    Score: ${highest.score}
                    Best Streak: ${highest.highStreak}
                    ========================
                `);

                callback();
            })
        });
    }

    // ask difficulty question
    function startGame() {
        readLine.question("Choose difficulty (easy, medium, hard): ", function (level) {

            level = level.toLowerCase().trim();

            if (!["easy", "medium", "hard"].includes(level)) {
                console.log("Invalid choice. Defaulting to easy.");
                level = "easy";
            }

            // set starting difficulty
            currentDifficulty = level === "hard" ? "hard" : level;

            console.log(`\nStarting ${level.toUpperCase()} mode...\n`);

            setTimeout(() => {
                askQuestions();
            }, 1000);
        });
    }

    // loop through questions & listen for user input
    readLine.on("line", (givenAnswer) => {
        if (answered) return;

        answered = true;

        // stop timer if user answer in time
        if (timer) {
            clearInterval(countdown);
            clearTimeout(timer);
            clearTimeout(warningTimer);
        }

        getAnswer(Number(currentQuestion), givenAnswer);

        setTimeout(() => {
            askQuestions();
        }, 1500);
    });

    // get user input (yes or no)
    readLine.question("\nDo you wish to continue? (Type 'yes', 'y' or 'no', 'n'). \n", function (userAnswer) {

        if (userAnswer.toLowerCase() === 'yes' || userAnswer.toLowerCase() === 'y') {
            // get user name
            readLine.question("\nWhat is your name? ", function (name) {
                currentUser = name;

                console.log("\nWelcome " + currentUser);

                startGame();
            });
        } else {
            readLine.close();
        }

    });

    // adaptive difficulty
    function adjustDifficulty() {
        // increase difficulty if doing well
        if (streak >= 3) {
            if (currentDifficulty === "easy") {
                currentDifficulty = "medium";
                console.log(chalk.blue("\nDifficulty increased to MEDIUM"));
            } else if (currentDifficulty === "medium") {
                currentDifficulty = "hard";
                console.log(chalk.blue("\nDifficulty increased to HARD"));
            }
            streak = 0;
        }

        // decrease difficulty if struggling
        if (wrongStreak >= 2) {
            if ((currentDifficulty === "hard" && wrongStreak >= 3) ||
                (currentDifficulty === "medium" && wrongStreak >= 2)
            ) {
                if (currentDifficulty === "hard") {
                    currentDifficulty = "medium";
                    console.log(chalk.magenta("\nDifficulty decreased to MEDIUM"));
                } else if (currentDifficulty === "medium") {
                    currentDifficulty = "easy";
                    console.log(chalk.magenta("\nDifficulty decreased to EASY"));
                }

                wrongStreak = 0;
            }
        }
    }

    function getNextQuestion() {
        let ques;

        if (currentDifficulty === "easy") {
            ques = easyQuestion;
        } else if (currentDifficulty === "medium") {
            ques = mediumQuestion;
        } else {
            ques = hardQuestion;
        }

        return ques[Math.floor(Math.random() * ques.length)];
    }
})();
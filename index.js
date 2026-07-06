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

    // question list
    const questions = {
        1: { text: "a + b?", level: "easy" },
        2: { text: "h - b?", level: "easy" },
        3: { text: "b + g?", level: "easy" },
        4: { text: "c + b?", level: "easy" },
        5: { text: "a - b?", level: "easy" },
        6: { text: "g + a?", level: "easy" },
        7: { text: "h + g?", level: "easy" },
        8: { text: "b + b?", level: "easy" },
        9: { text: "c - b?", level: "easy" },
        10: { text: "h - g?", level: "easy" },
        11: { text: "a + g?", level: "easy" },
        12: { text: "i + d?", level: "easy" },
        13: { text: "e + f?", level: "easy" },
        14: { text: "i + e?", level: "easy" },
        15: { text: "a + a?", level: "easy" },
        16: { text: "b * c?", level: "easy" },
        17: { text: "h / b?", level: "easy" },
        18: { text: "h % b?", level: "easy" },
        19: { text: "c - a?", level: "easy" },
        20: { text: "a * b?", level: "easy" },
        21: { text: "c * b?", level: "easy" },
        22: { text: "h + a?", level: "easy" },
        23: { text: "c + h?", level: "easy" },
        24: { text: "h - a?", level: "easy" },
        25: { text: "c / b?", level: "easy" },
        26: { text: "b + c + a?", level: "medium" },
        27: { text: "h / (b + g)?", level: "medium" },
        28: { text: "b + g + h?", level: "medium" },
        29: { text: "a + b + c?", level: "medium" },
        30: { text: "g + h + b?", level: "medium" },
        31: { text: "b + g * h?", level: "medium" },
        32: { text: "h + a * b?", level: "medium" },
        33: { text: "(h + a) * b?", level: "medium" },
        34: { text: "a * b + c?", level: "medium" },
        35: { text: "c + b * h?", level: "medium" },
        36: { text: "h * b + a?", level: "medium" },
        37: { text: "a + b * c?", level: "medium" },
        38: { text: "(h / b) + c?", level: "medium" },
        39: { text: "(h + g + a) * b?", level: "medium" },
        40: { text: "b * h + g?", level: "medium" },
        41: { text: "h - b + g?", level: "medium" },
        42: { text: "b * (g + h)?", level: "medium" },
        43: { text: "h % b + g?", level: "medium" },
        44: { text: "b + c * g?", level: "medium" },
        45: { text: "(h - b) + g?", level: "medium" },
        46: { text: "b ** 2 + g?", level: "medium" },
        47: { text: "h / b + g?", level: "medium" },
        48: { text: "i + ' ' + d?", level: "medium" },
        49: { text: "e + ' ' + f?", level: "medium" },
        50: { text: "i + ' ' + e?", level: "medium" },
        51: { text: "(b + g) ** 2?", level: "hard" },
        52: { text: "a * (b + c)?", level: "hard" },
        53: { text: "(h - b) * a?", level: "hard" },
        54: { text: "(c + a) * b?", level: "hard" },
        55: { text: "(a + b + c) * b?", level: "hard" },
        56: { text: "(h + g + a) * b?", level: "hard" },
        57: { text: "b + g * h ** 2?", level: "hard" },
        58: { text: "(b + g * h) ** 2?", level: "hard" },
        59: { text: "h ** 2 + b * g?", level: "hard" },
        60: { text: "(h + b) ** 2?", level: "hard" },
        61: { text: "b * h ** g?", level: "hard" },
        62: { text: "(h - b) ** 2?", level: "hard" },
        63: { text: "h ** (b % 3)?", level: "hard" },
        64: { text: "(b + g + h) ** 2?", level: "hard" },
        65: { text: "b * (h % 5) + g?", level: "hard" },
        66: { text: "(h ** 2) % b?", level: "hard" },
        67: { text: "(b + g * h) % b?", level: "hard" },
        68: { text: "(h + b * g) ** 2?", level: "hard" },
        69: { text: "h ** 2 + b ** 2?", level: "hard" },
        70: { text: "(b * h + g) % h?", level: "hard" },
        71: { text: "(h + b) * (g + 1)?", level: "hard" },
        72: { text: "(b + g) * (h % 5)?", level: "hard" },
        73: { text: "(h ** 2 + b) % g?", level: "hard" },
        74: { text: "(b * h) ** 2?", level: "hard" },
        75: { text: "(h + b * g) % 7?", level: "hard" },
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

    let questionEntries = Object.entries(questions);
    let filteredEntries = [];
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
    let top5;

    let easyQuestion = questionEntries.filter(([key, question]) => question.level === "easy");
    let mediumQuestion = questionEntries.filter(([key, question]) => question.level === "medium");
    let hardQuestion = questionEntries.filter(([key, question]) => question.level === "hard");
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

    let score;
    let tier;
    let wrongStreak = 0;

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
        let correctAnswer;

        switch (choice) {
            case 1:
                correctAnswer = Number(a + b);
                break;
            case 2:
                correctAnswer = Number(h - b);
                break;
            case 3:
                correctAnswer = Number(b + g);
                break;
            case 4:
                correctAnswer = Number(c + b);
                break;
            case 5:
                correctAnswer = Number(a - b);
                break;
            case 6:
                correctAnswer = Number(g + a);
                break;
            case 7:
                correctAnswer = Number(h + g);
                break;
            case 8:
                correctAnswer = Number(b + b);
                break;
            case 9:
                correctAnswer = Number(c - b);
                break;
            case 10:
                correctAnswer = Number(h - g);
                break;
            case 11:
                correctAnswer = Number(a + g);
                break;
            case 12:
                correctAnswer = i + d;
                break;
            case 13:
                correctAnswer = e + f;
                break;
            case 14:
                correctAnswer = i + e;
                break;
            case 15:
                correctAnswer = Number(a + a);
                break;
            case 16:
                correctAnswer = Number(b * c);
                break;
            case 17:
                correctAnswer = Number(h / b);
                break;
            case 18:
                correctAnswer = Number(h % b);
                break;
            case 19:
                correctAnswer = Number(c - a);
                break;
            case 20:
                correctAnswer = Number(a * b);
                break;
            case 21:
                correctAnswer = Number(c * b);
                break;
            case 22:
                correctAnswer = Number(h + a);
                break;
            case 23:
                correctAnswer = Number(c + h);
                break;
            case 24:
                correctAnswer = Number(h - a);
                break;
            case 25:
                correctAnswer = Number(c / b);
                break;
            case 26:
                correctAnswer = Number(b + c + a);
                break;
            case 27:
                correctAnswer = Number(h / (b + g));
                break;
            case 28:
                correctAnswer = Number(b + g + h);
                break;
            case 29:
                correctAnswer = Number(a + b + c);
                break;
            case 30:
                correctAnswer = Number(g + h + b);
                break;
            case 31:
                correctAnswer = Number(b + g * h);
                break;
            case 32:
                correctAnswer = Number(h + a * b);
                break;
            case 33:
                correctAnswer = Number((h + a) * b);
                break;
            case 34:
                correctAnswer = Number(a * b + c);
                break;
            case 35:
                correctAnswer = Number(c + b * h);
                break;
            case 36:
                correctAnswer = Number(h * b + a);
                break;
            case 37:
                correctAnswer = Number(a + b * c);
                break;
            case 38:
                correctAnswer = Number((h / b) + c);
                break;
            case 39:
                correctAnswer = Number((h + g + a) * b);
                break;
            case 40:
                correctAnswer = Number(b * h + g);
                break;
            case 41:
                correctAnswer = Number(h - b + g);
                break;
            case 42:
                correctAnswer = Number(b * (g + h));
                break;
            case 43:
                correctAnswer = Number(h % b + g);
                break;
            case 44:
                correctAnswer = Number(b + c * g);
                break;
            case 45:
                correctAnswer = Number((h - b) + g);
                break;
            case 46:
                correctAnswer = Number(b ** 2 + g);
                break;
            case 47:
                correctAnswer = Number(h / b + g);
                break;
            case 48:
                correctAnswer = i + ' ' + d;
                break;
            case 49:
                correctAnswer = e + ' ' + f;
                break;
            case 50:
                correctAnswer = i + ' ' + e;
                break;
            case 51:
                correctAnswer = Number((b + g) ** 2);
                break;
            case 52:
                correctAnswer = Number(a * (b + c));
                break;
            case 53:
                correctAnswer = Number((h - b) * a);
                break;
            case 54:
                correctAnswer = Number((c + a) * b);
                break;
            case 55:
                correctAnswer = Number((a + b + c) * b);
                break;
            case 56:
                correctAnswer = Number((h + g + a) * b);
                break;
            case 57:
                correctAnswer = Number(b + g * h ** 2);
                break;
            case 58:
                correctAnswer = Number((b + g * h) ** 2);
                break;
            case 59:
                correctAnswer = Number(h ** 2 + b * g);
                break;
            case 60:
                correctAnswer = Number((h + b) ** 2);
                break;
            case 61:
                correctAnswer = Number(b * h ** g);
                break;
            case 62:
                correctAnswer = Number((h - b) ** 2);
                break;
            case 63:
                correctAnswer = Number(h ** (b % 3));
                break;
            case 64:
                correctAnswer = Number((b + g + h) ** 2);
                break;
            case 65:
                correctAnswer = Number(b * (h % 5) + g);
                break;
            case 66:
                correctAnswer = Number((h ** 2) % b);
                break;
            case 67:
                correctAnswer = Number((b + g * h) % b);
                break;
            case 68:
                correctAnswer = Number((h + b * g) ** 2);
                break;
            case 69:
                correctAnswer = Number(h ** 2 + b ** 2);
                break;
            case 70:
                correctAnswer = Number((b * h + g) % h);
                break;
            case 71:
                correctAnswer = Number((h + b) * (g + 1));
                break;
            case 72:
                correctAnswer = Number((b + g) * (h % 5));
                break;
            case 73:
                correctAnswer = (h ** 2 + b) % g;
                break;
            case 74:
                correctAnswer = Number((b * h) ** 2);
                break;
            case 75:
                correctAnswer = Number((h + b * g) % 7);
                break;
            default:
                console.log("Oops.");
                incorrectCount++;
                return;
        }

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

            score = correctCount;
            tier = getTier(score);

            console.log(`${tier.label} ${tier.emoji}`);
            console.log(tier.description);

            console.log("\nCorrect Questions:");
            console.log(correctQuestions);

            console.log("\nIncorrect Questions:");
            console.log(incorrectQuestions);

            saveScore(currentUser, correctCount, highStreak, tier.label, () => {
                // leaderboard
                scores.sort((a, b) => b.score - a.score);
                top5 = scores.slice(0, 5);

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

        countdown = setInterval(() => {
            process.stdout.write(`\rTime left: ${chalk.red(timeLeft + "s")}   `);

            timeLeft--;

            if (timeLeft < 0) {
                clearInterval(countdown);

                if (!answered) {
                    answered = true;
                    console.log("Time's up!");

                    incorrectCount++;
                    incorrectQuestions.push(questionObj.text);

                    setTimeout(() => {
                        askQuestions();
                    }, 1500);
                }
            }
        }, 1000);
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
        let level = readLine.question("Choose difficulty (easy, medium, hard): ", function (level) {

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
import readline from "readline";
import chalk from "chalk";
import { writeFile, readFile } from "node:fs";


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
        12: { text: "i + ' ' + d?", level: "easy" },
        13: { text: "e + ' ' + f?", level: "easy" },
        14: { text: "i + ' ' + e?", level: "easy" },
        15: { text: "a + a?", level: "easy" },
        16: { text: "b * c?", level: "medium" },
        17: { text: "h / b?", level: "medium" },
        18: { text: "h % b?", level: "medium" },
        19: { text: "b + c + a?", level: "medium" },
        20: { text: "c - a?", level: "medium" },
        21: { text: "h / (b + g)?", level: "medium" },
        22: { text: "a * b?", level: "medium" },
        23: { text: "c * b?", level: "medium" },
        24: { text: "h + a?", level: "medium" },
        25: { text: "c + h?", level: "medium" },
        26: { text: "b + g + h?", level: "medium" },
        27: { text: "a + b + c?", level: "medium" },
        28: { text: "h - a?", level: "medium" },
        29: { text: "c / b?", level: "medium" },
        30: { text: "g + h + b?", level: "medium" },
        31: { text: "b + g * h?", level: "hard" },
        32: { text: "(b + g) ** 2?", level: "hard" },
        33: { text: "h + a * b?", level: "hard" },
        34: { text: "(h + a) * b?", level: "hard" },
        35: { text: "a * (b + c)?", level: "hard" },
        36: { text: "h / (b + g)?", level: "hard" },
        37: { text: "a * b + c?", level: "hard" },
        38: { text: "c + b * h?", level: "hard" },
        39: { text: "(h - b) * a?", level: "hard" },
        40: { text: "(c + a) * b?", level: "hard" },
        41: { text: "h * b + a?", level: "hard" },
        42: { text: "a + b * c?", level: "hard" },
        43: { text: "(a + b + c) * b?", level: "hard" },
        44: { text: "(h / b) + c?", level: "hard" },
        45: { text: "(h + g + a) * b?", level: "hard" },
    };

    // print instructions
    console.log('----------------------------------------------------------------------------------');
    console.log('Welcome to Math Mayhem');
    console.log('You will be given 10 questions.');
    console.log('You have 10 seconds per question.');
    console.log('8 and above pass. 7 and below fail.');
    console.log('---------------------------------------------------------------------------------- \n');

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
    let shuffle = [];
    let correctCount = 0;
    let incorrectCount = 0;
    let index = 0;
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
    let timeLeft = 10;
    let countdown;


    function getAnswer(choice, answer) {
        let correctAnswer;

        switch (choice) {
            case 1:
                correctAnswer = a + b;
                break;
            case 2:
                correctAnswer = Number(b * c);
                break;
            case 3:
                correctAnswer = h - a;
                break;
            case 4:
                correctAnswer = Number(c ** 2);
                break;
            case 5:
                correctAnswer = Number(h / b);
                break;
            case 6:
                correctAnswer = Number(h % b);
                break;
            case 7:
                correctAnswer = a + d;
                break;
            case 8:
                correctAnswer = e + ' ' + f;
                break;
            case 9:
                correctAnswer = Number(b + g * h);
                break;
            case 10:
                correctAnswer = Number((b + g) ** 2);
                break;
            case 11:
                correctAnswer = a - c;
                break;
            case 12:
                correctAnswer = b + c + a;
                break;
            case 13:
                correctAnswer = d + ' ' + e + ' ' + f;
                break;
            case 14:
                correctAnswer = h + a * b;
                break;
            case 15:
                correctAnswer = (h + a) * b;
                break;
            case 16:
                correctAnswer = g + a;
                break;
            case 17:
                correctAnswer = g + b + c;
                break;
            case 18:
                correctAnswer = c / b;
                break;
            case 19:
                correctAnswer = c % b;
                break;
            case 20:
                correctAnswer = a * b + c;
                break;
            case 21:
                correctAnswer = a * (b + c);
                break;
            case 22:
                correctAnswer = Number(h / (b + g));
                break;
            case 23:
                correctAnswer = i + ' ' + d;
                break;
            case 24:
                correctAnswer = i + ' ' + e + ' ' + f;
                break;
            case 25:
                correctAnswer = a + b + c + d;
                break;
            default:
                console.log("Oops.");
                incorrectCount++;
                return;
        }

        if (answer === correctAnswer) {
            console.log(chalk.green("✔") + " Correct.");
            // track correct answers
            correctCount++;
            // questions user got right
            correctQuestions.push(questions[choice].text);
        } else {
            console.log(chalk.red("✖") + ` Incorrect. Correct answer: ${correctAnswer}`);
            // track incorrect answers
            incorrectCount++;
            // questions user got wrong
            incorrectQuestions.push(questions[choice].text);
        }
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
        index = 0;
        answered = false;
        shuffle = shuffleQuestions(filteredEntries, 10);

        // clear timers
        clearTimeout(timer);
        clearTimeout(warningTimer);

        console.clear();
        console.log("....Start of New Game....");
    }

    function askQuestions() {
        console.clear();

        if (index >= shuffle.length) {
            clearInterval(countdown);
            clearTimeout(timer);
            clearTimeout(warningTimer);

            console.log("\n--------------------------------");
            console.log("We've come to the end! You got...");
            console.log(`Correct: ${correctCount}`);
            console.log(`Incorrect: ${incorrectCount}`);
            console.log("--------------------------------\n");

            if (correctCount >= 8) {
                console.log("Well Done! You Passed!");
            } else {
                console.log("I'm Sorry! You Failed!");
            }

            console.log("\nCorrect Questions:");
            console.log(correctQuestions);

            console.log("\nIncorrect Questions:");
            console.log(incorrectQuestions);

            saveScore(currentUser, correctCount, () => {
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

        // reset timer for each question
        timeLeft = 10;

        // clear any previous countdown
        clearInterval(countdown);

        let [questionKey, questionObj] = shuffle[index];
        index++;

        currentQuestion = questionKey;
        answered = false;

        process.stdout.write(`\nWhat is ${questionObj.text} `);
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
    function saveScore(user, score, callback) {

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
            scores.push({ user, score });

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

                console.log(`\nHighest Score is ${highest.user} : ${highest.score}`);

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

            filteredEntries = questionEntries.filter(([key, question]) => {
                return question.level === level;
            });

            shuffle = shuffleQuestions(filteredEntries, 10);
            
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
})();
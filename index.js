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
        1: "a + b?",
        2: "b * c?",
        3: "h - a?",
        4: "c ** 2?",
        5: "h / b?",
        6: "h % b?",
        7: "a + d?",
        8: "e + ' ' + f?",
        9: "b + g * h?",
        10: "(b + g) ** 2?",
        11: "a - c?",
        12: "b + c + a?",
        13: "d + ' ' + e + ' ' + f?",
        14: "h + a * b?",
        15: "(h + a) * b?",
        16: "g + a?",
        17: "g + b + c?",
        18: "c / b?",
        19: "c % b?",
        20: "a * b + c?",
        21: "a * (b + c)?",
        22: "h / (b + g)?",
        23: "i + ' ' + d?",
        24: "i + ' ' + e + ' ' + f?",
        25: "a + b + c + d?"
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

    let questionKeys = Object.keys(questions);
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
    let shuffle = shuffleQuestions(questionKeys, 10);
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

        if (answer == correctAnswer) {
            console.log(chalk.green("✔") + " Correct.");
            // track correct answers
            correctCount++;
            // questions user got right
            correctQuestions.push(questions[choice]);
        } else {
            console.log(chalk.red("✖") + ` Incorrect. Correct answer: ${correctAnswer}`);
            // track incorrect answers
            incorrectCount++;
            // questions user got wrong
            incorrectQuestions.push(questions[choice]);
        }
    }

    // randomly shuffle the question array and returns the first 'num' items
    function shuffleQuestions(questionKeys, num) {
        const shuffled = [...questionKeys].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
    }

    function askQuestions() {
        console.clear();

        if (index >= shuffle.length) {
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

            saveScore(currentUser, correctCount);

            readLine.close();
            return;
        }

        // reset timer for each question
        timeLeft = 10;

        // clear any previous countdown
        clearInterval(countdown);

        let questionByKey = shuffle[index];
        index++;

        currentQuestion = questionByKey;
        answered = false;

        process.stdout.write(`\nWhat is ${questions[questionByKey]} `);
        console.log("");

        // start 5s timer
        // warningTimer = setTimeout(() => {
        //     console.log("\n" + chalk.red("You have 5 seconds left!"));
        // }, 5000);

        countdown = setInterval(() => {
            process.stdout.write(`\rTime left: ${chalk.red(timeLeft + "s")}   `);

            timeLeft--;

            if (timeLeft < 0) {
                clearInterval(countdown);

                if (!answered) {
                    answered = true;
                    console.log("Time's up!");

                    incorrectCount++;
                    incorrectQuestions.push(questions[questionByKey]);

                    setTimeout(() => {
                        askQuestions();
                    }, 1500);
                }
            }
        }, 1000);

        // start 10s timer
        // timer = setTimeout(() => {
        //     if (!answered) {
        //         answered = true;
        //         console.log("Time's up!");

        //         incorrectCount++;
        //         incorrectQuestions.push(questions[questionByKey]);

        //         setTimeout(() => {
        //             askQuestions();
        //         }, 1500);
        //     }
        // }, 10000);
    }

    // save user score
    function saveScore(user, score) {

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
            })
        });
    }

    // loop through questions & listen for user input
    readLine.on("line", (givenAnswer) => {
        if (answered) return;

        answered = true;

        // stop timer if user answer in time
        if (timer) {
            clearTimeout(timer);
            clearTimeout(warningTimer);
        }

        getAnswer(Number(currentQuestion), givenAnswer);

        setTimeout(() => {
            askQuestions();
        }, 1500);
    });

    // get user input (yes or no)
    readLine.question("\nDo you wish to continue? (Type 'yes' or 'no'). \n", function (userAnswer) {

        if (userAnswer.toLowerCase() == 'yes') {
            // get user name
            readLine.question("\nWhat is your name? ", function (name) {
                currentUser = name;

                console.log("\nWelcome " + currentUser);

                askQuestions();
            });
        } else {
            readLine.close();
        }
    });
})();

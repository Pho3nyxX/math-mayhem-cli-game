import readline from "readline";
import chalk from "chalk";

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
        10: "(b + g) ** 2?"
    };

    // print instructions
    console.log('----------------------------------------------------------------------------------');
    console.log('Welcome to Math Mayhem');
    console.log('You will be given 10 questions.');
    console.log('You have 10 seconds per question.');
    console.log('8 and above pass. 7 and below fail');
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
    let answered = false;
    let currentQuestion;
    let correctQuestions = [];
    let incorrectQuestions = [];

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
            default:
                console.log("Oops.");
                incorrectCount++;
                return;
        }

        if (answer == correctAnswer) {
            console.log(chalk.green("✔") + " Correct.");
            // track correct answers
            correctCount++;
            correctQuestions.push(questions[choice]);
        } else {
            console.log(chalk.red("✖") + " Incorrect.");
            // track incorrect answers
            incorrectCount++;
            incorrectQuestions.push(questions[choice]);
        }
    }

    function askQuestions() {
        if (index >= questionKeys.length) {
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

            readLine.close();
            return;
        }

        let questionByKey = questionKeys[index];
        index++;

        currentQuestion = questionByKey;
        answered = false;

        process.stdout.write(`\nWhat is ${questions[questionByKey]} `);

        // start 10s timer
        timer = setTimeout(() => {
            if (!answered) {
                console.log("Time's up!");
                incorrectCount++;
                incorrectQuestions.push(questions[questionByKey]);
                askQuestions();
            }
        }, 10000);
    }

    // loop through questions & listen for user input
    readLine.on("line", (givenAnswer) => {
        if (answered) return;

        answered = true;

        // stop timer if user answer in time
        clearTimeout(timer);

        getAnswer(Number(currentQuestion), givenAnswer);

        askQuestions();
    });

    // get user input (yes or no)
    readLine.question("\nDo you wish to continue? (Type 'yes' or 'no'). \n", function (userAnswer) {

        if (userAnswer.toLowerCase() == 'yes') {
            askQuestions();
        } else {
            readLine.close();
        }
    });
})();

import chalk from "chalk";
import chalkAnimation from 'chalk-animation';
import gradient from 'gradient-string';
import inquirer from 'inquirer';
import { input, select, Separator } from '@inquirer/prompts';
import { createSpinner } from 'nanospinner'
import figlet from "figlet";
import { writeFile, readFile } from "node:fs";
import { scoreTiers } from "./scoreTiers.js";


(async function () {

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

    const variablesBox = `
╔══════════════════╗
║    VARIABLES     ║
╠══════════════════╣
║ a = ${String(a).padEnd(13)}║
║ b = ${String(b).padEnd(13)}║
║ c = ${String(c).padEnd(13)}║
║ d = ${String(d).padEnd(13)}║
║ e = ${String(e).padEnd(13)}║
║ f = ${String(f).padEnd(13)}║
║ g = ${String(g).padEnd(13)}║
║ h = ${String(h).padEnd(13)}║
║ i = ${String(i).padEnd(13)}║
╚══════════════════╝
    `;

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
    let baseTime = 10;
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

    // organize questions into difficulty-based groups
    for (const [key, question] of Object.entries(questions)) {
        if (question.level === "easy") {
            easyQuestion.push([key, question]);
        } else if (question.level === "medium") {
            mediumQuestion.push([key, question]);
        } else if (question.level === "hard") {
            hardQuestion.push([key, question]);
        }
    }

    const sleep = (ms = 1000) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // ============== helper functions start ===============
    // calculate remaining time based on correct answers and difficulty
    function updateTime() {
        return baseTime
            - (correct.easy * timeDecrease.easy)
            - (correct.medium * timeDecrease.medium)
            - (correct.hard * timeDecrease.hard);
    }

    // determine player rank based on final score
    function getTier(score) {
        return scoreTiers.find(
            tier => score >= tier.min && score <= tier.max
        );
    }

    // validate answer and update player stats
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

    // adjust difficulty based on player performance
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

    // select a random question from the current difficulty level
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

    // randomly select questions from a difficulty group
    function shuffleQuestions(entries, num) {
        const shuffled = [...entries].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
    }

    // reset game stats and prepare for a new round
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

    // save player results and update leaderboard
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
    ${gradient.rainbow("╔════════════════════════════╗")}
    ${gradient.rainbow("     🏆 HIGHEST SCORE 🏆")}
    ${gradient.rainbow("╚════════════════════════════╝")}
    
    ${chalk.bold.yellow("👤 User:")} ${highest.user}
    ${chalk.bold.green("🏆 Score:")} ${highest.score}
    ${chalk.bold.cyan("🔥 Best Streak:")} ${highest.highStreak}
                `);

                callback();
            })
        });
    }

    function displayBanner(title, gradientStyle = gradient.pastel) {
        console.log(
            gradientStyle(
                figlet.textSync(title, {
                    horizontalLayout: "default"
                })
            )
        );
    }

    async function revealResults() {
        const spinner = createSpinner(
            "Calculating final score..."
        ).start();

        await new Promise(resolve => setTimeout(resolve, 2000));

        spinner.success({
            text: "Results calculated!"
        });
    }

    function displayStats(correct, incorrect) {
        console.log(`
    ${gradient.morning("╔════════════════════════════╗")}
    ${gradient.morning("         FINAL STATS")}
    ${gradient.morning("╚════════════════════════════╝")}

    ${chalk.bold.green("✔")} ${gradient.morning(`Correct Answers : ${correct}`)}
    ${chalk.bold.red("✖")} ${gradient.morning(`Incorrect       : ${incorrect}`)}
        `);
    }

    function displayRank(level) {
        console.log(
            chalk.yellow(`
    ${chalk.yellow("╔════════════════════════════╗")}
    ${chalk.yellow("        🏅 PLAYER RANK")}
    ${chalk.yellow("╚════════════════════════════╝")}

    ${level.emoji.padEnd(3)}${chalk.bold(level.label)}

    ${level.description}
            `)
        );
    }

    function displayQuestions(correct, incorrect) {

        console.log(chalk.green(`\n✔ CORRECT QUESTIONS\n`));

        correct.forEach((question, questionIndex) => {
            console.log(`  ${questionIndex + 1}. ${question}`);
        });

        console.log(chalk.red(`\n✖ MISSED QUESTIONS\n`));

        incorrect.forEach((question, questionIndex) => {
            console.log(`  ${questionIndex + 1}. ${question}`);
        });
    }

    function displayLeaderboard(players) {
        console.log(`
    ${gradient.rainbow("╔════════════════════════════╗")}
    ${gradient.rainbow("       🏆 LEADERBOARD")}
    ${gradient.rainbow("╚════════════════════════════╝")}
            `);

        const medals = ["🥇", "🥈", "🥉"];

        players.forEach((player, index) => {
            const medal = medals[index] ?? "🏅";

            console.log(
                `    ${medal} ${chalk.bold.yellow(player.user.padEnd(10))} ${chalk.bold.green(player.score)}pts`
            );
        });
    }

    async function showFinalResults() {
        const score = correctCount;
        const tier = getTier(score);
        const passed = score >= 15;

        const titleMessage = passed ? "YOU PASSED" : "YOU FAILED";

        const titleGradient = passed
            ? gradient.rainbow
            : gradient.passion;

        displayBanner(titleMessage, titleGradient);

        console.log(
            chalk.bold(
                passed
                    ? `\n🎉 Congrats ${currentUser}!\n`
                    : `\n☹️ Sorry ${currentUser}!\n`
            )
        );

        await revealResults();

        displayStats(correctCount, incorrectCount);
        displayRank(tier);
        displayQuestions(correctQuestions, incorrectQuestions);

        saveScore(currentUser, score, highStreak, tier.label, async () => {
            scores.sort((a, b) => b.score - a.score);
            let top5 = scores.slice(0, 5);

            displayLeaderboard(top5);

            const playAgain = await safeSelect({
                message: "\nDo you wish to play again?",
                choices: [
                    { name: "Yes", value: true },
                    { name: "No", value: false }
                ]
            });

            if (playAgain) {
                resetGame();
                await startGame();
            } else {
                console.log(chalk.cyan("\nThanks for playing Math Mayhem! 🚀"));
                process.exit(0);
            }
        });
    }
    // ============== helper functions end ===============

    // ============== graceful exit helpers start ===========
    // cleanup function
    function cleanupAndExit() {
        console.log('\n👋 until next time!');

        clearInterval(countdown);
        clearTimeout(timer);
        clearTimeout(warningTimer);

        process.exit(0);
    }

    // safe input prompt
    async function safeInput(message) {
        try {
            return await input({ message });
        } catch (error) {
            if (error.name === 'ExitPromptError') {
                cleanupAndExit();
            }
            throw error;
        }
    }

    // safe select prompt
    async function safeSelect(config) {
        try {
            return await select(config);
        } catch (error) {
            if (error.name === 'ExitPromptError') {
                cleanupAndExit();
            }
            throw error;
        }
    }
    // ============== graceful exit helpers end ===============

    // print instructions
    async function showWelcomeMessage() {
        console.log('\n');

        console.log(
            gradient.morning(`                                 Welcome to\n`)
        );

        const title = figlet.textSync("MATH MAYHEM", {
            font: "ANSI Shadow",
            horizontalLayout: "default"
        });

        console.log(gradient.morning(title));

        console.log(
            gradient.morning(`                         Test Your Speed • Accuracy • IQ\n`)
        );

        console.log(chalk.bgCyan('GAME RULES:'));
        console.log(chalk.white('• You will be given ') + chalk.green.bold('20 questions.'));
        console.log(chalk.white('• Try to answer each question before the time runs out.'));
        console.log(chalk.white('• Score ') + chalk.green.bold('15 or higher') + chalk.white(' to PASS.'));
        console.log(chalk.white('• Score ') + chalk.red.bold('14 or lower') + chalk.white(' to FAIL.\n'));

        console.log(chalk.bgCyan('TIMER SYSTEM:'));
        console.log(chalk.white('• You start with ') + chalk.green.bold('50 seconds.'));
        console.log(chalk.white('• Each correct answer ') + chalk.green.bold('REDUCES your time.'));
        console.log(chalk.white('• The better you perform, the faster the game becomes!\n'));

        console.log(chalk.bgCyan('ADAPTIVE DIFFICULTY:'));
        console.log(chalk.white('• Get ') + chalk.green.bold('3 correct answers in a row') + chalk.white(' → Difficulty increases'));
        console.log(chalk.white('   EASY → MEDIUM → HARD'));
        console.log('');
        console.log(chalk.white('• Get ') + chalk.red.bold('2 wrong answers') + chalk.white(' → Difficulty decreases'));
        console.log(chalk.white('   HARD → MEDIUM → EASY\n'));

        console.log(chalk.bgCyan('DIFFICULTY BREAKDOWN:'));
        console.log(chalk.green('• EASY: ') + chalk.white('Simple arithmetic.'));
        console.log(chalk.blue('• MEDIUM: ') + chalk.white('Mixed problems.'));
        console.log(chalk.red('• HARD: ') + chalk.white('Complex / nested expressions.\n'));

        const animation = chalkAnimation.rainbow(
            "Stay sharp. Think fast. Adapt quickly.\n"
        );

        await sleep();
        animation.stop();

        console.log(chalk.yellow('==================================================================================\n'));
    };

    // start program
    await showWelcomeMessage();

    // prompt user to continue
    const promptYesOrNo = await safeSelect({
        message: 'Do you wish to continue?',
        choices: [
            {
                name: 'Yes',
                value: true
            },
            {
                name: 'No',
                value: false
            }
        ],
    });

    // handle user confirmation response
    if (promptYesOrNo) {
        const answer = await safeInput('What is your name?');
        currentUser = answer;

        console.log(`\nWelcome ${currentUser}\n`);
        await startGame();
    } else {
        cleanupAndExit();
    }

    // prompt user to select difficulty level
    async function startGame() {
        const level = await safeSelect({
            message: "Choose difficulty:",
            choices: [
                {
                    name: "Easy",
                    value: "easy"
                },
                {
                    name: "Medium",
                    value: "medium"
                },
                {
                    name: "Hard",
                    value: "hard"
                }
            ]
        });

        // set starting difficulty
        currentDifficulty = level;

        console.log(`\nStarting ${level.toUpperCase()} mode...\n`);

        setTimeout(() => {
            askQuestions();
        }, 1000);
    }

    // display questions, manage timer, and process user answers
    async function askQuestions() {
        console.clear();

        if (totalAsked >= maxQuestions) {
            clearInterval(countdown);
            clearTimeout(timer);
            clearTimeout(warningTimer);

            await showFinalResults();
            return;
        }

        // update timer
        timeLeft = updateTime();

        // prevent negative timer
        timeLeft = Math.max(3, timeLeft);

        clearInterval(countdown);
        clearTimeout(timer);
        clearTimeout(warningTimer);

        let [questionKey, questionObj] = getNextQuestion();

        totalAsked++;

        currentQuestion = questionKey;
        answered = false;

        // display question & variables
        let width = process.stdout.columns;

        let questionText = `\nWhat is ${questionObj.text}`;
        let currentTimerText = `Time left: ${timeLeft}s`;

        let variableLines = variablesBox.split("\n");

        // question
        console.log(questionText);

        // remaining variables
        for (let index = 1; index < variableLines.length; index++) {
            console.log(
                `${chalk.dim.cyan(variableLines[index])}`
            );
        }

        // start countdown timer
        countdown = setInterval(() => {
            process.stdout.write(
                `\rTime left: ${chalk.red(`${timeLeft}s`)}   `
            );

            timeLeft--;

            if (timeLeft < 0) {
                clearInterval(countdown);

                if (!answered) {
                    answered = true;

                    const animate = chalkAnimation.glitch("⏰ Time's up!");

                    setTimeout(() => {
                        animate.stop();
                        console.log();

                        incorrectCount++;
                        incorrectQuestions.push(questions[currentQuestion]);

                        askQuestions();
                    }, 1500);
                }
            }
        }, 1000);

        // warning timer
        if (timeLeft > 5) {
            warningTimer = setTimeout(() => {
                let warningText = "5 seconds left!";

                let width = process.stdout.columns;

                let space = Math.max(
                    1,
                    width - (currentTimerText.length + warningText.length)
                );

                process.stdout.write(
                    `\r${chalk.red(currentTimerText)}${" ".repeat(space)}${chalk.yellow(warningText)}`
                );

            }, (timeLeft - 5) * 1000);
        }

        // get user answer
        const givenAnswer = await safeInput("Your answer:");

        if (answered) return;

        answered = true;

        // stop timer after answer
        clearInterval(countdown);
        clearTimeout(timer);
        clearTimeout(warningTimer);

        getAnswer(Number(currentQuestion), givenAnswer);

        setTimeout(() => {
            askQuestions();
        }, 1500);
    }
})();
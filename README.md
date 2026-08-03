```text
███╗   ███╗ █████╗ ████████╗██╗  ██╗
████╗ ████║██╔══██╗╚══██╔══╝██║  ██║
██╔████╔██║███████║   ██║   ███████║
██║╚██╔╝██║██╔══██║   ██║   ██╔══██║
██║ ╚═╝ ██║██║  ██║   ██║   ██║  ██║
╚═╝     ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝

███╗   ███╗ █████╗ ██╗   ██╗██╗  ██╗███████╗███╗   ███╗
████╗ ████║██╔══██╗╚██╗ ██╔╝██║  ██║██╔════╝████╗ ████║
██╔████╔██║███████║ ╚████╔╝ ███████║█████╗  ██╔████╔██║
██║╚██╔╝██║██╔══██║  ╚██╔╝  ██╔══██║██╔══╝  ██║╚██╔╝██║
██║ ╚═╝ ██║██║  ██║   ██║   ██║  ██║███████╗██║ ╚═╝ ██║
╚═╝     ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝     ╚═╝
```

# CLI Game

Math Mayhem is a command-line mathematics game built with **Node.js**. Players solve randomly generated arithmetic and expression-based questions while racing against a countdown timer. The game adapts to the player's performance by increasing or decreasing difficulty dynamically.

The goal is simple:

- Answer quickly.
- Maintain streaks.
- Survive increasing difficulty.
- Score **15 or higher** to pass.

---

## Features

- Timed Question System .
    - players answer **20 questions** per game.
    - each question has a countdown timer.
    - running out of time counts as an incorrect answer.
    - the faster you perform, the harder the game becomes.
- Difficulty Levels
    - easy:
        - Basic arithmetic
        - Addition
        - Subtraction
        - Multiplication
        - Division
    - medium
        - Multiple operations
        - Operator precedence
        - Exponents
        - String concatenation
    - hard
        - Nested expressions
        - Powers
        - Modulus operations
        - Complex calculations
- Adaptive Difficulty System
    - difficulty increases
        - if player gets 3 correct answers in a row
    - difficulty decreases
        - if player gets 2 wrong answers in a row
- Dynamic Timer System
    - The game starts with: 50 seconds
- Streak System   
- Sound Effects   
- Scoring System   
- Ranking System   
- Leaderboard   

--- 

## Getting Started

**1. Clone the repository:**
```bash
git clone https://github.com/<your-username>/math-mayhem-cli-game.git
```
**2. Navigate into the project folder:**
```bash
cd math-mayhem-cli-game
```
**3. Install dependencies:**
```bash
npm install
```
**4. Install Audio Player:**  
Math Mayhem uses mpv to play sounds.   
Install mpv:   
**Ubuntu/Linux**
```bash
sudo apt install mpv
```
**Windows**
```bash
mpv player
```
**5. Running the game:**  
```bash
node index.js
```
---


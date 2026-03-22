document.addEventListener('DOMContentLoaded', () => {
    // Screens
    const landingScreen = document.getElementById('landing-screen');
    const gameScreen = document.getElementById('game-screen');

    // Buttons
    const startEasyBtn = document.getElementById('start-easy-btn');
    const startHardBtn = document.getElementById('start-hard-btn');
    const nextBtn = document.getElementById('next-btn');
    const exitBtn = document.getElementById('exit-btn');

    // Game Elements
    const equationEl = document.getElementById('equation');
    const answerInput = document.getElementById('answer-input');
    const feedbackMsg = document.getElementById('feedback-msg');
    const correctDisplay = document.getElementById('correct-answer-display');
    const scoreEl = document.getElementById('score-count');
    const totalEl = document.getElementById('total-count');
    const highScoreEl = document.getElementById('highscore-count');

    let currentProblem = null;
    let score = 0;
    let total = 0;
    let isWaiting = false;
    let difficulty = 'hard';
    let highScore = localStorage.getItem('mentalMathHighScore') || 0;
    
    highScoreEl.textContent = highScore;

    // --- Math Generation logic ---

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function generateDigits(digits) {
        const min = Math.pow(10, digits - 1);
        const max = Math.pow(10, digits) - 1;
        return getRandomInt(min, max);
    }

    function generateProblem() {
        const ops = ['+', '-', '*', '/'];
        const op = ops[getRandomInt(0, ops.length - 1)];
        let a, b, result, equationStr;

        switch (op) {
            case '+':
                if (difficulty === 'easy') {
                    a = generateDigits(getRandomInt(1, 2));
                    b = generateDigits(getRandomInt(1, 2));
                } else {
                    a = generateDigits(getRandomInt(1, 4));
                    b = generateDigits(getRandomInt(1, 4));
                }
                result = a + b;
                equationStr = `${a} + ${b}`;
                break;
            case '-':
                if (difficulty === 'easy') {
                    a = generateDigits(getRandomInt(1, 2));
                    b = generateDigits(getRandomInt(1, 2));
                } else {
                    a = generateDigits(getRandomInt(1, 4));
                    b = generateDigits(getRandomInt(1, 4));
                }
                // Ensure positive result for simplicity
                if (a < b) [a, b] = [b, a];
                result = a - b;
                equationStr = `${a} - ${b}`;
                break;
            case '*':
                if (difficulty === 'easy') {
                    a = generateDigits(1);
                    b = generateDigits(2);
                    if (Math.random() > 0.5) [a, b] = [b, a];
                } else {
                    const d1 = getRandomInt(1, 3);
                    const d2 = (d1 === 3) ? getRandomInt(1, 2) : getRandomInt(1, 3);
                    a = generateDigits(d1);
                    b = generateDigits(d2);
                }
                result = a * b;
                equationStr = `${a} × ${b}`;
                break;
            case '/':
                if (difficulty === 'easy') {
                    b = generateDigits(1); // divisor 1 digit
                    const minResult = Math.ceil(10 / b);
                    const maxResult = Math.floor(99 / b); // dividend max 99
                    a = getRandomInt(Math.max(1, minResult), maxResult);
                } else {
                    const divisorDigits = getRandomInt(1, 2);
                    b = generateDigits(divisorDigits);
                    const minResult = Math.ceil(10 / b);
                    const maxResult = Math.floor(99999 / b);
                    a = getRandomInt(Math.max(1, minResult), maxResult);
                }
                const dividend = a * b;
                result = a;
                equationStr = `${dividend} ÷ ${b}`;
                break;
        }

        return { equation: equationStr, answer: result };
    }

    // --- Game Flow ---

    function startGame(level) {
        difficulty = level;
        score = 0;
        total = 0;
        updateStats();
        landingScreen.classList.remove('active');
        gameScreen.classList.add('active');
        newQuestion();
    }

    function newQuestion() {
        isWaiting = false;
        currentProblem = generateProblem();
        equationEl.textContent = currentProblem.equation;
        answerInput.value = '';
        feedbackMsg.textContent = '';
        feedbackMsg.className = 'feedback-area';
        correctDisplay.textContent = '';
        nextBtn.classList.add('hidden');
        answerInput.disabled = false;
        answerInput.focus();
    }

    function handleSubmission() {
        if (isWaiting || answerInput.value === '') return;
        
        const userAnswer = parseInt(answerInput.value);
        total++;
        isWaiting = true;
        answerInput.disabled = true;

        if (userAnswer === currentProblem.answer) {
            score++;
            if (score > highScore) {
                highScore = score;
                localStorage.setItem('mentalMathHighScore', highScore);
                highScoreEl.textContent = highScore;
            }
            feedbackMsg.textContent = 'Chính xác!';
            feedbackMsg.className = 'feedback-msg feedback-success';
            setTimeout(newQuestion, 2000);
        } else {
            feedbackMsg.textContent = 'Trả lời sai!';
            feedbackMsg.className = 'feedback-msg feedback-error';
            correctDisplay.textContent = `Đáp án đúng là: ${currentProblem.answer}`;
            nextBtn.classList.remove('hidden');
            nextBtn.focus();
        }
        updateStats();
    }

    function updateStats() {
        scoreEl.textContent = score;
        totalEl.textContent = total;
    }

    // --- Events ---

    startEasyBtn.addEventListener('click', () => startGame('easy'));
    startHardBtn.addEventListener('click', () => startGame('hard'));

    answerInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSubmission();
    });

    nextBtn.addEventListener('click', newQuestion);

    exitBtn.addEventListener('click', () => {
        gameScreen.classList.remove('active');
        landingScreen.classList.add('active');
    });

    startEasyBtn.focus();
});

document.addEventListener('DOMContentLoaded', () => {
    // Screens
    const landingScreen = document.getElementById('landing-screen');
    const gameScreen = document.getElementById('game-screen');

    // Buttons
    const startBtn = document.getElementById('start-btn');
    const nextBtn = document.getElementById('next-btn');
    const exitBtn = document.getElementById('exit-btn');

    // Game Elements
    const equationEl = document.getElementById('equation');
    const answerInput = document.getElementById('answer-input');
    const feedbackMsg = document.getElementById('feedback-msg');
    const correctDisplay = document.getElementById('correct-answer-display');
    const scoreEl = document.getElementById('score-count');
    const totalEl = document.getElementById('total-count');

    let currentProblem = null;
    let score = 0;
    let total = 0;
    let isWaiting = false;

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
                a = generateDigits(getRandomInt(1, 4));
                b = generateDigits(getRandomInt(1, 4));
                result = a + b;
                equationStr = `${a} + ${b}`;
                break;
            case '-':
                a = generateDigits(getRandomInt(1, 4));
                b = generateDigits(getRandomInt(1, 4));
                // Ensure positive result for simplicity, or just allow negative
                if (a < b) [a, b] = [b, a];
                result = a - b;
                equationStr = `${a} - ${b}`;
                break;
            case '*':
                // 1-3 digits, but not both 3 digits
                const d1 = getRandomInt(1, 3);
                const d2 = (d1 === 3) ? getRandomInt(1, 2) : getRandomInt(1, 3);
                a = generateDigits(d1);
                b = generateDigits(d2);
                result = a * b;
                equationStr = `${a} × ${b}`;
                break;
            case '/':
                // Dividend 2-5 digits, Divisor 1-2 digits
                // Better approach: Generate divisor and result, then multiply to get dividend
                const divisorDigits = getRandomInt(1, 2);
                b = generateDigits(divisorDigits);
                
                // We want a * b (dividend) to be 10 - 99999
                // so a (result) should be between 10/b and 99999/b
                const minResult = Math.ceil(10 / b);
                const maxResult = Math.floor(99999 / b);
                a = getRandomInt(Math.max(1, minResult), maxResult);
                
                const dividend = a * b;
                result = a;
                equationStr = `${dividend} ÷ ${b}`;
                break;
        }

        return { equation: equationStr, answer: result };
    }

    // --- Game Flow ---

    function startGame() {
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

    startBtn.addEventListener('click', startGame);

    answerInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSubmission();
    });

    nextBtn.addEventListener('click', newQuestion);

    exitBtn.addEventListener('click', () => {
        gameScreen.classList.remove('active');
        landingScreen.classList.add('active');
    });

    startBtn.focus();
});

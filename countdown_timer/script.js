let timerInterval;
let countDownDate;

// Initialize the timer display
function initializeTimer() {
    document.getElementById('timer').innerHTML = `
        <div class="tile"><div class="front">0</div><div class="back">0</div></div>
        <div class="tile"><div class="front">0</div><div class="back">0</div></div>
        <span>:</span>
        <div class="tile"><div class="front">0</div><div class="back">0</div></div>
        <div class="tile"><div class="front">0</div><div class="back">0</div></div>
        <span>:</span>
        <div class="tile"><div class="front">0</div><div class="back">0</div></div>
        <div class="tile"><div class="front">0</div><div class="back">0</div></div>
    `;
}

// Update the tiles with a flip animation
function updateTile(tile, value) {
    const front = tile.querySelector('.front');
    const back = tile.querySelector('.back');
    if (front.innerText !== value) {
        back.innerText = value;
        tile.classList.add('flipped');
        setTimeout(() => {
            front.innerText = value;
            tile.classList.remove('flipped');
        }, 600);
    }
}

// Update the timer display
function updateTimerDisplay(days, hours, minutes, seconds) {
    const timerTiles = document.querySelectorAll('#timer .tile');
    const timeString = `${String(days).padStart(2, '0')}${String(hours).padStart(2, '0')}${String(minutes).padStart(2, '0')}${String(seconds).padStart(2, '0')}`;
    timeString.split('').forEach((char, index) => {
        updateTile(timerTiles[index], char);
    });
}

// Start the countdown timer
function startCountdown(targetDate) {
    countDownDate = targetDate;
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = countDownDate - now;
        if (distance < 0) {
            clearInterval(timerInterval);
            initializeTimer();
            return;
        }
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        updateTimerDisplay(days, hours, minutes, seconds);
    }, 1000);
}

// Handle form submission
document.getElementById('countdownForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const timezone = document.getElementById('timezone').value;
    if (!date || !time || !timezone) {
        alert('Please fill out all fields.');
        return;
    }
    const targetDate = new Date(`${date}T${time}:00.000${timezone}`).getTime();
    startCountdown(targetDate);
});

// Handle reset button
document.getElementById('resetButton').addEventListener('click', function() {
    clearInterval(timerInterval);
    initializeTimer();
});

// Handle time adjustment buttons
document.querySelectorAll('.adjustButton').forEach(button => {
    button.addEventListener('click', function() {
        const minutes = parseInt(this.dataset.minutes);
        countDownDate += minutes * 60 * 1000;
    });
});

// Initialize the timer on page load
initializeTimer();

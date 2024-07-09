document.getElementById('countdownForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get the input values
    let date = document.getElementById('date').value;
    let time = document.getElementById('time').value;
    let timezone = document.getElementById('timezone').value;

    if (!date || !time || !timezone) {
        alert('Please fill out all fields.');
        return;
    }

    // Combine date and time
    let countDownDate = new Date(`${date}T${time}:00.000${timezone}`).getTime();

    // Update the countdown every 1 second
    let x = setInterval(function() {
        // Get current date and time
        let now = new Date().getTime();

        // Calculate the distance between now and the countdown date
        let distance = countDownDate - now;

        // Time calculations for days, hours, minutes, and seconds
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="timer"
        document.getElementById('timer').innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

        // If the countdown is over, stop the timer
        if (distance < 0) {
            clearInterval(x);
            document.getElementById('timer').innerHTML = 'EXPIRED';
        }
    }, 1000);
});

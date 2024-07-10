function updateTime() {
    const now = new Date();
    const timeElement = document.getElementById('time');
    const dateElement = document.getElementById('date');
    const timezoneElement = document.getElementById('timezone');

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = now.toLocaleDateString(undefined, options);

    const timezoneString = Intl.DateTimeFormat().resolvedOptions().timeZone;

    timeElement.textContent = timeString;
    dateElement.textContent = dateString;
    timezoneElement.textContent = `Timezone: ${timezoneString}`;
}

setInterval(updateTime, 1000);
updateTime();

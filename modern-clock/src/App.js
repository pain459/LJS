import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = String(time.getHours()).padStart(2, '0');
  const minutes = String(time.getMinutes()).padStart(2, '0');
  const seconds = String(time.getSeconds()).padStart(2, '0');
  const timeString = `${hours}:${minutes}:${seconds}`;

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateString = time.toLocaleDateString(undefined, options);

  const timezoneString = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <div className="container">
      <div className="time">{timeString}</div>
      <div className="date">{dateString}</div>
      <div className="timezone">Timezone: {timezoneString}</div>
    </div>
  );
}

export default App;

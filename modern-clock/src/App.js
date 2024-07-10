import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import moment from 'moment-timezone';
import './App.css';

function App() {
  const [time, setTime] = useState(new Date());
  const [theme, setTheme] = useState('dark');
  const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [alarms, setAlarms] = useState([]);
  const [alarmTime, setAlarmTime] = useState('');
  const [timer, setTimer] = useState('');
  const [timerRunning, setTimerRunning] = useState(false);
  const [remainingTime, setRemainingTime] = useState(null);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    let interval;
    if (timerRunning && remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime(prev => prev - 1);
      }, 1000);
    } else if (remainingTime === 0) {
      setTimerRunning(false);
      setRemainingTime(null);
      alert('Timer finished!');
    }
    return () => clearInterval(interval);
  }, [timerRunning, remainingTime]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const addAlarm = () => {
    if (alarmTime) {
      setAlarms([...alarms, alarmTime]);
      setAlarmTime('');
    }
  };

  const startTimer = () => {
    const timeInSeconds = parseInt(timer, 10);
    if (timeInSeconds > 0 && timeInSeconds <= 3600) {
      setRemainingTime(timeInSeconds);
      setTimerRunning(true);
      setTimer('');
    }
  };

  const clearTimer = () => {
    setTimer('');
    setTimerRunning(false);
    setRemainingTime(null);
  };

  const { opacity } = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 }
  });

  const timeString = moment(time).format('HH:mm:ss');
  const dateString = moment(time).format('dddd, MMMM Do YYYY');
  const timezones = moment.tz.names();

  return (
    <animated.div className={`container ${theme}`} style={{ opacity }}>
      <div className="header">
        <button onClick={toggleTheme}>Toggle Theme</button>
      </div>
      <div className="time">{timeString}</div>
      <div className="date">{dateString}</div>
      <div className="timezone">Timezone: {timezone}</div>
      <select onChange={e => setTimezone(e.target.value)} value={timezone}>
        {timezones.map(tz => (
          <option key={tz} value={tz}>{tz}</option>
        ))}
      </select>
      <div className="alarms">
        <h2>Alarms</h2>
        <input
          type="time"
          value={alarmTime}
          onChange={e => setAlarmTime(e.target.value)}
        />
        <button onClick={addAlarm}>Add Alarm</button>
        <ul>
          {alarms.map((alarm, index) => (
            <li key={index}>{alarm}</li>
          ))}
        </ul>
      </div>
      <div className="timer">
        <h2>Timer</h2>
        <input
          type="number"
          value={timer}
          onChange={e => {
            const value = parseInt(e.target.value, 10);
            if (!isNaN(value) && value <= 3600) setTimer(e.target.value);
          }}
          max="3600"
          placeholder="Enter seconds (max 3600)"
        />
        <button onClick={startTimer}>Start Timer</button>
        <button onClick={clearTimer}>Clear Timer</button>
        {remainingTime !== null && (
          <div>
            Time remaining: {Math.floor(remainingTime / 60)}:{String(remainingTime % 60).padStart(2, '0')}
          </div>
        )}
      </div>
    </animated.div>
  );
}

export default App;

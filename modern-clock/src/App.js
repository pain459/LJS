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
  const [timer, setTimer] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    if (timerRunning && timer > 0) {
      const timerId = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timerId);
    } else if (timer === 0) {
      setTimerRunning(false);
      alert('Timer finished!');
    }
  }, [timerRunning, timer]);

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
    if (timer > 0) {
      setTimerRunning(true);
    }
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
          onChange={e => setTimer(parseInt(e.target.value))}
        />
        <button onClick={startTimer}>Start Timer</button>
      </div>
    </animated.div>
  );
}

export default App;

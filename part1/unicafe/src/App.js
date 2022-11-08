import { useState } from 'react';

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const Heading = ( {text} ) => <h1>{text}</h1>

const StatisticLine = ( {name, value} ) => <tr><td>{name}</td><td>{value}</td></tr>

const Statistics = ( {good, neutral, bad} ) => {
  const all = () => good+neutral+bad;
  
  const average = () => ((1*good)+(0*neutral)+(-1*bad))/all();
  
  const percGood = () => (good/(all()/100)) + " %";
  
  if (all() === 0) {
    return (
      <div>
      <Heading text='statistics' />
      <p>No feedback given</p>
      </div>
    );
  }
  
  return (
    <div>
    <Heading text='statistics' />
    <table>
      <tbody>
        <StatisticLine name='good' value={good} />
        <StatisticLine name='neutral' value={neutral} />
        <StatisticLine name='bad' value={bad} />
        <StatisticLine name='all' value={all()} />
        <StatisticLine name='average' value={average()} />
        <StatisticLine name='positive' value={percGood()} />
      </tbody>
    </table>
    </div>
  );
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  
  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);
  

  return (
    <div>
      <Heading text='give feedback' />
      <Button handleClick={handleGoodClick} text='good'/>
      <Button handleClick={handleNeutralClick} text='neutral'/>
      <Button handleClick={handleBadClick} text='bad'/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

export default App;

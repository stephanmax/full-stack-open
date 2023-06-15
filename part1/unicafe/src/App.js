import { useState } from 'react';

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad;

  if (total > 0) {
    return <>
      <h1>Statistics</h1>
      <table>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={total} />
        <StatisticLine text="average" value={(good - bad) / total} />
        <StatisticLine text="positive" value={`${good / total * 100} %`} />
      </table>
    </>;
  }
  else {
    return <>
      <h1>Statistics</h1>
      <p>No feedback given</p>
    </>;
  }
};

const StatisticLine = ({text, value}) => {
  return <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>;
};

const Button = ({text, clickHandler}) => <button onClick={clickHandler}>{text}</button>;

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button text="Good" clickHandler={() => setGood(good + 1)} />
      <Button text="Neutral" clickHandler={() => setNeutral(neutral + 1)} />
      <Button text="Bad" clickHandler={() => setBad(bad + 1)} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;

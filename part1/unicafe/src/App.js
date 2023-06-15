import { useState } from 'react';

const Statistics = ({good, neutral, bad, total, avg, pos}) => {
  if (total > 0) {
    return (
      <table>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={total} />
        <StatisticLine text="average" value={avg} />
        <StatisticLine text="positive" value={pos} suffix="%" />
      </table>
    );
  }
  else {
    return <p>No feedback given</p>;
  }
};

const StatisticLine = ({text, value, suffix}) => {
  return <tr>
    <td>{text}</td>
    <td>{value} {suffix}</td>
  </tr>;
};

const Button = ({text, clickHandler}) => <button onClick={clickHandler}>{text}</button>;

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [avg, setAvg] = useState(0);
  const [pos, setPos] = useState(0);

  const handleClickGood = () => {
    const newGood = good + 1;
    setGood(newGood);
    calcStatistics(newGood, neutral, bad);
  }

  const handleClickNeutral = () => {
    const newNeutral = neutral + 1;
    setNeutral(newNeutral);
    calcStatistics(good, newNeutral, bad);
  }

  const handleClickBad = () => {
    const newBad = bad + 1;
    setBad(newBad);
    calcStatistics(good, neutral, newBad);
  }

  const calcStatistics = (good, neutral, bad) => {
    const total = good + neutral + bad;
    setTotal(total);
    setAvg((good - bad) / total);
    setPos(good / total * 100);
  };

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button text="Good" clickHandler={handleClickGood} />
      <Button text="Neutral" clickHandler={handleClickNeutral} />
      <Button text="Bad" clickHandler={handleClickBad} />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} avg={avg} pos={pos} />
    </div>
  );
};

export default App;

import { useState } from 'react';

const Anecdote = ({text, votes}) => (
  <>
    <p>{text}</p>
    <p>has {votes} votes</p>
  </>
);

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];
  const length = anecdotes.length;

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(length).fill(0));
  const [mostVoted, setMostVoted] = useState(0);

  const getRandomAnecdote = () => {
    while (true) {
      const newAnecdote = Math.floor(Math.random() * length);
      if (newAnecdote !== selected) {
        return newAnecdote;
      }
    }
  };

  const voteAnecdote = () => {
    const votesCopy = [...votes];
    votesCopy[selected] += 1;
    setVotes(votesCopy);
    if (votesCopy[selected] > votesCopy[mostVoted]) {
      setMostVoted(selected);
    }
  }

  return (
    <div>
      <h1>Anecdotes of the Day</h1>
      <Anecdote text={anecdotes[selected]} votes={votes[selected]} />
      <button onClick={voteAnecdote}>Vote</button>
      <button onClick={() => setSelected(getRandomAnecdote())}>Next Anecdote</button>
      <h1>Anecdote With Most Votes</h1>
      <Anecdote text={anecdotes[mostVoted]} votes={votes[mostVoted]} />
    </div>
  );
};

export default App;

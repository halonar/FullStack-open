import { useState } from 'react'

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const maxAnecdotes = anecdotes.length
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(maxAnecdotes).fill(0))
  console.log("MAX: ", maxAnecdotes)

  const setToSelected = newValue => {
    console.log('value now', newValue)
    setSelected(newValue)
  }

  function incrementPoints(index) {
    setPoints(prevPoints => {
      const newPoints = [...prevPoints];
      newPoints[index]++;     
      console.log('incr index now', index, 'points', newPoints)
      return newPoints;
    });
  }

  console.log(points)

  return (
    <>
      <div>
        <h1>Anecdote of the day</h1>
        <p>{anecdotes[selected]}</p>
        <p>has {points[selected]} votes</p>
      </div>
      <div>
        <Button handleClick={() => incrementPoints(selected)} text="vote" />
        <Button handleClick={() => setToSelected(getRandomInt(maxAnecdotes))} text="next" />
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
        <p>{anecdotes[points.indexOf(Math.max(...points))]}</p>
        <p>has {Math.max(...points)} votes</p>
      </div>
    </>
  )
}

export default App
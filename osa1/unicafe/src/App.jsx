import { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

// const StatisticLine = ({text, value}) => {
//   return (
//     <div>
//       <p>{text} {value}</p>
//     </div>
//   )
// }

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>no feedback given</p>
      </div>
    )
  }

  const roundToHundredths = num => {
    let roundedNum = Math.round(num * 100) / 100
    // force 2 decimal places
    return roundedNum.toFixed(2);
  }

  const average = roundToHundredths((good - bad) / (good + neutral + bad))
  const roundedPositive = roundToHundredths((good / (good + neutral + bad) * 100)) 
  const positive = `${roundedPositive} %` 

  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive} />
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGood = newValue => {
    console.log('value now', newValue)
    setGood(newValue)
  }

  const setToNeutral = newValue => {
    console.log('value now', newValue)
    setNeutral(newValue)
  }

  const setToBad = newValue => {
    console.log('value now', newValue)
    setBad(newValue)
  }

  return (
    <>
      <div>
        <h1>give feedback</h1>
        <Button handleClick={() => setToGood(good + 1)} text="good" />
        <Button handleClick={() => setToNeutral(neutral + 1)} text="neutral" />
        <Button handleClick={() => setToBad(bad + 1)} text="bad" />
      </div>
      <div>
        <Statistics good={good} neutral={neutral} bad={bad}/>
      </div>
    </>
  )
}

export default App
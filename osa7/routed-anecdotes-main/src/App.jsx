import { useState, useEffect } from "react";
import { Routes, Route, useMatch } from "react-router-dom";

import Menu from "./components/Menu";
import AnecdoteList from "./components/AnecdoteList";
import About from "./components/About";
import Footer from "./components/Footer";
import CreateNew from "./components/CreateNew";
import Anecdote from "./components/Anecdote";

const App = () => {
  /* const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);
 */

  const [anecdotes, setAnecdotes] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/anecdotes.json");
        const data = await response.json();
        setAnecdotes(data.anecdotes);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []);

  const [notification, setNotification] = useState(
    "would you like to create a new anecdote?"
  );

  const match = useMatch("/anecdotes/:id");

  const showNotification = () => {
    setTimeout(() => {
      setNotification("");
    }, 5000);

    return <div>{notification}</div>;
  };

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  if (anecdotes === null || Object.keys(anecdotes).length === 0) {
    return <Menu />;
  }

  const anecdote = match
    ? anecdotes.find((anecdote) => anecdote.id === Number(match.params.id))
    : null;

  return (
    <>
      <div>
        <Menu />
        {showNotification()}
        <Routes>
          <Route
            path="/anecdotes/:id"
            element={<Anecdote anecdote={anecdote} />}
          />
          <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
          <Route
            path="/create"
            element={
              <CreateNew addNew={addNew} setNotification={setNotification} />
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
        <br></br>
        <br></br>
        <Footer />
      </div>
    </>
  );
};

export default App;

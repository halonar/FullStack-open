import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import personService from "./services/persons";
import Notification from "./components/Notification";
import Information from "./components/Information";

const App = () => {
  useEffect(() => {
    console.log("effect");
    personService.getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const showInfo = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);
  };

  const showError = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = persons.find((person) => person.name === newName);
    const message = `${newName} is already added to phonebook, replace the old number with a new one?`;
    const nameObject = {
      name: newName,
      number: newNumber,
    };
    const clearInput = () => {
      setNewName("");
      setNewNumber("");
    };

    if (newPerson != undefined) {
      if (window.confirm(message)) {
        personService
          .update(newPerson.id, nameObject)
          .then((returnedName) => {
            setPersons(
              persons.map((person) =>
                person.id !== newPerson.id ? person : returnedName
              )
            );
            showInfo(`Updated ${newPerson.name}`);
            clearInput();
          })
          .catch((error) => {
            console.log(error);
            //alert("booooo!");
            if (error.status === 404) {
              showError(
                `Information of ${newPerson.name} was already removed from server`
              );

              setPersons(persons.filter((p) => p.id !== newPerson.id));
            } else {
              console.log(error.data);
              showError(`${error.data.error}`);
            }
          });
      } else {
        clearInput();
      }
    } else {
      personService
        .create(nameObject)
        .then((returnedName) => {
          setPersons(persons.concat(returnedName));
          showInfo(`Added ${returnedName.name}`);
          clearInput();
        })
        .catch((error) => {
          console.log("create: ", error.error);
          showError(`${error.error}`);
        });
    }
  };

  const handleNameChange = (event) => {
    //console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    //console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    //console.log(event.target.value);
    setNewFilter(event.target.value);
  };

  return (
    <div>
      {/* <div>debug: {newName}</div> */}

      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Information message={successMessage} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />

      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons
        persons={persons}
        setPersons={setPersons}
        newFilter={newFilter}
        showInfo={showInfo}
      />
    </div>
  );
};

export default App;

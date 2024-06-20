import Person from "./Person";
import personService from "../services/persons";

const Persons = ({ persons, setPersons, newFilter, showInfo }) => {
  const deletePerson = (id, name) => {
    //event.preventDefault();

    if (window.confirm(`${name}?`)) {
      personService.deleteOne(id).then(() => {
        console.log("deleted id:", id);
        setPersons(persons.filter((p) => p.id !== id));
        showInfo(`Deleted ${name}`);
      });
    }
  };

  return (
    <ul>
      {persons.map((person) => (
        <Person
          key={person.name}
          person={person}
          newFilter={newFilter}
          deletePerson={deletePerson}
        />
      ))}
    </ul>
  );
};

export default Persons;

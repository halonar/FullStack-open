const Person = ({ person, newFilter, deletePerson }) => {
  if (person.name.toLowerCase().includes(newFilter.toLowerCase()))
    return (
      <>
        <li>
          {person.name} {person.number}
          <button
            type="submit"
            onClick={() => deletePerson(person.id, person.name)}
          >
            Delete
          </button>
        </li>
      </>
    );
};

export default Person;

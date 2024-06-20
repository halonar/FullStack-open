const Filter = ({ countryFilter, handleFilterChange }) => {
  return (
    <div>
      find countries:{" "}
      <input value={countryFilter} onChange={handleFilterChange} />
    </div>
  );
};

export default Filter;

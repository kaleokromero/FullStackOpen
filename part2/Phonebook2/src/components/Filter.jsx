const Filter = ({ props }) => {
    //handleFilterChange must be here 
    //so that filteredPersons is not unreachable
    const handleFilterChange = event => {
      props.onFilterChange(event.target.value);
    }
  
    return (
      <form>
        filter by name: <input
          value={props.filterText}
          onChange={handleFilterChange}
        />
      </form>
    )
  }
  export default Filter
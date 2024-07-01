const Filter = ({ props }) => {
    const handleFilterChange = event => {
        props.onFilterChange(event.target.value)
    }
      return (
      <label>
        find countries
        <input value={props.text}
         onChange={handleFilterChange}/>
      </label>
    )
  }
  export default Filter
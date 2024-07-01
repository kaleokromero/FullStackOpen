
const Persons = ({persons, onClick}) => {
    //persons must be passed instead of props
    //props.map cannot be read in app.jsx
    return(
        <ul>
            {persons.map((person) =>
                <li key={person.id}>
                    {person.name} : {person.number}
                    <button onClick={() => onClick(person.id)}>delete</button>
                </li>
            )}
        </ul>
    )

}
export default Persons
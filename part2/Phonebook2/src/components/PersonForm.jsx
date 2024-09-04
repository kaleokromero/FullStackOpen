import { useState } from "react"

const PersonForm = ({addPerson}) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [nextId, setNextId] = useState(5)


    const handleSubmit = (event) => {
        event.preventDefault()
        addPerson({
            name: newName,
            number: newNumber,
            id: nextId.toString()
        })
        setNextId(nextId + 1)

    }

    return (
        <form onSubmit={handleSubmit}>
        <>
            name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
            <p>
                number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
            </p>
            <button type="submit">add</button>
        </>
        </form>
    );
};

export default PersonForm;

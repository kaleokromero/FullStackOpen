import axios from "axios";
const baseURL = "http://localhost:3001/persons"

const getAll = () => {
    return axios.get(baseURL)
}
const create = newNumber => {
    return axios.post(baseURL, newNumber)
}

const update = (id, newObject) => {
    return axios.put(`${baseURL}/${id}`, newObject)
}

const remove = (id) => {
    return axios.delete(`${baseURL}/${id}`)
}

export default {
    getAll,
    create,
    update,
    remove
}
import axios from "axios";

const login = async credentials => {
    // dont forget fixing this ugly call
    const baseUrl = 'http://localhost:3001/api/login'

    const response = await axios.post(baseUrl, credentials)
    window.localStorage.setItem('name', response.data)
    console.log(response.data);
    
    return response.data
}
export default { login }
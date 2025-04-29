import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

const getAll = (token) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

export default { getAll }
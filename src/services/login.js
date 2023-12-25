import axios from 'axios'
const baseUrl2 = 'http://localhost:3003/api/login'


const login = async (credentials) => {
  const response = await axios.post(baseUrl2, credentials)
  return response.data
}

export default { login }
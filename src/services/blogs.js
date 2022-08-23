import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (blogJSON) => {
  const config = {
    headers: { Authorization: token },
  }
  await axios.post(baseUrl, blogJSON, config)
}

const update = async (blogId, blogJSON) => {
  const config = { // authorization in backend did NOT implement
    headers: { Authorization: token },
  }
  await axios.put(`${baseUrl}/${blogId}`, blogJSON, config)
}

export default { setToken, getAll, create, update }
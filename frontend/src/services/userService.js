import axios from 'axios'
const baseUrl = 'http://localhost:5000/api/users'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const getUser = id => {
    const request = axios.get(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const addUser = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const removeUser = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const updateUser = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

// eslint-disable-next-line
export default { getAll, getUser, addUser, removeUser, updateUser }
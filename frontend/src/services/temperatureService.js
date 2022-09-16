import axios from 'axios'
const baseUrl = 'https://us-central1-cs3219-otot-assignment-362710.cloudfunctions.net/getHottestAreaInSG'

const getHottestAreaInSG = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

// eslint-disable-next-line
export default { getHottestAreaInSG }
import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8888/',
    timeout: 20000,
    headers: {
        
    }
});

export default instance
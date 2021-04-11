import axios from "axios";

export default function authToken(token) {
    if (token)
        axios.defaults.headers.common['Authorization'] = `UrFU${token}`
    else
        delete axios.defaults.headers.common['Authorization'];
}
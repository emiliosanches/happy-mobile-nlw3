import Axios from 'axios';

export const api = Axios.create({
    baseURL: 'http://192.168.100.6:25565/'
})
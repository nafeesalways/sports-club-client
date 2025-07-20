
import axios from 'axios';


const axiosInstance = axios.create({
     baseURL:`https://sports-club-server-chi.vercel.app`
})

const UseAxios = () => {
    return axiosInstance;
};

export default UseAxios;
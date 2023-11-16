import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
});

const useSecureAxios = () => {
    //  interceptor activities here


    return instance;

}

export default useSecureAxios

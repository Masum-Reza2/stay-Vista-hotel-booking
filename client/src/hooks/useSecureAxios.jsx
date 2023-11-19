import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
});

const useSecureAxios = () => {
    //  interceptor activities here
    axios.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    }, function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        // let status = error?.respon
        return Promise.reject(error);
    });


    return instance;
}

export default useSecureAxios

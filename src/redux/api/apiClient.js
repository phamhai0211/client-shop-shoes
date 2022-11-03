import axios from "axios"
import Cookies from 'js-cookie';
const apiClient = () => {
    //const [AccessToken, setAccessToken] = useCookies(['X-Auth-Token']);
    //const t = AccessToken["X-Auth-Token"]
    //const t = Cookies.get("X-Auth-Token") ? Cookies.get("X-Auth-Token") : ""
    const axiosInstance = axios.create({
        headers: {
            // 'Access-Control-Allow-Origin': 'http://localhost:8090/',
            // 'Access-Control-Allow-Credentials': 'true',
            //'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJoYW9iaDEyM0BnbWFpbC5jb20iLCJleHAiOjE2Mzc1NzAwNjh9.cVTYevWJRrExI2cE0tARGYNTxxPd_q-I-TVthJ1mZrA'
            'Authorization': Cookies.get('X-Auth-Token')
        },
        baseURL: process.env.REACT_APP_API_URL,
        responseType: "json", 
            
    });

    return axiosInstance;
};

export default apiClient;
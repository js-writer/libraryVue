import axios from "axios";
import router from "../router";
const API_URL = import.meta.env.VITE_API_URL

axios.defaults.baseURL = API_URL;

const axiosAuth = axios.create();

axiosAuth.interceptors.request.use(
    config => {
        const accessToken = sessionStorage.getItem('accessToken');
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        config.headers['Content-Type'] = 'application/json';
        return config;
    },
    error => {
        Promise.reject(error);
    })

axiosAuth.interceptors.response.use(
    response => response,
    error => {
        const originalRequest = error.config;
        

        if (error.response.status === 401 && originalRequest.url === '/refresh') {
            router.push({ name: 'login' });

            sessionStorage.clear('accessToken');
            return Promise.reject(error);
        }

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            return axiosAuth('/refresh', {
                withCredentials: true
            })
                .then(res => {
                    const newAccessToken = res.data.token;
                    sessionStorage.setItem("accessToken", newAccessToken);
                    axiosAuth.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`
                    return axiosAuth(originalRequest);
                })
        }
        router.push({ name: 'login' });
        return Promise.reject(error);
    }
)

export default axiosAuth;



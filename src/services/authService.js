import axios from "axios";

const refreshAccessToken = () => {
    return axios.get('/refresh', {
        withCredentials: true,
    })
        .then(res => {
            sessionStorage.setItem("accessToken", res.data.token);
            return res;
        })
}

const loginUser = (credential) => {

    return axios.post('/login', {
        ...credential
    }, {
        withCredentials: true,
    })
        .then(res => {
            sessionStorage.setItem("accessToken", res.data.accessToken);
            return res;
        });
}

const logoutUser = () => {
    return axios.get('/logout', {
        withCredentials: true,
    })
        .then(res => res);
}

export { loginUser, refreshAccessToken, logoutUser }
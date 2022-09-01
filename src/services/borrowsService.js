import axiosAuth from "../utils/axiosAuth";

const getBorrows = () => {
    return axiosAuth.get('/borrows')
        .then(res => res.data.borrowed ? res.data.borrowed : []);
}

const addBorrow = (bookid, readerid, date_from) => {
    return axiosAuth.post('/borrows', {
        bookid, readerid, date_from
    })
        .then(res => res.data);
}

const saveReturn = (id, timestamp) => {
    return axiosAuth.put(`/borrows/${id}`, {
        timestamp
    })
        .then(res => res.data);
}

export { getBorrows, saveReturn, addBorrow }
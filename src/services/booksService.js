import axiosAuth from "../utils/axiosAuth";

const getBooks = (availableOnly = false) => {
    const url = `/books${availableOnly ? '?availableOnly=true' : ''}`
    return axiosAuth.get(url)
        .then(res => res.data.books ? res.data.books : [])
        .catch(err => err);
}

const manageBook = (book) => {
    const url = `/books${book.id ? `/${book.id}` : ''}`;
    const method = book.id ? "put" : "post";
    return axiosAuth[method](url, { ...book })
        .then(res => res.data)
        .catch(err => err);
}

export { getBooks, manageBook }
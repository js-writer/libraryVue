import axiosAuth from "../utils/axiosAuth";
const getReaders = (withBorrows = false) => {
    const url = `/readers${withBorrows ? '?withBorrows=true' : ''}`
    return axiosAuth.get(url)
        .then(res => res.data.readers? res.data.readers : [])
        .catch(err => err);
}

const manageReader = (reader) => {
    const url = `/readers${reader.id ? `/${reader.id}` : ''}`;
    const method = reader.id ? "put" : "post";
    return axiosAuth[method](url, { ...reader })
        .then(res => res.data)
        .catch(err => err);
}

export { getReaders, manageReader }
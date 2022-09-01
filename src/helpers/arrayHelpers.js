const findIndex = (arr, id) => {
    return arr.findIndex(el => el.id === id)
}

const sortArrayByKey = (arr, key) => {
    arr.sort((a, b) => (a[key].toLowerCase() > b[key].toLowerCase()) ? 1 : -1);
    return arr;
}

export {findIndex, sortArrayByKey}
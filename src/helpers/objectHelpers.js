const isEmpty = (obj) =>{
   return !Object.values(obj).every(val => val);
}

export { isEmpty }
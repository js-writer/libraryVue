import { defineStore } from 'pinia'
import { getReaders, manageReader } from '../services/readersService';
import { findIndex, sortArrayByKey } from '../helpers/arrayHelpers';


export const useReadersStore = defineStore({
  id: 'readers',
  state: () => ({
    readers: [],
    readerError: false
  }),
  actions: {

    async fetchReaders(){
      if(!this.readers.length){
        this.readers = await getReaders();
      }
    },

    async saveReader(reader) {
      const res = await manageReader(reader);

      if(reader.id === res.id){
        this.readers[findIndex(this.readers, reader.id)] = reader;
      }
     
      if(!reader.id){
        reader.id = res.id;
        this.readers.push(reader);
        this.readers = sortArrayByKey(this.readers, 'surname');
      }

    }
  }
})

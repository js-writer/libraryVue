import { defineStore } from 'pinia'
import { getBorrows, saveReturn, addBorrow } from '../services/borrowsService';
import { findIndex, sortArrayByKey } from '../helpers/arrayHelpers';


export const useBorrowsStore = defineStore({
  id: 'borrows',
  state: () => ({
    borrows: [],
    readerError: false
  }),
  actions: {

    async fetchBorrows() {
      if (!this.borrows.length) {
        this.borrows = await getBorrows();
      }
    },

    async setReturn(id) {
      const timestamp = +new Date();
      await saveReturn(id, timestamp);
      return timestamp;
    },

    async sendBorrow(book, reader) {
      const timestamp = +new Date();
      const { name, surname } = reader;
      const { title, author_name, author_surname } = book;
      const result = await addBorrow(book.id, reader.id, timestamp)
      const newBorrow = {
        id: result.id,
        date_from: timestamp,
        name,
        surname,
        title,
        author_name,
        author_surname
      }
      this.borrows.push(newBorrow);
    }
  }
})

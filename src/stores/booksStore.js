import { defineStore } from 'pinia'
import { getBooks, manageBook } from '../services/booksService'
import { findIndex, sortArrayByKey } from '../helpers/arrayHelpers';


export const useBooksStore = defineStore({
  id: 'books',
  state: () => ({
    books: []
  }),
  actions: {

    updateBookBorrows(bookid, type) {
      if (!this.books.length) {
        return;
      }
      this.books.find((book) => {
        if (book.id === bookid) {
          type === 'increase' ? book.borrowed += 1 : book.borrowed -= 1
        }
      })
    },

    async fetchBooks() {
      if (!this.books.length) {
        this.books = await getBooks();
      }
    },

    async saveBook(book) {

      const res = await manageBook(book);
      if (book.id === res.id) {
        this.books[findIndex(this.books, book.id)] = book;
      }

      if (!book.id) {
        book.id = res.id;
        book.borrowed = 0;
        this.books.push(book);
        this.books = sortArrayByKey(this.books, 'title');
      }

    }
  }
})

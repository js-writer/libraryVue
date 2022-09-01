<template>
    <div class="table-responsive" v-if="books.length">
        <table class="table table-striped mt-5">
            <thead>
                <tr>
                    <th scope="col">Author</th>
                    <th scope="col">Title</th>
                    <th scope="col">ISBN</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Borrowed</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(book, index) in books" :key="index">
                    <td>{{ book.author_name }} {{ book.author_surname }}</td>
                    <td>{{ book.title }}</td>
                    <td>{{ book.isbn }}</td>
                    <td>{{ book.quantity }}</td>
                    <td>{{ book.borrowed }}</td>
                    <td><button class="btn btn-warning" @click="updateBook(book)">Update</button></td>
                </tr>
            </tbody>
        </table>
    </div>
    <p class="mt-5 text-center" v-else>No books yet!</p>
    <button class="btn btn-primary mt-5" @click="toggleForm">Add new book</button>
    <Popup v-if="isPopup" :title="tmpBook.id ? 'Update book' : 'New book'" @saveData="sendBook" @hidePopup="toggleForm">
        <div class="mb-3">
            <label class="col-form-label">Title</label>
            <input class="form-control" v-model="tmpBook.title" type="text"
                :class="{ 'border border-danger': !tmpBook.title && bookError }" />
        </div>
        <div class="mb-3">
            <label class="col-form-label">Author name</label>
            <input class="form-control" v-model="tmpBook.author_name" type="text"
                :class="{ 'border border-danger': !tmpBook.author_name && bookError }" />
        </div>
        <div class="mb-3">
            <label class="col-form-label">Author surname</label>
            <input class="form-control" v-model="tmpBook.author_surname" type="text"
                :class="{ 'border border-danger': !tmpBook.author_surname && bookError }" />
        </div>
        <div class="mb-3">
            <label class="col-form-label">ISBN</label>
            <input class="form-control" v-model="tmpBook.isbn" type="text"
                :class="{ 'border border-danger': !tmpBook.isbn && bookError }" />
        </div>
        <div class="mb-3">
            <label class="col-form-label">Quantity</label>
            <input class="form-control" v-model="tmpBook.quantity" type="number"
                :class="{ 'border border-danger': !tmpBook.quantity && bookError }" />
        </div>
    </Popup>
</template>

<script setup>
import Popup from "./atoms/Popup.vue";
import { ref } from "@vue/reactivity";
import { storeToRefs } from "pinia";
import { useBooksStore } from "../stores/booksStore";
import { isEmpty } from "../helpers/objectHelpers";

const { books } = storeToRefs(useBooksStore());
const { fetchBooks, saveBook } = useBooksStore();
const emptyBook = { title: '', isbn: '', author_name: '', author_surname: '', quantity: '' };
const isPopup = ref(false);
const tmpBook = ref({...emptyBook});
const bookError = ref(false);

await fetchBooks();

const toggleForm = () => {
    tmpBook.value = {...emptyBook};
    isPopup.value = !isPopup.value;
    bookError.value = false;
}

const sendBook = () => {
    bookError.value = false;
    const {id, borrowed, ...toCheck} = tmpBook.value;
    if (isEmpty(toCheck)) {
        bookError.value = true;
        return;
    }
    saveBook(tmpBook.value);
    toggleForm();
}

const updateBook = (book) => {
    toggleForm();
    tmpBook.value = { ...book };
}

</script>

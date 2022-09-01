<template>
    <div class="table-responsive" v-if="borrows.length">
        <table class="table table-striped mt-5">
            <thead>
                <tr>
                    <th scope="col">Reader</th>
                    <th scope="col">Book</th>
                    <th scope="col">Borrowed</th>
                    <th scope="col">Returned</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in borrows" :key="index">
                    <td>{{item.name}} {{item.surname}}</td>
                    <td>{{ item.author_name }} {{ item.author_surname }}: {{ item.title }}</td>
                    <td>{{ parseDate(item.date_from) }}</td>
                    <td>{{ item.date_to? parseDate(item.date_to): '' }}</td>
                    <td><button class="btn btn-warning" :disabled="item.date_to" @click="returnBook(item)">Return</button></td>
                </tr>
            </tbody>
        </table>
    </div>
    <p class="mt-5 text-center" v-else>No borrows yet!</p>
    <button class="btn btn-primary mt-5" @click="openForm">Register new borrow</button>
    <Popup v-if="isNewBorrow" @hidePopup="toggleForm" @saveData="register">
        <div class="mb-3">
            <label class="col-form-label">Choose reader:</label>
            <select :class="{ 'border border-danger': !selectedReader.id && borrowsError }" class="form-select" v-model="selectedReader" @change="clearBookId">
                <option v-for="(reader, index) in readers" :key="index" :value="reader">{{ reader.name }} {{
                        reader.surname
                }}</option>
            </select>
        </div>
        <div class="mb-3">
            <label class="col-form-label">Choose book:</label>
            <select :class="{ 'border border-danger': !selectedBook.id && borrowsError }" class="form-select" v-model="selectedBook">
                <template v-for="(book, index) in books" :key="index">
                    <option v-if="!selectedReader.borrowsid?.includes(book.id)" :value="book">{{ book.author_name }} {{ book.author_surname }}: 
                    {{ book.title }}
                    </option>
                </template>
            </select>
        </div>
    </Popup>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import Popup from "./atoms/Popup.vue";
import { useBorrowsStore } from "../stores/borrowsStore";
import { useBooksStore } from "../stores/booksStore";
import { storeToRefs } from "pinia";
import { getReaders } from "../services/readersService";
import { getBooks } from "../services/booksService";

const { fetchBorrows, setReturn, sendBorrow } = useBorrowsStore();
const { updateBookBorrows } = useBooksStore();
const { borrows } = storeToRefs(useBorrowsStore());

const readers = ref([]);
const books = ref([]);
const selectedReader = ref('');
const selectedBook = ref('');
const isNewBorrow = ref(false);
const borrowsError = ref(false);

await fetchBorrows();

const openForm = async () => {
    Promise.allSettled([getReaders(true), getBooks(true)])
    .then(res => {
        readers.value = res[0].value;
        books.value = res[1].value;
        toggleForm();
    });
}

const toggleForm = () => {
    borrowsError.value = false;
    selectedReader.value = '';
    selectedBook.value = '';
    isNewBorrow.value = !isNewBorrow.value;
}

const clearBookId = () => {
    selectedBook.value = '';
}

const parseDate = (timestamp) =>{
    return new Date(timestamp).toLocaleDateString();
}

const returnBook = async (item) => {
    const result = await setReturn(item.id);
    if(result){
        item.date_to = result;
        updateBookBorrows(item.bookid);
    }
}

const register = async () => {

    if(!selectedBook.value.id || !selectedReader.value.id){
        borrowsError.value = true;
        return;
    }
    const result = await sendBorrow(selectedBook.value, selectedReader.value);
    updateBookBorrows(selectedBook.value.id, 'increase');
    toggleForm();
}

</script>

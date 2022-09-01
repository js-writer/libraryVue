<template>
    <div class="table-responsive" v-if="readers.length">
        <table class="table table-striped mt-5">
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Surname</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Address</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(reader, index) in readers" :key="index">
                    <td>{{ reader.name }}</td>
                    <td>{{ reader.surname }}</td>
                    <td>{{ reader.phonenumber }}</td>
                    <td>
                        {{ reader.street }} {{ reader.house }}<br /> 
                        {{ reader.zipcode }}<br /> 
                        {{ reader.city }}
                    </td>
                    <td><button class="btn btn-warning" @click="updateReader(reader)">Update</button></td>
                </tr>
            </tbody>
        </table>
    </div>
    <p class="mt-5 text-center" v-else>No readers yet!</p>
    <button class="btn btn-primary mt-5" @click="toggleForm">Add new reader</button>
    <Popup v-if="isPopup" :title="tmpReader.id ? 'Update reader' : 'New reader'" @saveData="sendReader"
        @hidePopup="toggleForm">
        <div class="mb-3">
            <label class="col-form-label">Name</label>
            <input :class="{ 'border border-danger': !tmpReader.name && readerError }" class="form-control" v-model="tmpReader.name" type="text" />
        </div>
        <div class="mb-3">
            <label class="col-form-label">Surname</label>
            <input :class="{ 'border border-danger': !tmpReader.surname && readerError }" class="form-control" v-model="tmpReader.surname" type="text" />
        </div>
        <div class="mb-3">
            <label class="col-form-label">Phone number</label>
            <input :class="{ 'border border-danger': !tmpReader.phonenumber && readerError }" class="form-control" v-model="tmpReader.phonenumber" type="number" />
        </div>
        <div class="mb-3">
            <label class="col-form-label">City</label>
            <input :class="{ 'border border-danger': !tmpReader.city && readerError }" class="form-control" v-model="tmpReader.city" type="text" />
        </div>
        <div class="mb-3">
            <label class="col-form-label">Street</label>
            <input :class="{ 'border border-danger': !tmpReader.street && readerError }" class="form-control" v-model="tmpReader.street" type="text" />
        </div>
        <div class="mb-3">
            <label class="col-form-label">House</label>
            <input :class="{ 'border border-danger': !tmpReader.house && readerError }" class="form-control" v-model="tmpReader.house" type="text" />
        </div>
        <div class="mb-3">
            <label class="col-form-label">Zip code</label>
            <input :class="{ 'border border-danger': !tmpReader.zipcode && readerError }" class="form-control" v-model="tmpReader.zipcode" type="text" />
        </div>
    </Popup>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import Popup from "./atoms/Popup.vue";
import { storeToRefs } from "pinia";
import { useReadersStore } from "../stores/readersStore";
import { isEmpty } from "../helpers/objectHelpers";

const { readers, readerError } = storeToRefs(useReadersStore());
const { fetchReaders, saveReader } = useReadersStore();
const emptyReader = {
    name: '',
    surname: '',
    phonenumber: '',
    street: '',
    house: '',
    zipcode: '',
    city: ''
}
const tmpReader = ref({...emptyReader});
const isPopup = ref(false);

await fetchReaders();

const toggleForm = () => {
    tmpReader.value = { ...emptyReader }
    isPopup.value = !isPopup.value;
    readerError.value = false;
}

const sendReader = () => {

    readerError.value = false;
    const {id, ...toCheck} = tmpReader.value;
    if (isEmpty(toCheck)) {
        readerError.value = true;
        return;
    }

    saveReader(tmpReader.value);
    toggleForm();
}

const updateReader = (reader) => {
    toggleForm();
    tmpReader.value = { ...reader };
}

</script>

<style scoped lang="scss">
</style>



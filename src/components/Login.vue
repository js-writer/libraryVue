<template>
    <div class="login modal " >
        <div class="modal-dialog">
            <div class="modal-content border-0 mt-5">
                <div class="modal-body">
                    <div class="invalid-feedback" v-if="loginErrorMsg">{{loginErrorMsg}}</div>
                    <form @keyup.enter="sendLogin">
                        <div class="mb-3">
                            <label class="col-form-label">Login</label>
                            <input :class="{'border border-danger': !credential.login && loginError}" class="form-control" v-model="credential.login" type="text" />
                        </div>
                        <div class="mb-3">
                            <label class="col-form-label">Password</label>
                            <input :class="{'border border-danger': !credential.password && loginError}" class="form-control" v-model="credential.password" type="password" />
                        </div>
                        <div class="modal-footer justify-content-center border-top-0 ">
                            <button type="button" class="btn btn-primary" @click="sendLogin">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import { ref } from "@vue/reactivity";
import { loginUser } from "../services/authService";
import router from "../router";

const credential = ref({
    login: '',
    password: ''
})
const loginError = ref(false)
const loginErrorMsg = ref('')

const sendLogin = async () => {
    loginError.value = false;
    loginErrorMsg.value = '';
    if(!credential.value.login && !credential.value.password){
        loginError.value = true;
        return;
    }
    try{
        await loginUser(credential.value);
        router.push({ name: 'books' });
    }catch(err){
        loginErrorMsg.value = "Wrong login or password";
    }
}

</script>

<style scoped lang="scss">
.modal {
    background-image: url('../assets/img/loginbg.webp');
    background-position: center center;
    background-attachment: fixed;
    background-size: cover;
    background-repeat: no-repeat;
    display: block;
}

.login {
    .modal-content {
        background: rgba(255, 255, 255, 0.4);
    }
}
.invalid-feedback{
    display: block;
    text-align: center;
    background-color: red;
    color: white;
    width: 100%;
}
</style>



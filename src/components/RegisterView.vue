<template>
    <span class="login" @click="this.$router.push('/login')">Login</span>
    <span class="register">Register</span>
    <a-form name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 6 }" autocomplete="off">
        <a-form-item label="Name" name="name">
            <a-input v-model:value="name" />
        </a-form-item>
        <a-form-item label="Email" name="email">
            <a-input v-model:value="email" />
        </a-form-item>

        <a-form-item label="Password" name="password">
            <a-input-password v-model:value="password" />
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 6 }">
            <a-button type="primary" @click="Register" :loading="isLoading">Register</a-button>
        </a-form-item>
    </a-form>
</template>
<script>

import firebase from '../services/firebase';
import { notification } from 'ant-design-vue';

export default ({
    data() {
        return {
            name: '',
            email: '',
            password: '',
            isLoading: false,
            photoURL: '',
        }
    },
    methods: {
        Register() {
            this.isLoading = true;
            const name = this.name;
            const email = this.email;
            const password = this.password;
            const photoURL = this.photoURL;

            // console.log(localStorage.getItem('id'));
            const auth = firebase.auth();
            console.log("Auth", email, password);
            auth.createUserWithEmailAndPassword(email, password)
                .then(async (res) => {
                    console.log("res", res);
                    await firebase.firestore().collection('users')
                        .add({
                            id: res.user.uid,
                            name,
                            email,
                            password,
                            description: '',
                            photoURL,
                        }).then(ref => {
                            console.log('ref', ref);
                            localStorage.setItem('id', res.user.uid);
                            localStorage.setItem('name', name);
                            localStorage.setItem('email', email);
                            localStorage.setItem('password', password);
                            localStorage.setItem('description', '');
                            localStorage.setItem('photoURL', photoURL);
                            localStorage.setItem('FirebaseDocumentId', ref.id);


                            this.name = '';
                            this.email = '';
                            this.password = '';
                        }).catch((err) => console.log('err', err));
                    notification.success({
                        description: 'Login Success!'
                    });
                    setTimeout(() => {
                        this.isLoading = true;
                        this.$router.push('/login')
                    }, 1500);
                }).catch((err) => {
                    console.log('err', err);
                    notification.error({
                        description: 'Register Falied!',
                    });
                    setTimeout(() => {
                        this.isLoading = false;
                    }, 1000);
                });
        },
    },
    created() {
        if (localStorage.getItem('id') !== null) {
            this.$router.push('/chat-box');
        }
    }
});
</script>
<style scoped>
.login {
    margin-left: 40%;
    font-size: 20px;
    margin-right: 3.2rem;
    font-family: sans-serif;
    cursor: pointer;
    color: #3b3b3b;
}

.register {
    font-size: 30px;
    font-family: sans-serif;
    cursor: pointer;
    color: #3b3b3b;
    width: 50px;
}
</style>
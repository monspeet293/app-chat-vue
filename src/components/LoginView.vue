<template>
    <div>
        <!-- <div :style="{background: '#171717'}"> -->
        <span class="login">Login</span>
        <span class="register" @click="this.$router.push('/register')">Register</span>
        <a-form :model="formState" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 6 }" autocomplete="off"
            @finish="onFinish" @finishFailed="onFinishFailed">
            <a-form-item label="Email" name="email">
                <a-input v-model:value="email" />
            </a-form-item>

            <a-form-item label="Password" name="password">
                <a-input-password v-model:value="password" @keyup.enter="Login" />
            </a-form-item>

            <a-form-item :wrapper-col="{ offset: 8, span: 6 }">
                <a-button type="primary" @click="Login" :loading="isLoading">Login</a-button>
                <br>
                <br>
                <a-button type="dashed" @click="googleSignIn">Sign in with Google
                </a-button>
            </a-form-item>

        </a-form>
    </div>
</template>
<script>

import { QuerySnapshot } from '@firebase/firestore';
import { notification } from 'ant-design-vue';
import firebase from '../services/firebase';


export default ({
    data() {
        return {
            email: '',
            password: '',
            isLoading: false
        }
    },

    methods: {
        Login() {
            this.isLoading = true;
            const auth = firebase.auth();

            auth.signInWithEmailAndPassword(this.email, this.password)
                .then(async (res) => {
                    console.log("res", res);
                    if (res.user) {
                        await firebase.firestore().collection('users')
                            .where('id', '==', res.user.uid)
                            .get()
                            .then(querySnapshot => {
                                querySnapshot.forEach(doc => {
                                    console.log(doc.data());
                                    localStorage.setItem('id', doc.data().id);
                                    localStorage.setItem('name', doc.data().name);
                                    localStorage.setItem('email', doc.data().email);
                                    localStorage.setItem('password', doc.data().password);
                                    localStorage.setItem('description', doc.data().description);
                                    localStorage.setItem('photoURL', doc.data().photoURL);
                                    localStorage.setItem('FirebaseDocumentId', doc.id);
                                    setTimeout(() => {
                                        notification.success({
                                            description: 'Login Success!'
                                        });
                                        this.$router.push('/chat-box')
                                    }, 1000);
                                })
                            }).catch((err) => console.log('err', err));

                    }
                })
                .catch(err => {
                    console.log(err);
                    setTimeout(() => {
                        this.isLoading = false;
                        notification.error({
                            description: 'Email or password is incorrect !'
                        });
                    }, 1000);
                });

        },
        googleSignIn() {
            console.log('Google Sign In');
            // console.log(typeof firebase.auth.GoogleAuthProvider());
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider)
                .then(() => {
                    notification.success({
                        description: 'Login Success!'
                    });
                    this.$router.push('/chat-box');
                }).catch(err => {
                    console.log(err);
                    notification.error({
                        description: 'Login Failed!'
                    });
                });

        }
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
    margin-right: 3.2rem;
    font-size: 30px;
    font-family: sans-serif;
    cursor: pointer;
    color: #3b3b3b;
    width: 50px;
}

.register {
    font-size: 20px;
    font-family: sans-serif;
    cursor: pointer;
    color: #3b3b3b;
}
</style>
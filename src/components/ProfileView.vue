<template>
    <div>
        <a-avatar :size="{ xs: 64, sm: 80, md: 100, lg: 150, xl: 200 }">
            <template #icon>
                <img v-if="this.photoURL" :src="this.photoURL" />
                <img v-else src="../assets/basic-avatar.jpg" />

                <input type="file" name="upload" class="upload" @change="changeAvt" ref="fileInput">
                <!-- <EditFilled :style="{ fontSize: '16px' }" class="hover:cursor-pointer" /> -->
            </template>
        </a-avatar>
        <!-- <EditFilled :style="{ fontSize: '16px' }" class="hover:cursor-pointer" /> -->
        <edit-two-tone v-if="!checkEdit" @click="$refs.fileInput.click()">Upload Avatar
        </edit-two-tone>
        <a-form name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 6 }" autocomplete="off">
            <a-form-item label="Email" name="email">
                <a-input v-model:value="email" disabled />
            </a-form-item>
            <a-form-item label="Name" name="name">
                <a-input v-model:value="name" :disabled="checkEdit" />
            </a-form-item>

            <!-- <a-form-item label="Password" name="password">
                <a-input-password v-model:value="password" disabled />
            </a-form-item> -->

            <a-form-item label="Description" name="description">
                <a-textarea v-model:value="description" show-count :maxlength="50" :disabled="checkEdit" />
            </a-form-item>

            <a-form-item :wrapper-col="{ offset: 8, span: 6 }">
                <a-button type="primary" @click="editProfile" v-if="checkEdit">Edit</a-button>
                <a-button type="primary" @click="uploadProfile" v-else :loading="isLoading">Save
                </a-button>
                <br>
                <br>
                <a-button type="primary" danger @click="this.$router.push('/chat-box')">Back</a-button>
            </a-form-item>

        </a-form>
    </div>
</template>

<script>
import firebase from '../services/firebase';
import { notification } from 'ant-design-vue';
import { EditFilled, EditTwoTone } from '@ant-design/icons-vue';

export default ({
    components: {
        // EditFilled,
        EditTwoTone
    },

    data() {
        return {
            firebaseDocId: localStorage.getItem('FirebaseDocumentId'),
            id: localStorage.getItem('id'),
            name: localStorage.getItem('name'),
            email: localStorage.getItem('email'),
            password: localStorage.getItem('password'),
            description: localStorage.getItem('description'),
            photoURL: localStorage.getItem('photoURL'),
            newPhoto: null,
            checkEdit: true,
            isLoading: false
        }
    },
    methods: {
        editProfile() {
            this.checkEdit = false;
            this.isLoading = false;
        },
        saveProfile() {
            // this.checkEdit = true;
            this.isLoading = true;
        },
        changeAvt(e) {
            console.log('hello');
            if (e.target.files && e.target.files[0]) {
                const fileType = e.target.files[0].type.toString();
                if (fileType.indexOf('image') != 0) {
                    notification.warn({
                        description: 'Please choose image to upload',
                    });
                    return;
                }
                this.newPhoto = e.target.files[0];
                this.photoURL = URL.createObjectURL(e.target.files[0]);
                console.log('photo', this.newPhoto);
                console.log('url', this.photoURL);
            } else {
                notification.error({
                    description: 'Something went wrong',
                });
            }
        },
        uploadProfile() {
            this.isLoading = true;
            if (this.newPhoto) {
                const upload = firebase
                    .storage()
                    .ref()
                    .child(this.id)
                    .put(this.newPhoto);
                // need to download url
                upload.on(
                    'state changed',
                    null,
                    (error) => {
                        console.log(error);
                    },
                    () => {
                        upload.snapshot.ref.getDownloadURL().then((url) => {
                            console.log(url);
                            this.updateUserInfo(true, url);
                        });
                    }
                );
            } else {
                this.updateUserInfo(false, null);
            }
        },
        updateUserInfo(isUrlPresent, downloadUrl) {
            let newInfo = {};
            if (isUrlPresent) {
                newInfo = {
                    name: this.name,
                    description: this.description,
                    photoURL: downloadUrl
                }
            } else {
                newInfo = {
                    name: this.name,
                    description: this.description,
                }
            }
            console.log("Go to here...");
            firebase
                .firestore()
                .collection('users')
                .doc(this.firebaseDocId)
                .update(newInfo)
                .then((res) => {
                    console.log(res);
                    localStorage.setItem('name', this.name);
                    localStorage.setItem('description', this.description);
                    if (isUrlPresent) {
                        localStorage.setItem('photoURL', downloadUrl);
                    }
                    notification.success({
                        description: 'Update Profile Successfully',
                    });
                    this.isLoading = false;
                    this.checkEdit = true;
                })
                .catch((err) => {
                    console.log(err);
                    notification.error({
                        description: 'Something went wrong',
                    });
                    this.isLoading = false;
                    // this.checkEdit = true;
                });
        }
    },
    created() {
        if (localStorage.getItem('id') === null) {
            this.$router.push('/login');
        }
    }
})
</script>
<style scoped>

</style>
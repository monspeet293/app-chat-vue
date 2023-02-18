<template>
    <a-layout has-sider>
        <a-layout-sider :style="{ height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }">
            <!-- <div class="user">
                <button class="btn-user" @click="openProfile=true">
                    <img v-if="this.currentUrl" :src="this.currentUrl" />
                    <img v-else src="../assets/basic-avatar.jpg" />
                    <p>{{ currentUserName }}</p>
                </button>
            </div> -->
            <a-menu class="user" mode="inline">
                <a-sub-menu key="sub2" @titleClick="titleClick">
                    <!-- <template class="btn-user">
                        <img v-if="this.currentUrl" :src="this.currentUrl" />
                        <img v-else src="../assets/basic-avatar.jpg" />
                        <p>{{ currentUserName }}</p>
                    </template> -->
                    <template #title>
                        <div class="btn-user">
                            <img v-if="this.currentUrl" :src="this.currentUrl" />
                            <img v-else src="../assets/basic-avatar.jpg" />
                            {{ currentUserName }}
                        </div>
                    </template>
                    <a-menu-item @click="this.$router.push('/profile')">
                        <template #icon>
                            <UserOutlined />
                        </template>
                        My profile
                    </a-menu-item>
                    <a-menu-item @click="logOut">
                        <template #icon>
                            <LogoutOutlined />
                        </template>
                        Log out
                    </a-menu-item>
                </a-sub-menu>
            </a-menu>
            <!-- <button class="log-out" @click="logOut">Logout</button> -->

            <a-menu theme="dark" mode="inline" v-show="true">
                <div v-for="item in listUser" :key="item.id" v-show="item.id != currentUserId">
                    <a-menu-item :key="item.key" @click="letsChat(item)">
                        <img v-if="item.photoURL" :src="item.photoURL" class="avt-userlist">
                        <img v-else src="../assets/basic-avatar.jpg" class="avt-userlist">

                        <!-- <span class="nav-text">{{ item.id }}</span> -->
                        <span class="nav-text">{{ item.name }}</span>

                    </a-menu-item>

                </div>
            </a-menu>

        </a-layout-sider>
        <a-layout :style="{ marginLeft: '200px' }">
            <!-- <a-layout-header v-if="(!this.currentPeerUser)" theme="dark">
            </a-layout-header> -->
            <a-layout-content :style="{ margin: '0', overflow: 'initial' }">
                <div :style="{ padding: '0', background: '#fff', textAlign: 'center' }">
                    <div v-if="(!this.currentPeerUser)">
                        <img class="background-box-chat" src="../assets/background-box_chat.jpg" />
                    </div>
                    <div v-else>
                        <img class="background-box-chat_blur" src="../assets/background-box_chat.jpg" />
                        <ChatBox class="chat-box" :currentPeerUser="currentPeerUser" />
                    </div>
                    <!-- <img class="background-box-chat blur" src="../assets/background-box_chat.jpg" /> -->

                </div>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<script>

import { UserOutlined, LogoutOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';
import firebase from '../services/firebase';
import ChatBox from './ChatBox.vue'

export default ({
    components: {
        UserOutlined,
        LogoutOutlined,
        ChatBox,
    },
    data() {
        return {
            // selectedKeys: ref(['']),
            openProfile: false,
            currentPeerUser: null,
            currentUserId: localStorage.getItem('id'),
            currentUserName: localStorage.getItem('name'),
            currentUserDescription: localStorage.getItem('description'),
            currentUrl: localStorage.getItem('photoURL'),
            listUser: [],

        };
    },
    methods: {
        logOut() {
            firebase.auth().signOut();
            localStorage.clear();
            this.$router.push('/login');
        },
        menuProfile() {

        },
        letsChat(item) {
            this.currentPeerUser = item;
            // console.log(this.currentPeerUser.name);
        },
        async getUserList() {
            const result = await firebase
                .firestore()
                .collection('users')
                .get()
                .then(query => {
                    if (query.docs.length > 0) {
                        let users = [...query.docs];
                        users.forEach((user, index) => {
                            this.listUser.push({
                                key: index,
                                firebaseDocumentId: user.id,
                                id: user.data().id,
                                name: user.data().name,
                                description: user.data().description,
                                photoURL: user.data().photoURL,
                            });
                        });
                    }
                });
            // console.log(this.listUser[0]);
        }
    },
    created() {
        if (localStorage.getItem('id') === null) {
            this.$router.push('/login');
        } else {
            this.getUserList();
        }
    }

});
</script>
<style scoped>
.inSearch {
    margin: 13px 0px 13px 10px;
    padding: 5px;
    width: 80%;
}

.btn-clear {
    color: #fff;
    padding: 5px;
}

.user {
    background-color: #001529;
    /* margin-left: 0%; */
    /* display: flex; */
    /* border: 0; */
    /* height: 100%; */
}

.btn-user {
    text-transform: none;
    color: #ffffff;
    outline: none;
    display: flex;
    background-color: #001529;
    height: 100%;
    border: 0;
    cursor: pointer;
}

.user .btn-user img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: 10px;
}

.user .btn-user p {
    margin: 15px 0px;
    font-size: 17px;
    color: #fff;
    /* text-align: center; */
}

.avt-userlist {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: 10px;
}

.background-box-chat {
    max-width: 100%;
    height: auto;
}

.background-box-chat_blur {
    max-width: 100%;
    height: auto;
    filter: blur(4px)
}

.chat-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-image: url(../assets/background-box_chat.jpg);
}



/* ::-webkit-scrollbar {
    width: 20px;
}

::-webkit-scrollbar-track {
    background-color: transparent;
}

::-webkit-scrollbar-thumb {
    background-color: #8fbee9;
    border-radius: 20px;
    border: 6px solid transparent;
    background-clip: content-box;
}

::-webkit-scrollbar-thumb:hover {
    background-color: #669ccd;
} */

/* .site-layout .site-layout-background {
    background: #fff;
}

[data-theme='dark'] .site-layout .site-layout-background {
    background: #141414;
}*/
</style>

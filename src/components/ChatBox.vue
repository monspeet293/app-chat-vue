<template>
    <div>
        <div class="chat">
            <div class="chat-header clearfix">
                <img v-if="this.currentPeerUser.photoURL" :src="this.currentPeerUser.photoURL" alt="avatar" />
                <img v-else src="../assets/basic-avatar.jpg" alt="avatar" />

                <div class="chat-about">
                    <div class="chat-with">Chat with {{ this.currentPeerUser.name }}</div>
                    <div class="chat-num-messages">{{ this.currentPeerUser.description }}</div>
                </div>
            </div> <!-- end chat-header -->

            <div class="chat-history" v-if="this.listMessage[0]">
                <ul v-for="item in this.listMessage" :key="item.id">
                    <li class="clearfix">
                        <div
                            :class="(item.idFrom === currentUserId) ? 'message-data align-right' : 'message-data align-left'">
                            <div v-if="(item.idFrom === currentUserId)">
                                <span class="message-data-time">{{ item.timestamp }}</span>
                                &nbsp; &nbsp;
                                <a-avatar v-if="currentUrl" :src="currentUrl" />
                                <a-avatar v-else src="../assets/basic-avatar.jpg" />
                            </div>
                            <div v-else>
                                <a-avatar v-if="currentPeerUser.photoURL" :src="currentPeerUser.photoURL" />
                                <a-avatar v-else src="../img/basic-avatar.a08437a3.jpg" />
                                &nbsp; &nbsp;
                                <span class="message-data-time">{{ item.timestamp }}</span>
                            </div>
                            <!-- &nbsp; &nbsp; ///////////Name in box chat
                            <span class="message-data-name">
                                {{ (item.idFrom === currentUserId) ? currentUserName : currentPeerUser.name }}
                            </span> -->
                        </div>
                        <div
                            :class="(item.idFrom === currentUserId) ? 'message other-message float-right' : 'message my-message'">
                            {{ item.content }}
                        </div>
                    </li>
                </ul>
            </div>
            <div v-else class="chat-history">
                <h1 class="Nothing">Say something to {{ currentPeerUser.name }}</h1>
                <img style="max-width: 100px; height: auto; cursor: pointer;" src="../assets/say-hi.jpg"
                    @click="sendMessage(`Hello ${currentPeerUser.name}! Nice to meet you ♥ !`)" />
            </div>
            <div class="chat-message clearfix">
                <textarea @keyup.enter="sendMessage(this.inputValue)" v-model="this.inputValue"
                    placeholder="Type your message" rows="3"></textarea>

                <button @click="sendMessage(this.inputValue)">Send</button>

            </div>
        </div>
    </div>
</template>

<script>

import moment from 'moment';
import firebase from '../services/firebase';
import { MoreOutlined } from '@ant-design/icons-vue';

export default {
    props: ["currentPeerUser"], //partnerUser
    components: {
        // MoreOutlined,
    },
    data() {
        return {
            currentUserId: localStorage.getItem('id'),
            currentUserName: localStorage.getItem('name'),
            currentUserDescription: localStorage.getItem('description'),
            currentUrl: localStorage.getItem('photoURL'),
            photoURL: localStorage.getItem('photoURL'),
            inputValue: '',
            listMessage: [],
            groupChatId: null,
        }
    },
    watch: {
        currentPeerUser: {
            handler(newVal, oldVal) {
                if (newVal !== oldVal) {
                    this.getMessages();
                }
            },
            deep: true,
        }
    },
    methods: {
        sendMessage(content) {
            if (content.trim() === "") {
                return;
            }
            this.inputValue = '';
            console.log(this.currentUserName);
            const timestamp = moment().valueOf().toString();
            // console.log(moment().format('lll'));
            const message = {
                id: timestamp,
                idFrom: this.currentUserId,
                idTo: this.currentPeerUser.id,
                timestamp: moment().format('lll'),
                content: content.trim()
            };
            console.log('Mes', message);
            console.log('group (send)', this.groupChatId);
            firebase
                .firestore()
                .collection('messages')
                .doc(this.groupChatId)
                .collection(this.groupChatId)
                .doc(timestamp)
                .set(message)
        },
        getMessages() {
            if (!this.currentPeerUser) {
                return;
            }
            // console.log('before', this.listMessage);
            this.listMessage = [];
            let groupChatId = `${this.currentPeerUser.id} + ${this.currentUserId}`;
            // console.log('group (get)', groupChatId);
            firebase
                .firestore()
                .collection('messages')
                .doc(groupChatId)
                .collection(groupChatId)
                .onSnapshot(Snapshot => {
                    console.log('length', Snapshot.docChanges().length);
                    if (Snapshot.docChanges().length > 0) {
                        this.groupChatId = groupChatId;
                        // console.log('group (snap)', this.groupChatId);
                        Snapshot.docChanges().forEach(res => {
                            this.listMessage.push(res.doc.data())
                        });
                    } else {
                        this.groupChatId = `${this.currentUserId} + ${this.currentPeerUser.id}`;
                        // console.log('final', this.groupChatId);
                        firebase
                            .firestore()
                            .collection('messages')
                            .doc(this.groupChatId)
                            .collection(this.groupChatId)
                            .onSnapshot(Snapshot => {
                                Snapshot.docChanges().forEach(res => {
                                    // console.log('data', res.doc.data());
                                    if (res.type === 'added') {
                                        this.listMessage.push(res.doc.data());
                                    }
                                    // if (res.type === 'added') {
                                    //     let index = this.listMessage.findIndex(
                                    //         (mess) => {
                                    //             return (
                                    //                 mess.id ===
                                    //                 res.doc.data().id
                                    //             );
                                    //         }
                                    //     );
                                    //     if (index < 0) {
                                    //         this.listMessage.push(
                                    //             res.doc.data()
                                    //         );
                                    //     }
                                    // } DuyLieu
                                });
                            });
                    }
                });
        },
        scroll() {
            const scroll = document.querySelector('.scroll');
            setInterval(() => {
                scroll.scrollTop = scroll.scrollTop + scroll.scrollHeight;
            }, 1000);
        },
    },
    mounted() {
        this.getMessages();
        // this.scroll();
    }
}
</script>
<style scoped>
.chat {
    margin: 0;
    padding-right: auto;
    width: 490px;
    float: left;
    background: #cde6fd;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;

    color: #434651;
}

.chat .chat-header {
    padding: 20px;
    border-bottom: 2px solid #001529;
}

.chat .chat-header img {
    float: left;
    /* background-color: #cde6fd; */
    width: 70px;
    height: 70px;
    border-radius: 50%;
    margin: 10px;
}

.chat .chat-header .chat-about {
    float: left;
    padding-left: 10px;
    margin-top: 6px;
}

.chat .chat-header .chat-with {
    font-weight: bold;
    font-size: 16px;
}

.chat .chat-header .chat-num-messages {
    color: #92959E;
}


.chat .chat-history {
    padding: 30px 30px 20px;
    border-bottom: 2px solid #001529;
    overflow-y: scroll;
    height: 575px;
}

.chat .chat-history ul {
    padding-left: 25px;
    list-style: none;
    /* margin: 14px; */
}

.chat .chat-history .message-data {
    margin-bottom: 15px;
}

.chat .chat-history .message-data-time {
    color: lighten(#92959E, 8%);
    padding-left: 6px;
}

.chat .message {
    color: white;
    padding: 18px 20px;
    line-height: 26px;
    font-size: 16px;
    border-radius: 7px;
    margin-bottom: 30px;
    width: 90%;
    /* position: relative; */
}

.chat .message :after {
    bottom: 100%;
    left: 7%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-bottom-color: #86BB71;
    border-width: 10px;
    margin-left: -10px;
}


.chat .my-message {
    background: #86BB71;
}

.chat .other-message {
    background: #478ecf;
    left: 93%;
}

.chat .other-message :after {
    border-bottom-color: #478ecf;
    left: 93%;
}

/*aaaaaaaaaaa */
.chat-message {
    padding: 30px;
}

.chat-message textarea {
    width: 100%;
    border: none;
    padding: 10px 20px;
    font: 14px/22px "Lato", Arial, sans-serif;
    margin-bottom: 10px;
    border-radius: 5px;
    resize: none;
    overflow: scroll;
}

::-webkit-scrollbar {
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
}


.chat-message button {
    float: right;
    color: #478ecf;
    font-size: 16px;
    text-transform: uppercase;
    border: none;
    cursor: pointer;
    font-weight: bold;
    background: #cde6fd;
}

.chat-message button :hover {
    color: darken(#478ecf, 7%);
}

.me {
    margin-right: 3px;
    font-size: 10px;
}


.me {
    color: #94C2ED;
}

.align-left {
    text-align: left;
}

.align-right {
    text-align: right;
}

.float-right {
    float: right;
}

.clearfix:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: " ";
    clear: both;
    height: 0;
}
</style>
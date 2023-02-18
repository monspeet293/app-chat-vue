import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/database'


const firebaseConfig = {
    apiKey: "AIzaSyCDGpmxm8n3LGQY8HyeOani4J3WsAbJzWU",
    authDomain: "app-chat-provip.firebaseapp.com",
    projectId: "app-chat-provip",
    storageBucket: "app-chat-provip.appspot.com",
    messagingSenderId: "9667390947",
    appId: "1:9667390947:web:e65d8383de9990eca0c4d6"
};

firebase.initializeApp(firebaseConfig);
// const auth = getAuth(firebaseDB);


export default firebase;
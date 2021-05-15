import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage'
const config =  {
    apiKey: "AIzaSyAgdf4BHOqSKPkAFPRhAHm4pPK6c48Wnow",
    authDomain: "chat-web-app-a299b.firebaseapp.com",
    databaseURL: "https://chat-web-app-a299b-default-rtdb.firebaseio.com",
    projectId: "chat-web-app-a299b",
    storageBucket: "chat-web-app-a299b.appspot.com",
    messagingSenderId: "116104908294",
    appId: "1:116104908294:web:2ba38f1d1c59e5f1457d87"
  };

  const app = firebase.initializeApp(config);
  export const auth = app.auth();
  export const database = app.database();
  export const storage = app.storage();
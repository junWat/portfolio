import firebase from "firebase";
import "firebase/database";
import "firebase/auth";
// import config from '~/firebase.config';　エラーになる

if (!firebase.apps.length) {
  firebase.initializeApp({
    //・firebase.initializeApp()アプリでfirebaseの初期化
    apiKey: "AIzaSyDmMw38N-5NNFdJlj-y3hBhR3maveMi01w",
    authDomain: "nuxt-slack-clone.firebaseapp.com",
    databaseURL: "https://nuxt-slack-clone.firebaseio.com",
    projectId: "nuxt-slack-clone",
    storageBucket: "nuxt-slack-clone.appspot.com",
    messagingSenderId: "866029504484",
    appId: "1:866029504484:web:35dfd442723793a18269f1"
  });
}

export default firebase;
// export const auth = firebase.auth();　必要なし？

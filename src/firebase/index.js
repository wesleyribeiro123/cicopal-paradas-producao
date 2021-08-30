import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBc_IJw94aJIfLhcsJrKij5F0QrhZ8vx5g",
  authDomain: "cicopal-paradas-producao.firebaseapp.com",
  projectId: "cicopal-paradas-producao",
  storageBucket: "cicopal-paradas-producao.appspot.com",
  messagingSenderId: "704341606719",
  appId: "1:704341606719:web:be2f9cb55f77588def938a"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({
  cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
});

firebase.firestore().enablePersistence();
export default firebaseApp;
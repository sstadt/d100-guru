import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/functions';

const config = {
  apiKey: 'AIzaSyDX5qRpyJ-rmvTGEE97Ii-8p-i-th5TiTM',
  authDomain: 'd100-guru.firebaseapp.com',
  databaseURL: 'https://d100-guru.firebaseio.com',
  projectId: 'd100-guru',
  storageBucket: 'd100-guru.appspot.com',
  messagingSenderId: '162997310327',
  appId: '1:162997310327:web:26c4723b173d2f17508772',
  measurementId: 'G-TFT1BJ0VHB',
};

const app = firebase.initializeApp(config);
const auth = app.auth();
const db = firebase.firestore();
const storage = firebase.storage();
const functions = firebase.functions();
const settings = {};

db.settings(settings);

export { auth, db, storage, functions };

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCbe4JP4xSOQ7XlLwyUOiJOidXueqlOazM',
  authDomain: 'workoutday-b082f.firebaseapp.com',
  projectId: 'workoutday-b082f',
  storageBucket: 'workoutday-b082f.appspot.com',
  messagingSenderId: '196161320278',
  appId: '1:196161320278:web:62f71bd86b4da64cbc12f7',
};

firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;
export const dbService = firebase.firestore();
export const authService = firebase.auth();
export const storage = firebase.storage();
export const config = firebaseConfig;

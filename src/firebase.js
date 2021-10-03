import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyB7QuYTO0Bb5WiEbhBBinv5zL-jDjmyx78',
  authDomain: 'workoutday-946ba.firebaseapp.com',
  projectId: 'workoutday-946ba',
  storageBucket: 'workoutday-946ba.appspot.com',
  messagingSenderId: '928990359035',
  appId: '1:928990359035:web:09e326ec3c96f002e02f5e',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;
export const dbService = firebase.firestore();
export const authService = firebase.auth();
export const storage = firebase.storage();
export const config = firebaseConfig;

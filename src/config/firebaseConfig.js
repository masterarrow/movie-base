import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'


// Firebase configuration
const config = {
  apiKey: "AIzaSyAj3vRd3wYP8rgpJUeWFqYBdO8cVmsjIWU",
  authDomain: "movie-dbase.firebaseapp.com",
  databaseURL: "https://movie-dbase.firebaseio.com",
  projectId: "movie-dbase",
  storageBucket: "movie-dbase.appspot.com",
  messagingSenderId: "623065281210",
  appId: "1:623065281210:web:24a36714b099cb5a5c8883",
  measurementId: "G-7N4JHFVM8H"
};

firebase.initializeApp(config);

export default firebase;

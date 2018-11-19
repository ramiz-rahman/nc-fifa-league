import firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyCvFnve0eF6AcP-B5frtTnxwnGr2vFodv0',
  authDomain: 'nc-fifa-league.firebaseapp.com',
  databaseURL: 'https://nc-fifa-league.firebaseio.com',
  projectId: 'nc-fifa-league',
  storageBucket: 'nc-fifa-league.appspot.com',
  messagingSenderId: '525823922810'
};
const fire = firebase.initializeApp(config);
export default fire;

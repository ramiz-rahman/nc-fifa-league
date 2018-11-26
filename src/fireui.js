import firebaseui from 'firebaseui';
import firebase from 'firebase';

const ui = new firebaseui.auth.AuthUI(firebase.auth());

export default ui;

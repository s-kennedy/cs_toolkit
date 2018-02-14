import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDV7lnBOhAucGoJZdY_m6IqdMXAs6buyB8",
  authDomain: "stc-toolkit.firebaseapp.com",
  databaseURL: "https://stc-toolkit.firebaseio.com",
  projectId: "stc-toolkit",
  storageBucket: "",
  messagingSenderId: "117348823057"
};

firebase.initializeApp(config);

export default firebase;
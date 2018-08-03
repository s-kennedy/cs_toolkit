import config from "../../config/firebase-config.json";
import firebase from "firebase";

firebase.initializeApp(config);

export default firebase;

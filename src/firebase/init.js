import firebase from "firebase";
import * as config from "../../config/firebase-config.json";

firebase.initializeApp(config);

export default firebase;

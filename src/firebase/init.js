import firebase from "firebase";
import * as config from "../../firebase-config.json";

firebase.initializeApp(config);

export default firebase;

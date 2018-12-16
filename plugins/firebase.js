import firebase from "firebase/app";
import "firebase/app";
import "firebase/messaging";

if (!firebase.apps.length) {
  firebase.initializeApp({
    projectId: "warframe-status",
    messagingSenderId: "834339407252"
  });
}

export default firebase;

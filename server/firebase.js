const firebase = require("firebase/app");

const firebaseConfig = {
  apiKey: "AIzaSyAzdrNKMtvuxy1N3S7bWcZH-PBrpMUis0Y",
  authDomain: "forum-6ad4a.firebaseapp.com",
  projectId: "forum-6ad4a",
  storageBucket: "forum-6ad4a.appspot.com",
  messagingSenderId: "181993892239",
  appId: "1:181993892239:web:51ac1c49e325258bc8c3fa",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

module.exports = app;

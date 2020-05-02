import * as firebase from 'firebase';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCwNZedmMaJx7UF9I2w0O_OurHvEGz4tYQ",
    authDomain: "parking-lot-245b7.firebaseapp.com",
    databaseURL: "https://parking-lot-245b7.firebaseio.com",
    projectId: "parking-lot-245b7",
    storageBucket: "parking-lot-245b7.appspot.com",
    messagingSenderId: "999352749961",
    appId: "1:999352749961:web:7c735ae6731785cb079b58"
  };
  // Initialize Firebase
  var fireDb = firebase.initializeApp(firebaseConfig);

  export default fireDb.database().ref();
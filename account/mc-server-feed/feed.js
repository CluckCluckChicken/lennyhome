// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAN4nLKenddvEzcSZYhaJ-s19Irv9PEdyA",
  authDomain: "telepathic-squid-000.firebaseapp.com",
  databaseURL: "https://telepathic-squid-000.firebaseio.com",
  projectId: "telepathic-squid-000",
  storageBucket: "telepathic-squid-000.appspot.com",
  messagingSenderId: "216289155289",
  appId: "1:216289155289:web:c4d915b3c17c08a5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

firebase.auth().onAuthStateChanged(function(user) {
if (user) {
  var user = firebase.auth().currentUser;
  var name, email, photoUrl, uid;

  if (user != null) {
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                     // this value to authenticate with your backend server, if
                     // you have one. Use User.getToken() instead.
  }

function CreateFeed(name) {
  console.log("Attempting test whether this name already exists...");
  
  var newServerDocRef = db.collection("users").doc(uid).collection("mc-server-feed").doc(name);

  feedBaseDocumentRef.get().then(function(doc) {
      if (doc.exists) {
        console.log("This feed already exists.");
      } else {
          // doc.data() will be undefined in this case
          console.log("Name is valid. Creating feed entries...");
          db.collection("users").doc(uid).collection("mc-server-feed").doc(name).set({
            isServer: true,
          })
          .then(function() {
              console.log("Done!");
              console.log("Hit F5 to see it!");
              alert("Hit F5 to see your new server!");
          })
          .catch(function(error) {
              console.error("Error writing new feed document: ", error);
          });
      }
  }).catch(function(error) {
      console.log("Error getting mc-server-feed base document:", error);
      console.log("Hit F5 to retry.");
  });
}

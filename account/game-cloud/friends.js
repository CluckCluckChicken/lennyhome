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

var database = firebase.database();

firebase.auth().onAuthStateChanged(function(user) {
if (user) {

  var user = firebase.auth().currentUser;
  var name, email, photoUrl, uid;
  if (user != null) {
    window.name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    window.uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                     // this value to authenticate with your backend server, if
                     // you have one. Use User.getToken() instead.
  }

  var FriendsArray = new Array();
  
  // Change username options

  console.log("You are logged in as: " + name + ". To change your username, type the following into the console:");
  console.log("var user = firebase.auth().currentUser; user.updateProfile({ displayName: '[PUT YOUR NEW USERNAME HERE. NO SLASHES, OR QUOTATION MARKS OF ANY KIND. IS THAT CLEAR? YES SIR!]', })");
  console.log("Ignore him. He's grumpy.");
  
  firebase.database().ref(`users/${window.uid}/game-cloud`).once("value", snapshot => {
   if (snapshot.exists()){
      console.log("Game Cloud is already initialized. Good.");
     
      var query = firebase.database().ref('/users/' + window.uid + "/game-cloud/friends").orderByKey();
      query.once("value")
        .then(function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
            
            var key = childSnapshot.key;
            
            var childData = childSnapshot.val();
            
            FriendsArray.push(childData); 
        });
        document.getElementById("FriendsList").innerHTML = FriendsArray;
      });

    }
    else {
      window.location = "./init.html";
    }
  });

} else {
  window.location = "../index.html";
}
});

function AddFriend(userToAdd) {
  var ref = firebase.database().ref('/users/' + window.uid + "/game-cloud/friends");
  ref.push(userToAdd);
  ref = firebase.database().ref("/users/" + userToAdd + "/game-cloud/notifications");
  ref.push({
    from: userToAdd,
    content: userToAdd + " friended you."
  });
  console.log("Attempted to add new friend. Will reload.");
  window.location.reload(true);
}

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
  
  // Change username options

  console.log("You are logged in as: " + name + ". To change your username, type the following into the console:");
  console.log("var user = firebase.auth().currentUser; user.updateProfile({ displayName: '[PUT YOUR NEW USERNAME HERE. NO SLASHES, OR QUOTATION MARKS OF ANY KIND. IS THAT CLEAR? YES SIR!]', })");
  console.log("Ignore him. He's grumpy.");
  
  firebase.database().ref(`users/${window.uid}/game-cloud`).once("value", snapshot => {
   if (snapshot.exists()){
      console.log("Game Cloud is already initialized. Good.");
     
      var query = firebase.database().ref('/users/' + window.location.hash.substring(1) + "/game-cloud/profile").orderByKey();
      query.once("value")
        .then(function(snapshot) {
          var profileOwner = snapshot.val().username;
          document.getElementById("Username").innerHTML = snapshot.val().username;
      });
     
      var friendRef = firebase.database().ref('/users/' + window.location.hash.substring(1) + "/game-cloud/friends");
      friendRef.orderByValue().limitToLast(3).on("value", function(snapshot) {
         snapshot.forEach(function(data) {
          if (data.val == profileOwner) {
            document.getElementById("friendBtn").innerHTML = "Already friended";
          }
        });
      });
      
      if (window.location.hash == "" || window.location.hash == "#") {
        document.getElementById("ProfileContent").style.display = "none";
        document.getElementById("ProfileInstructions").style.display = "inline-block";
        document.getElementById("OwnProfileUrl").innerHTML = "#" + window.uid;
      }
      else {
        document.getElementById("ProfileContent").style.display = "inline-block";
        document.getElementById("ProfileInstructions").style.display = "none";
      }
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
    from: window.name,
    content: window.name + " friended you."
  });
  console.log("Attempted to add new friend. Will reload.");
  window.location.reload(true);
}

function uuid4()
{
  function hex (s, b)
  {
    return s +
      (b >>> 4   ).toString (16) +  // high nibble
      (b & 0b1111).toString (16);   // low nibble
  }

  let r = crypto.getRandomValues (new Uint8Array (16));

  r[6] = r[6] >>> 4 | 0b01000000; // Set type 4: 0100
  r[8] = r[8] >>> 3 | 0b10000000; // Set variant: 100

  return r.slice ( 0,  4).reduce (hex, '' ) +
         r.slice ( 4,  6).reduce (hex, '-') +
         r.slice ( 6,  8).reduce (hex, '-') +
         r.slice ( 8, 10).reduce (hex, '-') +
         r.slice (10, 16).reduce (hex, '-');
}

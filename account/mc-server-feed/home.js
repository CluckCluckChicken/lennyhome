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

firebase.auth().useDeviceLanguage();

var name, email, photoUrl, uid;

firebase.auth().onAuthStateChanged(function(user) {
if (user) {
  var user = firebase.auth().currentUser;
//  var name, email, photoUrl, uid;

  if (user != null) {
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                     // this value to authenticate with your backend server, if
                     // you have one. Use User.getToken() instead.
  }

  // Change username options

  console.log("You are logged in as: " + name + ". Your UID is: " + uid + ". To change your username, type the following into the console:");
  console.log("var user = firebase.auth().currentUser; user.updateProfile({ displayName: '[PUT YOUR NEW USERNAME HERE. NO SLASHES, OR QUOTATION MARKS OF ANY KIND. IS THAT CLEAR? YES SIR!]', })");
  console.log("Ignore him. He's grumpy.");

  var feedBaseDocumentRef = db.collection("mc-server-feed").doc(uid).collection("servers").doc("default-server");
  var mcServerFeedRef = db.collection("/mc-server-feed/" + uid + "/servers");

  feedBaseDocumentRef.get().then(function(doc) {
      if (doc.exists) {

          // Get list of servers

          console.log("Fetching servers list...");

          
          mcServerFeedRef.get()
          .then(function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
                  // doc.data() is never undefined for query doc snapshots
                  console.log("You have the following servers:");
                  console.log(doc.id);
                  document.getElementById("serversList").innerHTML += "<button class='block w3-btn w3-dark-grey w3-round-large'>" + doc.id + "</button>";
              });
              document.getElementById("serversList").innerHTML += "<input class='w3-input inline-block w3-round-large' id='newServerName' placeholder='Display name' style='width: 25%;' type='text'><br/><select class='w3-input inline-block w3-round-large' id='newServerEdition' style='width: 25%;'><option value='java'>Java Edition</option><option value='bedrock'>Bedrock Edition (Pocket, Win10, new PS4, Xbox One, etc)</option><option value='console'>Legacy Console Edition (Nintendo, old PS4, Xbox 360, etc)</option></select><br/><select class='w3-input inline-block w3-round-large' id='newServerPublicity' style='width: 25%;'><option value='private'>Private</option><option value='public'>Public</option></select><br/><button class='w3-btn w3-blue w3-round-large inline-block' onclick='CreateFeed(document.getElementById(&#34newServerName&#34).value)'>New server</button>";
          })
          .catch(function(error) {
              console.log("Error fetching servers: ", error);
              console.log("Hit F5 to retry.");
          });

      } else {
        window.location = "./init.html";
      }
  }).catch(function(error) {
      console.log("Error getting mc-server-feed base document:", error);
      console.log("Hit F5 to retry.");
  });

} else {
  window.location = "../index.html";
}
});

function CreateFeed(name) {    
  
  var feedBaseDocumentRef = db.collection("users").doc(uid).collection("mc-server-feed").doc("%base");
  
  console.log("Attempting test whether this name already exists...");

  var newServerDocRef = db.collection("users").doc(uid).collection("mc-server-feed").doc(name);

  newServerDocRef.get().then(function(doc) {
      if (doc.exists) {
        console.log("This feed already exists.");
      } else {
          // doc.data() will be undefined in this case
          console.log("Name is valid. Creating feed entries...");
          db.collection("users").doc(uid).collection("mc-server-feed").doc(name).set({
            isServer: true,
            edition: document.getElementById("newServerEdition").value,
            publicity: document.getElementById("newServerPublicity").value
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

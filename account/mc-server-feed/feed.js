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

//const functions = require('firebase-functions');
// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.addMessage = functions.firestore
    .document('chatMessages/{userId}')
    .onCreate((snap, context) => {
    // Get an object representing the document
    // e.g. {'name': 'Marie', 'age': 66}
    const messageData = snap.data();
    
    const message = removeWords(messageData.message);
    const name = removeWords(messageData.name);
    return snap.ref.update({ name : name, message: message}) 

    function removeWords(text) {
        text = text.replace(/\bApple\b/g,"");
        text = text.replace(/\bMicrosoft\b/g,"");
        text = text.replace(/\bGoogle\b/g,"");
        return text
    }
    // perform desired operations ...
    });
const functions = require('firebase-functions');
const admin = require('../services/admin.js');

module.exports = functions.firestore
  .document('lists/{listId}')
  .onCreate(snapshot => {
    const FieldValue = admin.firestore.FieldValue;

    return snapshot.ref.update({
      created: FieldValue.serverTimestamp(),
    });
  });

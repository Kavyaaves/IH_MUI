const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp({ projectId: 'indian-hydrobiology' });
const db = admin.firestore();


module.exports = { admin, db };

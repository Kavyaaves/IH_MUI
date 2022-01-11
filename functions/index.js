const functions = require('firebase-functions');
const cors = require('cors');
const express = require('express');
const app = require('express')();
const auth = require('./admin/auth');
const { db, admin } = require('./admin/admin');
const { paymentRoute, callback } = require('./api/paymentRoute');
const { memberPay, memberCallback } = require('./api/memberPay');

const {
	loginUser,
	resetPassword,
	signUpUser,
	uploadProfilePhoto,
	getUserDetail,
	updateUserDetails,
} = require('./api/users');

app.use(cors({ origin: '*' }));

app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);

// app.post('/login', loginUser);
// app.post('/reset', resetPassword);
// app.post('/signup', signUpUser);
// app.get('/user', auth, getUserDetail);
// app.post('/user', auth, updateUserDetails);
// app.post('/user/image', auth, uploadProfilePhoto);
app.post('/payment', paymentRoute);
app.post('/membership', memberPay);
app.post('/callback', callback);
app.post('/memberCallback', memberCallback);

exports.job = functions.pubsub.schedule('* 21 * * *').onRun((context) => {
	db.collection(`users`)
		.where('role', '==', 'Member')
		.onSnapshot((snap) => {
			snap.forEach((doc) => {
				if (
					doc.data().endAt.seconds > admin.firestore.Timestamp.now().seconds
				) {
					db.doc(`users/${doc.id}`)
						.update({
							...doc.data(),
							membershipHistory: admin.firestore.FieldValue.arrayUnion({
								startAt: doc.data().startAt,
								endAt: doc.data().endAt,
							}),
							startAt: null,
							endAt: null,
							role: 'User',
						})
						.then((doc) => {
							console.log(doc);
						})
						.catch((err) => {
							console.log(err);
						});
				}
			});
		});
});
exports.api = functions.https.onRequest(app);

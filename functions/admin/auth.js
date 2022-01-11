// const { auth } = require('../../view/src/firebase');
const { admin, db } = require('./admin');

module.exports = (request, response, next) => {
	let idToken;
	if (
		request.headers.authorization &&
		request.headers.authorization.startsWith('Bearer ')
	) {
		idToken = request.headers.authorization.split('Bearer ')[1];

		admin
			.auth()
			.verifyIdToken(idToken, true)
			.then((decodedToken) => {
				request.user = decodedToken;

				return db
					.collection('users')
					.where('userId', '==', decodedToken.uid)
					.limit(1)
					.get();
			})
			.then((data) => {
				request.user.imageUrl = data.docs[0].data().imageUrl;

				return next();
			})
			.catch((err) => {
				if (err.code === 'auth/id-token-revoked') {
					return response
						.status(300)
						.json({ 'auth/id-token-revoked': 'SignOut' });
					// Token has been revoked. Inform the user to reauthenticate or signOut() the user.
				} else {
					return response.status(403).json(err);
					// Token is invalid.
				}
			});
	}

	// } else {
	// 	return response.status(400).json({ error: 'Unauthorized' });
	// }
};

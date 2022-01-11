const { admin, db } = require('.././admin/admin');
const { config } = require('.././admin/config');
const nodemailer = require('nodemailer');
const firebase = require('firebase');
firebase.initializeApp(config);

const { validateLoginData, validateSignUpData } = require('../util/validators');
const { auth } = require('firebase-admin');
const { response } = require('express');

// Login
exports.loginUser = (request, response) => {
	const user = {
		email: request.body.email,
		password: request.body.password,
	};

	const { valid, errors } = validateLoginData(user);
	if (!valid) return response.status(400).json(errors);

	firebase
		.auth()
		.signInWithEmailAndPassword(user.email, user.password)
		.then((data) => {
			return data.user.getIdToken();
		})
		.then((token) => {
			return response.json({ token });
		})
		.catch((error) => {
			return response
				.status(403)
				.json({ general: 'Wrong credentials, Please try again' });
		});
};

exports.signUpUser = (request, response) => {
	const newUser = {
		firstName: request.body.firstName,
		lastName: request.body.lastName,
		email: request.body.email,
		role: 'Admin',
		phoneNumber: request.body.phoneNumber,
		password: request.body.password,
		confirmPassword: request.body.confirmPassword,
	};

	const { valid, errors } = validateSignUpData(newUser);
	if (!valid) return response.status(400).json(errors);

	let token, userId;

	firebase
		.auth()
		.createUserWithEmailAndPassword(newUser.email, newUser.password)
		.then((data) => {
			userId = data.user.uid;
			return data.user.getIdToken();
		})
		.then((idToken) => {
			token = idToken;
			const userCredentials = {
				firstName: newUser.firstName,
				lastName: newUser.lastName,
				phoneNumber: newUser.phoneNumber,
				email: newUser.email,
				role: newUser.role,
				createdAt:
					new Date().toDateString() +
					' ' +
					new Date().toLocaleTimeString('en-us', { timeZone: 'Asia/Kolkata' }),
				userId: userId,
			};
			return db.doc(`/users/${userId}`).set(userCredentials);
		})
		.then(() => {
			return response.status(201).json({ token });
		})
		.catch((err) => {
			if (err.code === 'auth/email-already-in-use') {
				return response.status(400).json({ email: 'Email already in use' });
			} else {
				return response.status(500).json({
					general:
						'Something went wrong, please refresh the page and try again',
				});
			}
		});
	// } else {
	// 	return response.json({ general: 'Something went wrong, please try again' });
	// }
};

const deleteImage = (imageName) => {
	const bucket = admin.storage().bucket(config.storageBucket);
	const path = `${imageName}`;
	bucket
		.file(path)
		.delete()
		.then(() => {
			return;
		})
		.catch((error) => {
			return;
		});
};

// Upload profile picture
exports.uploadProfilePhoto = (request, response) => {
	const BusBoy = require('busboy');
	const path = require('path');
	const os = require('os');
	const fs = require('fs');
	const busboy = new BusBoy({ headers: request.headers });
	let imageFileName;
	let imageToBeUploaded = {};
	busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
		if (mimetype !== 'image/png' && mimetype !== 'image/jpeg') {
			return response.status(400).json({ error: 'Wrong file type submited' });
		}
		const imageExtension = filename.split('.')[filename.split('.').length - 1];
		imageFileName = `${request.user.uid}.${imageExtension}`;

		const filePath = path.join(os.tmpdir(), imageFileName);
		imageToBeUploaded = { filePath, mimetype };
		file.pipe(fs.createWriteStream(filePath));
	});
	busboy.on('finish', () => {
		admin
			.storage()
			.bucket('indian-hydrobiology.appspot.com')
			.upload(imageToBeUploaded.filePath, {
				resumable: false,
				metadata: {
					metadata: {
						contentType: imageToBeUploaded.mimetype,
					},
				},
			})
			.then(() => {
				const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;
				deleteImage(request.user.uid);
				return db.doc(`/users/${request.user.uid}`).update({
					imageUrl,
				});
			})
			.then(() => {
				return response.json({ message: 'Image uploaded successfully' });
			})
			.catch((error) => {
				return response.status(500).json({ error: error.code });
			});
	});

	busboy.end(request.rawBody);
};

exports.getUserDetail = (request, response) => {
	let userData = {};
	db.doc(`/users/${request.user.uid}`)
		.get()
		.then((doc) => {
			if (doc.exists) {
				userData.userCredentials = doc.data();
				return response.json(userData);
			}
		})
		.catch((error) => {
			return response.status(500).json({ error: error.code });
		});
};

exports.getUserDetailById = (request, response) => {
	let userData = {};
	db.doc(`/users/${request.params.userId}`)
		.get()
		.then((doc) => {
			if (doc.exists) {
				userData.userCredentials = doc.data();
				return response.json(userData);
			}
		})
		.catch((error) => {
			return response.status(500).json(error.code);
		});
};

exports.updateUserDetails = (request, response) => {
	let document = db.collection('users').doc(`${request.params.userId}`);
	document
		.update(request.body)
		.then(() => {
			response.json({ message: 'Updated successfully' });
		})
		.catch((error) => {
			return response.status(500).json({
				message: 'Cannot Update the value',
			});
		});
};

const sendCustomPasswordResetEmail = (email, link) => {
	var transporter = nodemailer.createTransport({
		service: 'gmail',
		secure: true,
		auth: {
			user: 'indianhydrobiology@gmail.com',
			pass: 'ihkia@2021',
		},
	});

	var mailOptions = {
		from: 'indianhydrobiology@gmail.com',
		to: email,
		subject: 'Reset Password',
		html: `<p>Hello,</p><br></br><p>Click the below link to reset your password for Indian Hydrobiology</p><br></br>${link}<br></br><p>Regards,</p><br></br><p>Indian Hydrobiology</p>`,
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
			return response.status(500).json({ error: error });
		} else {
			console.log(info);
			return response.json({ msg: 'Email sent successfully' });
		}
	});
};

exports.resetPassword = (request, response) => {
	const userEmail = request.body.email;
	admin
		.auth()
		.generatePasswordResetLink(userEmail)
		.then((link) => {
			return sendCustomPasswordResetEmail(userEmail, link);
		})
		.catch((error) => {
			return response
				.status(500)
				.json({ error: 'Error resetting password!! Please try again later' });
		});
};

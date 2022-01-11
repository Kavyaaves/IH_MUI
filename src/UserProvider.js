import React, { useState, useEffect, createContext } from 'react';
import { auth, db } from '../firebase';
import { getUserDocument } from '../components/SignUp1';

export const UserContext = createContext({ user: null });

function UserProvider(props) {
	const [user, setUser] = useState(null);
	const [isAuthenticated, setAuthenticated] = useState(false);
	useEffect(() => {
		auth.onAuthStateChanged(async (userAuth) => {
			console.log(userAuth);
			if (userAuth) {
				if (userAuth.uid) setAuthenticated(true);
				const userDoc = await getUserDocument(userAuth.uid);
				setUser(userDoc);
				console.log(user);
			} else {
				setUser(null);
			}
		});
	}, []);

	console.log(user);

	return (
		<UserContext.Provider value={{ user, isAuthenticated }}>
			{props.children}
		</UserContext.Provider>
	);
}

export default UserProvider;

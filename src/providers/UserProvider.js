import React, { useState, useEffect, createContext } from 'react';
import { auth, db } from '../database';


export const UserContext = createContext({ user: null });

function UserProvider(props) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setAuthenticated] = useState(false);
    // const generateUserDocument = async (authId, info) => {
    //     authId.reload().then(async () => {
    //         const user = auth.currentUser;
    //         // do your stuff here
    //         console.log(info, user);
    //         if (!user) return;
    //         const userRef = db.doc(`users/${user.uid}`);
    //         const snapshot = await userRef.get();
    //         console.log(user.phoneNumber);
    //         if (!snapshot.exists) {
    //             try {
    //                 await userRef.set({
    //                     email: user.email,
    //                     displayName: user.displayName,
    //                     phoneNumber: info.phoneNumber,
    //                     role: 'User',
    //                     userId: user.uid,
    //                     createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    //                 });
    //             } catch (error) {
    //                 console.error('Error creating user document', error);
    //             }
    //         }
    //         return getUserDocument(authId.uid);
    //     });
    // };
    useEffect(() => {
        auth.onAuthStateChanged(async (userAuth) => {
            if (userAuth) {
                if (userAuth.uid) setAuthenticated(true);
                // const userDoc = await getUserDocument(userAuth.uid);
                setUser(userAuth);
            } else {
                setUser(null);
            }
        });
    }, []);

    return (
        <UserContext.Provider value={{ user, isAuthenticated }}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserProvider;

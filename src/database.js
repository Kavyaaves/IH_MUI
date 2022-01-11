import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from "firebase/auth";

const config = {
	apiKey: 'AIzaSyDt_TLBrI9TCkyc_uUZ97qnfd2WKln9EGE',
	authDomain: 'indian-hydrobiology.firebaseapp.com',
	projectId: 'indian-hydrobiology',
	storageBucket: 'indian-hydrobiology.appspot.com',
	messagingSenderId: '710472888144',
	appId: '1:710472888144:web:164e356cee6a171992c655',
	measurementId: 'G-77DVMNQFPV',
};

const app = initializeApp(config);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth();

export default app

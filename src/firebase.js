
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyDWzapyCguJEISL-OhuytEfvot_qodeTX8",
    authDomain: "agri-int.firebaseapp.com",
    projectId: "agri-int",
    storageBucket: "agri-int.firebasestorage.app",
    messagingSenderId: "1069214672476",
    appId: "1:1069214672476:web:079dd72f660ddc9c106899"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

export { auth, googleProvider }
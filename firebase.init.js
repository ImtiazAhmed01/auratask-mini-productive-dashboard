// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCe-dMaq52Mphhjb-j-o5hvNpmySizk-To",
    authDomain: "auratasks-fb8eb.firebaseapp.com",
    projectId: "auratasks-fb8eb",
    storageBucket: "auratasks-fb8eb.firebasestorage.app",
    messagingSenderId: "319191469459",
    appId: "1:319191469459:web:8b8eac721ebb1548036c66"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export default app;
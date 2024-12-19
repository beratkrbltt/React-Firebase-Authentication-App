
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyALb3PO0_Qo5gOyYs8JLHIpM86TPV5oYRI",
    authDomain: "fir-login-bd6f1.firebaseapp.com",
    projectId: "fir-login-bd6f1",
    storageBucket: "fir-login-bd6f1.firebasestorage.app",
    messagingSenderId: "984748217850",
    appId: "1:984748217850:web:2d55249335b5d09b658043"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
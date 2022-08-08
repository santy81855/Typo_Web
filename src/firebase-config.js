import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB4x6hM1CiWFQgWRZnT7_xop4lWtApmmqA",
    authDomain: "typo-web.firebaseapp.com",
    projectId: "typo-web",
    storageBucket: "typo-web.appspot.com",
    messagingSenderId: "664273800963",
    appId: "1:664273800963:web:775e54aca713e1f3f72336",
    measurementId: "G-3HV61QR71J",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

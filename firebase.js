import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {

apiKey: "AIzaSyBFpU7NldfS_b4pCjhStG-nkNhMI_W1uIk",
authDomain: "portfolio-profile-16519.firebaseapp.com",
projectId: "portfolio-profile-16519",
storageBucket: "portfolio-profile-16519.firebasestorage.app",
messagingSenderId: "486886015305",
appId: "1:486886015305:web:23d05f3ac64eab483f1a98",
measurementId: "G-K01957ND5G"

};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyCLaY1is7teD08-hUMICGgml1IckhR5pXw",
  authDomain: "chatbot-14434.firebaseapp.com",
  projectId: "chatbot-14434",
  storageBucket: "chatbot-14434.firebasestorage.app",
  messagingSenderId: "738000797012",
  appId: "1:738000797012:web:1e2ff0fbef048005045cc1",
  measurementId: "G-EET2B2Y18Y"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);



window.signup = function () {

  const name = document.getElementById("signupName").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  if (!name || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {

      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        createdAt: new Date()
      });

      localStorage.setItem("currentUser", JSON.stringify({
        uid: user.uid,
        email: user.email,
        name: name
      }));

      alert("Signup successful!");
      window.location.href = "dashboard.html"; // ✅ DIRECT
    })
    .catch((error) => {
      alert(error.message);
    });
};



window.login = function () {

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {

      const user = userCredential.user;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      let name = "User";
      if (docSnap.exists()) {
        name = docSnap.data().name;
      }

      localStorage.setItem("currentUser", JSON.stringify({
        uid: user.uid,
        email: user.email,
        name: name
      }));

      alert("Login successful!");
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      alert(error.message);
    });
};

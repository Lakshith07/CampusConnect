import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCLaY1is7teD08-hUMICGgml1IckhR5pXw",
  authDomain: "chatbot-14434.firebaseapp.com",
  projectId: "chatbot-14434",
  storageBucket: "chatbot-14434.firebasestorage.app",
  messagingSenderId: "738000797012",
  appId: "1:738000797012:web:1e2ff0fbef048005045cc1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🔐 Protect page
const user = JSON.parse(localStorage.getItem("currentUser"));
if (!user) {
  window.location.href = "index.html";
}

const list = document.getElementById("requestsList");

const q = query(
  collection(db, "requests"),
  where("userId", "==", user.uid)
);

const snapshot = await getDocs(q);

list.innerHTML = "";

if (snapshot.empty) {
  list.innerHTML = "<p>No requests created yet.</p>";
} else {
  snapshot.forEach(doc => {
    const r = doc.data();

    const div = document.createElement("div");
    div.className = "request-card";

    div.innerHTML = `
      <h3>${r.title}</h3>
      <p><strong>Category:</strong> ${r.category}</p>
      <p>${r.description}</p>
      <p class="status ${r.status.toLowerCase()}">
        Status: ${r.status}
      </p>
    `;

    list.appendChild(div);
  });
}

window.goBack = function () {
  window.location.href = "dashboard.html";
};

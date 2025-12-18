import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit
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

const user = JSON.parse(localStorage.getItem("currentUser"));

if (!user) {
  window.location.href = "index.html";
}

document.getElementById("welcomeText").innerText =
  `Welcome, ${user.name || "Student"} 👋`;

const requestsRef = collection(db, "requests");

const q = query(requestsRef, where("userId", "==", user.uid));
const snapshot = await getDocs(q);

let total = 0, open = 0, closed = 0;

snapshot.forEach(doc => {
  total++;
  const r = doc.data();
  if (r.status === "Open") open++;
  if (r.status === "Closed") closed++;
});

document.getElementById("totalRequests").innerText = total;
document.getElementById("openRequests").innerText = open;
document.getElementById("closedRequests").innerText = closed;

const activityList = document.getElementById("activityList");
activityList.innerHTML = "";

const recentQuery = query(
  requestsRef,
  where("userId", "==", user.uid),
  orderBy("createdAt", "desc"),
  limit(3)
);

const recentSnap = await getDocs(recentQuery);

if (recentSnap.empty) {
  activityList.innerHTML = "<li>No activity yet</li>";
} else {
  recentSnap.forEach(doc => {
    const r = doc.data();
    const li = document.createElement("li");
    li.textContent = `${r.title} — ${r.status}`;
    activityList.appendChild(li);
  });
}

document.getElementById("createBtn")
  .addEventListener("click", () => {
    window.location.href = "create-request.html";
  });

document.getElementById("myRequestsBtn")
  .addEventListener("click", () => {
    window.location.href = "my-requests.html";
  });

document.getElementById("logoutBtn")
  .addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "home.html";
  });

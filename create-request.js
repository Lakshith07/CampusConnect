function createRequest() {
  const title = document.getElementById("title").value;
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value;

  const user = JSON.parse(localStorage.getItem("currentUser"));

  fetch("http://localhost:3000/create-request", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title,
      category,
      description,
      userId: user.id
    })
  })
    .then(res => res.json())
    .then(data => {
      alert(data.message);
      window.location.href = "dashboard.html";
    });
}

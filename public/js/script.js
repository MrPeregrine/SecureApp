// ==== Función para mostrar mensajes dentro del contenedor ====
function showMessage(container, message, type = "error") {
  let alertDiv = document.createElement("div");
  alertDiv.textContent = message;
  alertDiv.className = type === "error" ? "alert-error" : "alert-success";
  alertDiv.style.marginBottom = "15px";
  alertDiv.style.padding = "10px";
  alertDiv.style.borderRadius = "5px";
  alertDiv.style.color = type === "error" ? "#a94442" : "#3c763d";
  alertDiv.style.backgroundColor = type === "error" ? "#f2dede" : "#dff0d8";
  container.prepend(alertDiv);

  setTimeout(() => alertDiv.remove(), 4000); // Se quita después de 4s
}

// ==== Login ====
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const container = loginForm.parentElement;

    const email = loginForm.email.value;
    const password = loginForm.password.value;

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        showMessage(container, data.message, "success");
        setTimeout(() => (window.location.href = "/dashboard.html"), 1000);
      } else {
        showMessage(container, data.message, "error");
      }
    } catch (err) {
      showMessage(container, "Error de conexión: " + err.message, "error");
    }
  });
}

// ==== Registro ====
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const container = registerForm.parentElement;

    const username = registerForm.username.value;
    const email = registerForm.email.value;
    const password = registerForm.password.value;

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        showMessage(container, "¡Registro exitoso!", "success");
        setTimeout(() => (window.location.href = "/success.html"), 1000);
      } else {
        showMessage(container, data.message, "error");
      }
    } catch (err) {
      showMessage(container, "Error de conexión: " + err.message, "error");
    }
  });
}
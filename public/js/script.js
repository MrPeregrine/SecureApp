// script.js
function showMessage(container, message, type="error"){
  container.textContent = message;
  container.style.color = type==="error"?"red":"green";
}

// Login
const loginForm = document.getElementById("loginForm");
if(loginForm){
  loginForm.addEventListener("submit", async e=>{
    e.preventDefault();
    const container = document.getElementById("messageContainer");
    const email = loginForm.email.value;
    const password = loginForm.password.value;

    try {
      const res = await fetch("/api/login", {
        method:"POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({email,password})
      });
      const data = await res.json();
      showMessage(container,data.message,res.ok?"success":"error");
      if(res.ok) setTimeout(()=>window.location.href="/dashboard.html",1000);
    }catch(err){
      showMessage(container,"Error de conexión: "+err.message,"error");
    }
  });
}

// Registro
const registerForm = document.getElementById("registerForm");
if(registerForm){
  registerForm.addEventListener("submit", async e=>{
    e.preventDefault();
    const container = document.getElementById("messageContainer");
    const username = registerForm.username.value;
    const email = registerForm.email.value;
    const password = registerForm.password.value;

    try{
      const res = await fetch("/api/register", {
        method:"POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({username,email,password})
      });
      const data = await res.json();
      showMessage(container,data.message,res.ok?"success":"error");
      if(res.ok) setTimeout(()=>window.location.href="/success.html",1000);
    }catch(err){
      showMessage(container,"Error de conexión: "+err.message,"error");
    }
  });
}
function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  // Dados fictícios (ideal seria verificar via backend)
  if (user === "admin" && pass === "1234") {
    localStorage.setItem("usuario", "admin");
    window.location.href = "app.html";
  } else {
    alert("Usuário ou senha incorretos!");
  }
}

function entrarComoVisitante() {
  localStorage.setItem("usuario", "visitante");
  window.location.href = "resultados.html"; // Página inicial do visitante
}

// Verifica se o usuário tem permissão na página atual
function verificarPermissao(paginaPermitidaParaVisitante = false) {
  const usuario = localStorage.getItem("usuario");

  if (usuario === "admin") return; // OK

  if (usuario === "visitante" && paginaPermitidaParaVisitante) return; // OK

  // Senão, redireciona para login
  window.location.href = "index.html"
}

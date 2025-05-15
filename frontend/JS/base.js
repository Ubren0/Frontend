// Funções simplificadas para o sistema

// UI e Navegação
function toggleSubmenu() {
  const submenu = document.getElementById("submenu");
  const seta = document.getElementById("seta");
  
  if (submenu.style.display === "block") {
    submenu.style.display = "none";
    seta.innerHTML = "▼";
  } else {
    submenu.style.display = "block";
    seta.innerHTML = "▲";
  }
}

function logout() {
  localStorage.removeItem("sessaoAtiva");
  sessionStorage.clear();
  window.location.href = "login.html";
}

// Armazenamento
function salvarNoLocalStorage(chave, objeto) {
  localStorage.setItem(chave, JSON.stringify(objeto));
}

function recuperarDoLocalStorage(chave, valorPadrao = null) {
  const item = localStorage.getItem(chave);
  return item ? JSON.parse(item) : valorPadrao;
}

// Validações
function validarCNPJCPF(cnpjcpf) {
  const apenasNumeros = cnpjcpf.replace(/\D/g, '');
  return apenasNumeros.length === 11 || apenasNumeros.length === 14;
}

function validarCamposObrigatorios(campos) {
  for (const campoId of campos) {
    const campo = document.getElementById(campoId);
    if (!campo || campo.value.trim() === '') {
      alert(`O campo ${campoId} é obrigatório.`);
      return false;
    }
  }
  return true;
}

// Tabelas
function limparTabela(idTabela) {
  const tbody = document.querySelector(`#${idTabela} tbody`);
  if (tbody) {
    tbody.innerHTML = "";
  }
}

// Utilitários
function confirmar(mensagem) {
  return confirm(mensagem);
}

// Inicialização
function inicializarPagina() {
  const estaLogado = localStorage.getItem("sessaoAtiva");
  if (!estaLogado && window.location.pathname !== "/login.html") {
    window.location.href = "login.html";
    return;
  }
  
  const btnLogout = document.getElementById("btnLogout");
  if (btnLogout) {
    btnLogout.addEventListener("click", logout);
  }
  
  const btnSubmenu = document.getElementById("btnSubmenu");
  if (btnSubmenu) {
    btnSubmenu.addEventListener("click", toggleSubmenu);
  }
}
// Formulário de Usuário
document.getElementById("formUsuario").addEventListener("submit", function(e) {
    e.preventDefault();

    // Verificação de campos obrigatórios
    const camposObrigatorios = ["nome", "login", "senha", "confirmarSenha"];
    if (!validarCamposObrigatorios(camposObrigatorios)) return;

    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;
    if (senha !== confirmarSenha) {
        alert("❌ As senhas não coincidem!");
        return;
    }

    const usuario = {
        nome: document.getElementById("nome").value,
        login: document.getElementById("login").value,
        senha, // cuidado: em produção deve-se criptografar
        email: document.getElementById("email").value,
        telefone: document.getElementById("telefone").value,
        cargo: document.getElementById("cargo").value,
    };

    // Armazena o usuário no localStorage (pode ser adaptado para API/BD)
    salvarNoLocalStorage("usuario_" + usuario.login, usuario);

    // Mostra popup de sucesso
    document.getElementById("popup").style.display = "flex";
});
function toggleSenha() {
    const inputSenha = document.getElementById("senha");
    inputSenha.type = inputSenha.type === "password" ? "text" : "password";
}
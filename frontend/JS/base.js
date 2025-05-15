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
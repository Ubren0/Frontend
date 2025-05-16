// Funções simplificadas para o sistema

// UI e Navegação

// Alterna a exibição do submenu e muda o ícone da seta
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

// Faz logout limpando dados e redirecionando para login
function logout() {
  localStorage.removeItem("sessaoAtiva");
  sessionStorage.clear();
  window.location.href = "login.html";
}

// Armazenamento

// Salva um objeto no localStorage como JSON
function salvarNoLocalStorage(chave, objeto) {
  localStorage.setItem(chave, JSON.stringify(objeto));
}

// Recupera um objeto do localStorage, retorna valor padrão se não existir
function recuperarDoLocalStorage(chave, valorPadrao = null) {
  const item = localStorage.getItem(chave);
  return item ? JSON.parse(item) : valorPadrao;
}

// Validações

// Valida se o valor informado é um CNPJ ou CPF (apenas verifica o tamanho)
function validarCNPJCPF(cnpjcpf) {
  const apenasNumeros = cnpjcpf.replace(/\D/g, '');
  return apenasNumeros.length === 11 || apenasNumeros.length === 14;
}

// Valida se todos os campos obrigatórios estão preenchidos
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

// Limpa todas as linhas do tbody de uma tabela
function limparTabela(idTabela) {
  const tbody = document.querySelector(`#${idTabela} tbody`);
  if (tbody) {
    tbody.innerHTML = "";
  }
}

// Utilitários

// Exibe um popup de confirmação e retorna o resultado
function confirmar(mensagem) {
  return confirm(mensagem);
}

// Inicialização

// Inicializa a página, verifica login e adiciona eventos aos botões
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

// Adiciona evento de submit ao formulário de usuário
document.getElementById("formUsuario").addEventListener("submit", function(e) {
    e.preventDefault();

    // Verificação de campos obrigatórios
    const camposObrigatorios = ["nome", "login", "senha", "confirmarSenha"];
    if (!validarCamposObrigatorios(camposObrigatorios)) return;

    // Verifica se as senhas coincidem
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;
    if (senha !== confirmarSenha) {
        alert("❌ As senhas não coincidem!");
        return;
    }

    // Cria objeto usuário com os dados do formulário
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

// Alterna a visualização da senha entre texto e password
function toggleSenha() {
    const inputSenha = document.getElementById("senha");
    inputSenha.type = inputSenha.type === "password" ? "text" : "password";
}
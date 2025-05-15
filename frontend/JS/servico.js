/**
 * Script para a página de Agendamento de Serviço
 */

// Função para pesquisar cliente pelo ID, nome ou CNPJ/CPF
function pesquisarCliente() {
    const termoPesquisa = document.getElementById('pesquisaCliente').value;
    
    // Validar se o campo de pesquisa está vazio
    if (!termoPesquisa) {
        alert('Por favor, digite um termo para pesquisa');
        return;
    }
    
    // Simulação de busca em banco de dados (em produção, substituir por chamada AJAX)
    // Aqui seria feita uma requisição ao servidor para buscar os dados do cliente
    
    // Simulando o retorno de um cliente encontrado para fins de demonstração
    const clienteEncontrado = {
        nome: "Cliente Exemplo",
        endereco: "Rua Exemplo, 123 - Cidade"
    };
    
    // Preencher os campos do formulário com os dados do cliente
    document.getElementById('nomeCliente').value = clienteEncontrado.nome;
    document.getElementById('enderecoCliente').value = clienteEncontrado.endereco;
}

// Função para agendar o serviço
function agendarServico() {
    // Capturar os dados do formulário
    const nomeCliente = document.getElementById('nomeCliente').value;
    const enderecoCliente = document.getElementById('enderecoCliente').value;
    const servicoSelecionado = document.getElementById('servico').value;
    const dataAgendamento = document.getElementById('dataAgendamento').value;
    
    // Validar se todos os campos necessários foram preenchidos
    if (!nomeCliente || !enderecoCliente || !servicoSelecionado || !dataAgendamento) {
        alert('Por favor, preencha todos os campos obrigatórios');
        return false;
    }
    
    // Aqui seria feita uma requisição ao servidor para salvar o agendamento
    // Por exemplo, usando fetch ou XMLHttpRequest
    
    // Simulação de um agendamento bem-sucedido
    console.log('Agendamento realizado com sucesso:', {
        cliente: nomeCliente,
        endereco: enderecoCliente,
        servico: servicoSelecionado,
        data: dataAgendamento
    });
    
    // Mostra o modal de sucesso (a função é chamada pelo evento de submit)
    const successModal = new bootstrap.Modal(document.getElementById('successModal'));
    successModal.show();
    
    return true;
}

// Inicialização do script quando o DOM estiver totalmente carregado
document.addEventListener('DOMContentLoaded', function() {
    // Seleciona o formulário
    const form = document.getElementById('agendamentoForm');
    
    // Adiciona listener para o evento de submit
    form.addEventListener('submit', function(event) {
        // Previne o envio padrão do formulário
        event.preventDefault();
        
        // Verifica se o formulário é válido
        if (!form.checkValidity()) {
            event.stopPropagation();
        } else {
            // Se for válido, processa o agendamento
            agendarServico();
        }
        
        // Adiciona a classe para mostrar a validação
        form.classList.add('was-validated');
    });
    
    // Configurar data mínima (hoje) para o campo de data
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('dataAgendamento').setAttribute('min', today);
});
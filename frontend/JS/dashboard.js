// Atualiza número de usuários cadastrados
function mostrarUsuarios() {
    document.getElementById("usuariosCount").textContent = "5";
}

// Atualiza número de clientes cadastrados
function mostrarClientes() {
    document.getElementById("clientesCount").textContent = "12";
}

// Executa quando a página for carregada
window.addEventListener("DOMContentLoaded", () => {
    // Atualiza estatísticas
    mostrarUsuarios();
    mostrarClientes();

    // Geração do gráfico com Chart.js
    const canvas = document.getElementById('graficoServicos');
    if (!canvas) {
        console.warn("Canvas do gráfico não encontrado!");
        return;
    }

    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
            datasets: [{
                label: 'Serviços Realizados',
                data: [10, 20, 15, 25, 18, 22],
                backgroundColor: 'rgba(34, 139, 34, 0.5)',
                borderColor: 'rgba(34, 139, 34, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Serviços por Mês'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});

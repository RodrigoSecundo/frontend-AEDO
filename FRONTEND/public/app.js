// Função para validar o formulário de cadastro de hospitais
function validarFormulario() {
    const nomeHospital = document.getElementById('nomeHospital').value;
    const localizacao = document.getElementById('localizacao').value;
    const contato = document.getElementById('contato').value;

    if (!nomeHospital || !localizacao || !contato) {
        alert('Todos os campos são obrigatórios!');
        return false;
    }
    return true;
}

// Função para enviar os dados do formulário de cadastro para o backend (via AJAX)
function enviarDadosFormulario(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Valida o formulário antes de enviar
    if (!validarFormulario()) {
        return;
    }

    // Coletando os dados do formulário
    const nomeHospital = document.getElementById('nomeHospital').value;
    const localizacao = document.getElementById('localizacao').value;
    const contato = document.getElementById('contato').value;

    const dados = {
        nome: nomeHospital,
        localizacao: localizacao,
        contato: contato
    };

    // Fazendo a requisição AJAX para o backend (usando Fetch API)
    fetch('http://localhost/hospitais/api/cadastrar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados) // Enviando os dados como JSON
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Hospital cadastrado com sucesso!');
            window.location.reload(); // Atualiza a página para mostrar os novos dados
        } else {
            alert('Erro ao cadastrar hospital. Tente novamente.');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao enviar os dados.');
    });
}

// Função para buscar a lista de hospitais e exibi-la na tela
function listarHospitais() {
    fetch('http://localhost/hospitais/api/listar')
    .then(response => response.json())
    .then(data => {
        const listaHospitais = document.getElementById('listaHospitais');
        listaHospitais.innerHTML = ''; // Limpa a lista antes de adicionar os novos itens
        
        if (data.length > 0) {
            data.forEach(hospital => {
                const li = document.createElement('li');
                li.textContent = ${hospital.nome} - ${hospital.localizacao} - ${hospital.contato};
                listaHospitais.appendChild(li);
            });
        } else {
            listaHospitais.innerHTML = '<li>Nenhum hospital encontrado.</li>';
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Não foi possível carregar a lista de hospitais.');
    });
}

// Função para exibir o formulário de cadastro de hospital
function exibirFormularioCadastro() {
    const formulario = document.getElementById('formHospital');
    formulario.style.display = 'block'; // Exibe o formulário
}

// Função para esconder o formulário de cadastro de hospital
function esconderFormularioCadastro() {
    const formulario = document.getElementById('formHospital');
    formulario.style.display = 'none'; // Esconde o formulário
}

// Adiciona os eventos quando a página for carregada
window.onload = function() {
    // Exibe a lista de hospitais assim que a página carregar
    listarHospitais();

    // Adiciona o evento de envio do formulário
    const formulario = document.getElementById('formHospital');
    formulario.addEventListener('submit', enviarDadosFormulario);

    // Adiciona os eventos para exibir/esconder o formulário
    const btnCadastrar = document.getElementById('btnCadastrar');
    const btnCancelar = document.getElementById('btnCancelar');
    
    btnCadastrar.addEventListener('click', exibirFormularioCadastro);
    btnCancelar.addEventListener('click', esconderFormularioCadastro);
};
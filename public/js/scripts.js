// Criação do JSON que será exibido na parte direita da tela
let objeto = {
    pessoas: [
        
    ]
}

// Token para as requisições
const token = document.querySelector('meta[name="csrf-token"]').content;

// Função para atualizar o JSON e mostrá-lo em formato amigável com 8 espaços de indentação
function atualizarJson(){
    textarea.innerHTML = JSON.stringify(objeto, null, 8)
}

// Já atualiza o JSON assim que carrega
atualizarJson()

// Popular o tbody da tabela exibida à esquerda. Para isso será usado o JSON
function popularTbody(){

    // Esvaziando o conteúdo
    document.getElementById('tbody').innerHTML = '';

    // Definindo o tbody
    let tbody = document.getElementById('tbody')

    /**  
     *  Para cada pessoa existente no JSON, será criada uma linha com 2 colunas: uma com seu nome e
     *  a outra com o botão de remover e também outra linha com o botão de adicionar filho
     */
    objeto.pessoas.forEach((pessoa, indice_pessoa) => {
        
        tbody.innerHTML += `
            <tr id="linha_pessoa_${indice_pessoa}" style="background-color:#e3e3e3">
                <td>${pessoa.nome}</td>
                <td><button class="form-control" onclick="rmPessoa(this)">Remover</button></td>
            </tr>`
        
        /**
         *  Para cada filho que for incluído, será inserida uma linha com 2 colunas: uma com seu nome e
         *  a outra com o botão de remover e também outra linha com o botão de remover este filho
         */
        pessoa.filhos.forEach((filho, indice_filho) => {
            tbody.innerHTML += `
                <tr id="linha_filho_${indice_filho}_pessoa_${indice_pessoa}">
                    <td><ul style="list-style-type: '- '"><li>${filho}</li></ul></td>
                    <td><button class="form-control" onclick="rmFilho(this)">Remover filho</button></td>
                </tr>`
        })
        tbody.innerHTML += `
            <tr>
                <td colspan="2" class="px-5"><button class="form-control" id="addfilho_${objeto.pessoas.indexOf(pessoa)}" onclick="addFilho(this)">add filho</button></td>
            </tr>`
        
    })
}

// Para incluir uma pessoa
function incluirPessoa(){
    let nome = document.getElementById('name').value

    // Só vai incluir uma pessoa se o nome não estiver em branco
    if(nome != ''){

        // Adicionando o objeto ao array de pessoas com a lista de filhos vazia e pronta para receber dados
        objeto.pessoas.push({"nome": nome, "filhos": []})

        // Atualizando o JSON
        atualizarJson()

        // Atualizando a tabela
        popularTbody()

        // Esvaziando o campo de texto
        document.getElementById('name').value = ''
    }else{
        // Se o nome estiver em branco, vem um alerta para o usuário
        alerta('Por favor, insira o nome')
    }
}

// Para remover uma pessoa
function rmPessoa(elemento){
    // Foram inseridos id's nos elementos da tabela para ajudar a encontrar os índices
    let indice = elemento.closest('tr').id.split('_')[2]

    // Apagando a linha da tabela correspondente à pessoa removida
    elemento.closest('tr').remove()

    // Removendo também o botão de adicionar filho desta pessoa
    document.getElementById(`addfilho_${indice}`).remove()
    
    // Removendo a pessoa do JSON
    objeto.pessoas.splice(indice, 1)
    
    // Atualizando o JSON
    atualizarJson()

    // Atualizando a tabela
    popularTbody()
}

// Para remover um filho
function rmFilho(elemento){
    // Foram inseridos id's nos elementos da tabela para ajudar a encontrar os índices
    let indice_filho = elemento.closest('tr').id.split('_')[2] // índice 2 do array depois de separado
    let indice_pessoa = elemento.closest('tr').id.split('_')
    indice_pessoa = indice_pessoa[indice_pessoa.length -1] // Pegando o último item com o número desejado

    // Definindo que os filhos são da pessoa com o índice abaixo
    let array_filhos = objeto.pessoas[indice_pessoa].filhos

    /*  O splice funcionou de forma diferente dependendo da ordem de exclusão dos filhos 
        Se +ou- 3 filhos são excluídos em ordem crescente de criação, o último não é excluído.
        Para prevenir, foi analisado se há mais de 1 item no array. Quando não houver, é usada
        a função pop() que vai excluir de qualquer forma.
    */
    if(array_filhos.length > 1){
        array_filhos.splice(indice_filho, 1);
    }else{
        array_filhos.pop()
    }

    // Atualizando o JSON
    atualizarJson()

    // Atualizando a tabela
    popularTbody()
}

// Função para adicionar um filho
function addFilho(elemento){

    // Um prompt customizável do sweetalert2
    Swal.fire({
        title: 'Insira o nome do filho',
        html: '<input type="text" class="form-control" id="nome_filho">', // O campo de texto
        showCancelButton: true, // Mostrar botão de cancelar
        confirmButtonColor: '#3085d6', // Definindo cor do botão de confirmar
        cancelButtonColor: '#d33', // Definindo cor do botão de cancelar
        confirmButtonText: 'Incluir', // Definindo texto do botão de confirmação
        cancelButtonText: 'Cancelar' // Definindo texto do botão de cancelamento
    
    }).then((result) => { // Qualquer evento no prompt vai gerar um 'result'
        
        // De onde vem o nome do filho inserido
        let nome_filho = document.getElementById('nome_filho').value;
        
        // Se o usuário clicar em confirmar...
        if (result.isConfirmed) {
            
            // Só vai inserir se o nome não for vazio
            if(nome_filho != ''){
                
                // Inserindo o filho no json
                objeto.pessoas[elemento.id.split('_')[1]].filhos.push(nome_filho)

                // Atualizando o JSON
                atualizarJson()

                // Atualizando a tabela
                popularTbody()
            }else{            

                // Caso tente incluir o filho sem nome...
                alerta('Por favor, insira o nome')
            }
        }
    })
}

// Alerta do sweetalert2, que recebe uma mensagem no parâmetro, dependendo da situação
function alerta(mensagem){
    Swal.fire({
        html: mensagem,
        showConfirmButton: false, // Não precisa de botão 'ok'
        timer: 2000 // Ficará exibido por 2 segundos
    })
}

function gravar(){
    // Só vai ser permitido gravar, se o objeto tiver alguma pessoa incluída
    if(objeto.pessoas.length > 0){
    
        // Fazendo a requisição POST via fetch em cima da url base + url da rota tipo apiResource
        fetch(`${window.location.origin}/people`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": token // é o token declarado início do código
            },
            // Enviando no corpo da requisição o array de passoas do objeto em formato JSON
            body: JSON.stringify({
                pessoas: objeto.pessoas
            })
        })
        
        .then(response => response.json())
        
        // Tratando os dados vindos da requisição
        .then(data => {

            // Se a resposta for 'ok', vem um tipo de aviso. Se for 'error', vem outro.
            if(data.response == 'ok'){
                alerta(`<i class="bi bi-check-circle-fill text-success"></i> ${data.message}`)
            }else if(data.response == 'error'){
                alerta(`<i class="bi bi-x-circle-fill text-danger"></i> ${data.message}`)
            }
        })
        .catch(error => console.log(error))
    }else{
        // Se não tiver sido incluída nenhuma pessoa, vem um alerta
        alerta('Por favor, inclua pelo menos uma pessoa');
    }
}

function ler(){
    // Fazendo a requisição GET via fetch em cima da url base + url da rota tipo apiResource
    fetch(`${window.location.origin}/people`, {

        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": token // é o token declarado início do código
        }
    })
    .then(response => response.json())
    .then(data => {
            
            // "zerando" o array do objeto"
            objeto.pessoas = []

            // Atualizando o JSON
            atualizarJson()

            // Atualizando a tabela
            popularTbody()

            // Tratando os dados vindos da requisição
            data.forEach(dado => {

                // Criando um array que receberá apenas os nomes dos filhos
                let filhos = [];

                // Pegando cada nome de filho da pessoa deste loop
                dado.children.forEach(filho => {

                    // Inserindo o nome na lista de filhos da pessoa deste loop
                    filhos.push(filho.name)
                })

                // Inserindo a pessoa deste loop no array do objeto
                objeto.pessoas.push({
                    "nome": dado.name,
                    "filhos": filhos                    
                })
            });

           // Atualizando o JSON
           atualizarJson()

           // Atualizando a tabela
           popularTbody()
        })
    .catch(error => console.log(error))
}
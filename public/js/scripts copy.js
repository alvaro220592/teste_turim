let obj = {"pessoas": []}

textarea.innerHTML = JSON.stringify(obj, null, 4)

function incluirPessoa(){

    // Indicando o valor que representa o nome da pessoa, vindo do campo de texto
    let nome = document.getElementById('name').value

    // indicando o textarea que exibirá o json
    let textarea = document.getElementById('textarea')    

    // Inserindo o valor incluído no objeto
    let inclusao_pessoa = {"Nome": nome, "Filhos": []}
    obj.pessoas.push(inclusao_pessoa)

    // populando o textarea com a nova pessoa incluída no objeto
    textarea.innerHTML = JSON.stringify(obj, null, 4)

    let tbody = document.getElementById('tbody');

    tbody.innerHTML += `
        <tr id="pessoa_${obj.pessoas.indexOf(inclusao_pessoa)}" style="border-bottom-color: transparent">
            <td>${inclusao_pessoa.Nome}</td>
            <td><button type="button" class="form-control" onclick="removerPessoa(this, obj.pessoas, obj)">Remover</button></td>
        </tr>
        <tr id="linha_botao_adicionar_filho_${obj.pessoas.indexOf(inclusao_pessoa)}">
            <td colspan="2" class="px-5">
                <button type="button" id="${obj.pessoas.indexOf(inclusao_pessoa)}" class="form-control" onclick="addFilho(this)">
                    Adicionar filho
                </button>
            </td>
        </tr>
    `
}

/**
 * Função responsável por cuidar da exclusão de um item do array de pessoas
 * Exclui também a linha correspodente na tabela de exibição
 * Mostra o JSON atualizado
 */
function removerPessoa(elemento, array, objeto){
    let indice = elemento.closest('tr').id.replace('pessoa_', '')
    document.getElementById(`linha_botao_adicionar_filho_${indice}`).remove()
    array.splice(indice, 1)
    elemento.closest('tr').remove()    
    textarea.innerHTML = JSON.stringify(objeto, null, 4)
}

function addFilho(elemento){
    Swal.fire({
        title: 'Insira o nome do filho',
        html: '<input type="text" class="form-control" id="nome_filho">',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Incluir',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        // Se o usuário clicar em confirmar...
        if (result.isConfirmed) {

            // Definindo que o nome do filho é o que vem do campo
            let nome_filho = document.getElementById('nome_filho').value

            // Adicionando o novo filho ao JSON exibido
            obj.pessoas[elemento.id].Filhos.push(nome_filho)
            
            // Mostrando o JSON atualizado
            textarea.innerHTML = JSON.stringify(obj, null, 4)

            let indice_filho_atual = obj.pessoas[elemento.id].Filhos.indexOf(obj.pessoas[elemento.id].Filhos[obj.pessoas[elemento.id].Filhos.length -1]);

            // Criando um elemento de uma nova linha para receber o novo filho
            let linha = document.createElement('tr')
            linha.setAttribute('id', `filho_${indice_filho_atual}_pessoa_${elemento.id}`)
            
            // Definindo o conteúdo interno da linha
            linha.innerHTML = `
                <td>
                    <ul style="list-style-type: '- '">
                        <li>${nome_filho}</li>
                    </ul>
                </td>
                <td>
                    <button type="button" id="" class="form-control" data-parent="${elemento.id}" onclick="removerFilho(this, obj.pessoas[${elemento.id}].Filhos, obj)">Remover filho</button>
                </td>
            `
            // Adicionando a linha criada ao final
            // document.getElementById(`lista_filhos_pessoa_${elemento.id}`).insertAdjacentElement('afterend', linha);
            document.getElementById(`linha_botao_adicionar_filho_${elemento.id}`).insertAdjacentElement('beforebegin', linha);
        }
    })
}

/**
 * remove um filho recebendo alguns dados referentes ao botão clicado(elemento),
 */
function removerFilho(elemento, array_filhos, objeto){
    // 
    let indice_filho = elemento.closest('tr').id.split('_')[1]

    if(array_filhos.length > 1){

        array_filhos.splice(indice_filho, 1);
    }else{
        array_filhos.pop()
    }
    
    // objeto.pessoas[elemento.getAttribute('data-parent')].Filhos.splice(indice_filho, 2);
    
    // delete objeto.pessoas[elemento.getAttribute('data-parent')].Filhos[indice_filho];
    

    // objeto.pessoas[elemento.getAttribute('data-parent')].Filhos.filter(function (el) {
    //     return el != null;
    // });

    console.log( array_filhos.length)
    textarea.innerHTML = JSON.stringify(objeto, null, 4)
    // Atualizando o textarea com o JSON reformulado

    // console.log(objeto);


    // removendo a linha de onde estava o filho
    elemento.parentElement.closest('tr').remove()    
}

function verObj(){

    
    console.log(obj);
}
let objeto = {
    pessoas: [
        
    ]
}

atualizarJson()

function popularTbody(){

    document.getElementById('tbody').innerHTML = '';

    let tbody = document.getElementById('tbody')
    objeto.pessoas.forEach((pessoa, indice_pessoa) => {
        tbody.innerHTML += '<tr id="linha_pessoa_'+indice_pessoa+'" style="background-color:#e3e3e3"><td>'+pessoa.nome+'</td><td><button class="form-control" onclick="rmPessoa(this)">Remover</button></td></tr>'
        pessoa.filhos.forEach((filho, indice_filho) => {
            tbody.innerHTML += '<tr id="linha_filho_'+indice_filho+'_pessoa_'+indice_pessoa+'"><td><ul style="list-style-type: \'- \'"><li>'+filho+'</li></ul></td><td><button class="form-control" onclick="rmFilho(this)">Remover filho</button></td></tr>'
        })
        tbody.innerHTML += '<tr><td colspan="2" class="px-5"><button class="form-control" id="addfilho_'+objeto.pessoas.indexOf(pessoa)+'" onclick="addFilho(this)">add filho</button></td></tr>'
        
    })
}

function incluirPessoa(){
    let nome = document.getElementById('name').value
    if(nome != ''){
        objeto.pessoas.push({"nome": nome, "filhos": []})
        atualizarJson()
        popularTbody()
    }else{
        alerta()
    }
}

function rmPessoa(elemento){
    let indice = elemento.closest('tr').id.split('_')[2]
    elemento.closest('tr').remove()
    document.getElementById(`addfilho_${indice}`).remove()
    
    
    objeto.pessoas.splice(indice, 1)
    
    atualizarJson()
    popularTbody()
}

function rmFilho(elemento){
    let indice_filho = elemento.closest('tr').id.split('_')[2]
    let indice_pessoa = elemento.closest('tr').id.split('_')
    indice_pessoa = indice_pessoa[indice_pessoa.length -1]

    let array_filhos = objeto.pessoas[indice_pessoa].filhos

    if(array_filhos.length > 1){
        array_filhos.splice(indice_filho, 1);
    }else{
        array_filhos.pop()
    }
    atualizarJson()
    popularTbody()
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
        let nome_filho = document.getElementById('nome_filho').value;
        if (result.isConfirmed) {
            if(nome_filho != ''){
                
                // Inserindo o filho no json
                objeto.pessoas[elemento.id.split('_')[1]].filhos.push(nome_filho)
                atualizarJson()
                popularTbody()
            }else{            
                alerta()
            }
        }
    })
}

function atualizarJson(){
    textarea.innerHTML = JSON.stringify(objeto, null, 4)
}

function alerta(){
    Swal.fire({
        text: 'Por favor, insira o nome',
        showConfirmButton: false,
        timer: 1500
    })
}
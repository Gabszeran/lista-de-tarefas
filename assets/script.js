// Função para adicionar um novo lembrete à lista
function adicionarLembrete() {
    // Obtém o valor do novo lembrete e remove espaços extras
    const novoLembrete = document.getElementById('novo-lembrete').value.trim();
    
    // Verifica se o lembrete não está vazio
    if (novoLembrete) {
        // Cria um novo item de lista (li) com o lembrete
        const li = criarLembrete(novoLembrete);
        
        // Adiciona o novo item de lista à lista de lembretes
        document.getElementById('lista').appendChild(li);
        
        // Limpa o campo de entrada de novo lembrete
        document.getElementById('novo-lembrete').value = '';
    } else {
        // Exibe um alerta se o campo de lembrete estiver vazio
        alert('Por favor, digite um lembrete.');
    }
}

// Função para criar um novo elemento de lembrete (li)
function criarLembrete(textoLembrete) {
    const li = document.createElement('li');

    // Cria a imagem de círculo para marcar como concluído
    const imgCirculo = criarImagem('assets/img/circulo.png', 'Concluir', () => concluirLembrete(li, imgCirculo));

    // Cria a imagem de lápis para editar o lembrete
    const imgEditar = criarImagem('assets/img/lapis.png', 'Editar', () => editarLembrete(li, textoLembrete));

    // Cria a imagem de lixo para excluir o lembrete
    const imgExcluir = criarImagem('assets/img/lixo.png', 'Excluir', () => li.remove());

    // Cria um container para os ícones
    const iconsContainer = document.createElement('div');
    iconsContainer.classList.add('icons');
    iconsContainer.appendChild(imgEditar);
    iconsContainer.appendChild(imgExcluir);

    // Cria o elemento de texto do lembrete
    const textoLembreteElement = document.createElement('span');
    textoLembreteElement.classList.add('texto-lembrete');
    textoLembreteElement.textContent = textoLembrete;

    // Adiciona as imagens e o texto do lembrete ao elemento li
    li.appendChild(imgCirculo);
    li.appendChild(textoLembreteElement);
    li.appendChild(iconsContainer);

    return li;
}

// Função para criar um elemento de imagem com evento de clique
function criarImagem(src, alt, eventoClique) {
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.width = 15;
    img.height = 15;
    img.className = alt.toLowerCase();
    img.onclick = eventoClique;
    return img;
}

// Função para editar o texto de um lembrete
function editarLembrete(li, textoLembrete) {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = textoLembrete;
    input.classList.add('input-editar-lembrete'); // Adiciona a classe

    // Substitui o texto do lembrete pelo campo de entrada
    const textoLembreteElement = li.querySelector('.texto-lembrete');
    li.replaceChild(input, textoLembreteElement);
    input.focus();

    // Função para salvar o novo texto do lembrete
    function salvarLembrete() {
        const novoTextoLembrete = input.value.trim();
        if (novoTextoLembrete) {
            textoLembreteElement.textContent = novoTextoLembrete;
        } else {
            textoLembreteElement.textContent = textoLembrete;
        }
        li.replaceChild(textoLembreteElement, input);
    }

    // Adiciona um evento de tecla ao campo de entrada
    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            salvarLembrete();
        }
    });

    // Adiciona um evento de perda de foco ao campo de entrada
    input.addEventListener('blur', () => {
        salvarLembrete();
    });
}

// Função para marcar um lembrete como concluído
function concluirLembrete(li, imgCirculo) {
    // Altera a imagem de círculo para uma versão preenchida
    imgCirculo.src = 'assets/img/circulo-preenchido.png';

    // Remove os eventos anteriores para evitar comportamentos inesperados
    imgCirculo.onclick = null;

    // Espera 500 milissegundos antes de mover o lembrete concluído
    setTimeout(() => {
        const imgEditar = li.querySelector('.editar');
        const imgExcluir = li.querySelector('.excluir');

        // Remove as imagens de editar e excluir
        imgEditar.remove();
        imgExcluir.remove();

        // Adiciona a funcionalidade para retornar o lembrete à lista inicial
        imgCirculo.onclick = () => voltarParaListaInicial(li, imgCirculo);

        // Move o lembrete concluído para a lista de concluidos
        document.getElementById('lista-concluidos').appendChild(li);

        // Adiciona a classe 'hidden' para ocultar o lembrete
        li.classList.add('hidden');
    }, 500);
}

// Função para retornar um lembrete concluído à lista inicial
function voltarParaListaInicial(li, imgCirculo) {
    // Altera a imagem de círculo para a versão não preenchida
    imgCirculo.src = 'assets/img/circulo.png';

    // Remove os eventos anteriores para evitar comportamentos inesperados
    imgCirculo.onclick = null;

    // Adiciona novamente as imagens de editar e excluir
    const imgEditar = criarImagem('assets/img/lapis.png', 'Editar', () => editarLembrete(li, li.querySelector('.texto-lembrete').textContent));
    const imgExcluir = criarImagem('assets/img/lixo.png', 'Excluir', () => li.remove());

    const iconsContainer = li.querySelector('.icons');
    iconsContainer.appendChild(imgEditar);
    iconsContainer.appendChild(imgExcluir);

    // Adiciona a funcionalidade para concluir o lembrete novamente
    imgCirculo.onclick = () => concluirLembrete(li, imgCirculo);

    // Move o lembrete de volta para a lista inicial
    document.getElementById('lista').appendChild(li);

    // Remove a classe 'hidden' para mostrar o lembrete
    li.classList.remove('hidden');
}

// Função para alternar a visibilidade da lista de lembretes concluídos
function mostrarConcluidos() {
    document.getElementById('lista-concluidos').classList.toggle('hidden');
}

// Adiciona um evento de tecla ao campo de novo lembrete
document.getElementById('novo-lembrete').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') adicionarLembrete();
});

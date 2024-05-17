function adicionarLembrete() {
    const novoLembrete = document.getElementById('novo-lembrete').value.trim();
    if (novoLembrete) {
        const li = criarLembrete(novoLembrete);
        document.getElementById('lista').appendChild(li);
        document.getElementById('novo-lembrete').value = '';
    } else {
        alert('Por favor, digite um lembrete.');
    }
}

function criarLembrete(textoLembrete) {
    const li = document.createElement('li');
    const imgCirculo = criarImagem('assets/img/circulo.png', 'Concluir', () => concluirLembrete(li, imgCirculo));
    const imgEditar = criarImagem('assets/img/lapis.png', 'Editar', () => editarLembrete(li, textoLembrete));
    const imgExcluir = criarImagem('assets/img/lixo.png', 'Excluir', () => li.remove());

    li.appendChild(imgCirculo);
    li.appendChild(document.createTextNode(textoLembrete));
    li.appendChild(imgEditar);
    li.appendChild(imgExcluir);

    return li;
}

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

function editarLembrete(li, textoLembrete) {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = textoLembrete;
    li.replaceChild(input, li.childNodes[1]);
    input.focus();
    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const novoTextoLembrete = input.value;
            li.replaceChild(document.createTextNode(novoTextoLembrete), input);
        }
    });
}

function concluirLembrete(li, imgCirculo) {
    imgCirculo.src = 'assets/img/circulo-preenchido.png';
    setTimeout(() => {
        const imgEditar = li.querySelector('.editar');
        const imgExcluir = li.querySelector('.excluir');
        imgEditar.remove();
        imgExcluir.remove();
        document.getElementById('lista-concluidos').appendChild(li);
        li.classList.add('hidden');
    }, 500);
}

function mostrarConcluidos() {
    document.getElementById('lista-concluidos').classList.toggle('hidden');
}

document.getElementById('novo-lembrete').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') adicionarLembrete();
});

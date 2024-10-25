function cadastrarMusica(titulo, artista, genero, duracao) {
  let musicas = JSON.parse(localStorage.getItem('musicas'));
  if (!musicas) {
      musicas = [];
  }
  musicas.push({
      titulo: titulo,
      artista: artista,
      genero: genero,
      duracao: duracao
  });
  localStorage.setItem('musicas', JSON.stringify(musicas));
}

function exibirMusicas() {
  let musicas = JSON.parse(localStorage.getItem('musicas'));
  let html = '';

  if (musicas) {
      musicas.forEach((musica, index) => {
          html += `
              <div>
                  <h4>${musica.titulo}</h4>
                  <p>Artista: ${musica.artista}</p>
                  <p>Gênero: ${musica.genero}</p>
                  <p>Duração: ${musica.duracao}</p>
                  <button class="excluir-musica" data-index="${index}">Excluir</button>
              </div>
          `;
      });
  }

  document.getElementById('musicas-cadastradas').innerHTML = html;

  // Adicionar evento de clique ao botão de exclusão
  document.querySelectorAll('.excluir-musica').forEach(button => {
      button.addEventListener('click', function() {
          let index = this.getAttribute('data-index');
          let musicas = JSON.parse(localStorage.getItem('musicas'));
          musicas.splice(index, 1);
          localStorage.setItem('musicas', JSON.stringify(musicas));
          exibirMusicas();
      });
  });
}

document.getElementById('form-cadastrar-musica').addEventListener('submit', function(event) {
  event.preventDefault();

  let titulo = document.getElementById('titulo').value;
  let artista = document.getElementById('artista').value;
  let genero = document.getElementById('genero').value;
  let duracao = document.getElementById('duracao').value;

  if (titulo && artista && genero && duracao) { // Verificação básica
      cadastrarMusica(titulo, artista, genero, duracao);
      exibirMusicas();

      // Limpa os campos após o cadastro
      this.reset();
  } else {
      alert('Por favor, preencha todos os campos!');
  }
});

exibirMusicas();

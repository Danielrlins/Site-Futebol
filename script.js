const jogadores = [];

function salvarNoLocalStorage() {
  localStorage.setItem('jogadores', JSON.stringify(jogadores));
}

function carregarDoLocalStorage() {
  const dados = localStorage.getItem('jogadores');
  if (dados) {
    jogadores.push(...JSON.parse(dados));
    exibirJogadores();
  }
}

function adicionarJogador() {
  const nome = document.getElementById('nome').value.trim();
  const estrela = parseInt(document.getElementById('estrela').value);

  if (!nome || isNaN(estrela) || estrela < 1 || estrela > 5) {
    alert('Digite um nome válido e uma estrela entre 1 e 5.');
    return;
  }

  jogadores.push({ nome, estrela });

  document.getElementById('nome').value = '';
  document.getElementById('estrela').value = '';

  salvarNoLocalStorage();
  exibirJogadores();
}

function removerJogador(index) {
  jogadores.splice(index, 1);
  salvarNoLocalStorage();
  exibirJogadores();
}

function limparJogadores() {
  if (confirm('Tem certeza que deseja remover todos os jogadores?')) {
    jogadores.length = 0;
    localStorage.removeItem('jogadores');         // Remove os jogadores
    localStorage.removeItem('timesOrganizados');  // Remove os times sorteados
    localStorage.removeItem('partidas');
    salvarNoLocalStorage();
    exibirJogadores();
    document.querySelector('.times-container').innerHTML = '';
  }
}

function exibirJogadores() {
  const lista = document.getElementById('listaJogadores');
  const contador = document.getElementById('contador');

  lista.innerHTML = '';

  jogadores.forEach((jogador, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
    <span >${jogador.nome} - ⭐${jogador.estrela}</span>
    <button class="remover" onclick="removerJogador(${index})">×</button>
   `;

    lista.appendChild(li);
  });

  contador.textContent = jogadores.length;
}

function sortearTimes() {
  const quantidadeTimes = parseInt(document.getElementById('quantidadeTimes').value);
  const tamanhoTime = parseInt(document.getElementById('tamanhoTime').value);
  const totalNecessario = quantidadeTimes * tamanhoTime;

  if (jogadores.length < totalNecessario) {
    alert(`Adicione pelo menos ${totalNecessario} jogadores para formar ${quantidadeTimes} times de ${tamanhoTime}.`);
    return;
  }

  // Embaralha e ordena por estrelas (decrescente)
  const jogadoresEmbaralhados = [...jogadores].sort(() => Math.random() - 0.5);
  jogadoresEmbaralhados.sort((a, b) => b.estrela - a.estrela);

  // Cria arrays para os times
  const times = [];
  for(let i = 0; i < quantidadeTimes; i++) {
    times.push({
      jogadores: [],
      estrelas: 0
    });
  }

  // Distribuir jogadores equilibrando estrelas
  for (const jogador of jogadoresEmbaralhados) {
    // Ordena times pelo menor total de estrelas e espaço disponível
    times.sort((a, b) => a.estrelas - b.estrelas);

    for (const time of times) {
      if (time.jogadores.length < tamanhoTime) {
        time.jogadores.push(jogador);
        time.estrelas += jogador.estrela;
        break;
      }
    }
  }

  // Salva os times no localStorage
  localStorage.setItem('timesOrganizados', JSON.stringify(times));

  mostrarTimes(times);
}

function mostrarTimes(times) {
  const container = document.querySelector('.times-container');
  container.innerHTML = ''; // Limpa

  times.forEach((time, index) => {
    const div = document.createElement('div');
    const h2 = document.createElement('h2');
    h2.textContent = `Time ${index + 1} - Total Estrelas: ${time.estrelas}`;
    div.appendChild(h2);

    const ul = document.createElement('ul');

    time.jogadores.forEach(jogador => {
      const li = document.createElement('li');
      li.textContent = `${jogador.nome} - ⭐${jogador.estrela}`;
      ul.appendChild(li);
    });

    div.appendChild(ul);
    container.appendChild(div);
  });
}

 function visualizarCampo() {
      const loading = document.getElementById("loading");
      loading.classList.add("mostrar");

      setTimeout(() => {
        window.location.href = "campo.html";
      }, 2000); // tempo para a animação (~1.5 segundos)
    }

// Carrega os jogadores salvos assim que a página carrega
window.onload = carregarDoLocalStorage;

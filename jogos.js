const timeASelect = document.getElementById('timeA');
const timeBSelect = document.getElementById('timeB');

const times = JSON.parse(localStorage.getItem('timesOrganizados')) || [];

times.forEach((time, index) => {
  const optionA = new Option(`Time ${index + 1} - ⭐${time.estrelas}`, index);
  const optionB = new Option(`Time ${index + 1} - ⭐${time.estrelas}`, index);
  timeASelect.appendChild(optionA);
  timeBSelect.appendChild(optionB);
});

document.getElementById('formJogo').addEventListener('submit', (e) => {
  e.preventDefault();

  const a = +timeASelect.value;
  const b = +timeBSelect.value;

  if (a === b) {
    alert("Selecione times diferentes.");
    return;
  }

  const placarA = +document.getElementById('placarA').value;
  const placarB = +document.getElementById('placarB').value;
  const amarelosA = +document.getElementById('amarelosA').value;
  const amarelosB = +document.getElementById('amarelosB').value;
  const vermelhosA = +document.getElementById('vermelhosA').value;
  const vermelhosB = +document.getElementById('vermelhosB').value;
  const atrasosA = +document.getElementById('atrasosA').value;
  const atrasosB = +document.getElementById('atrasosB').value;

  function calcularPontos(golsPro, golsContra, amarelos, vermelhos, atrasos) {
    let pontos = 0;
    if (golsPro > golsContra) pontos += 3;
    else if (golsPro === golsContra) pontos += 1;

    pontos -= (amarelos * 2 + vermelhos * 5 + atrasos);
    return pontos;
  }

  const resultado = {
    timeA: times[a].nome || `Time ${a + 1}`,
    timeB: times[b].nome || `Time ${b + 1}`,
    placar: `${placarA} x ${placarB}`,
    pontosA: calcularPontos(placarA, placarB, amarelosA, vermelhosA, atrasosA),
    pontosB: calcularPontos(placarB, placarA, amarelosB, vermelhosB, atrasosB),
    data: new Date().toLocaleString()
  };

  const partidas = JSON.parse(localStorage.getItem('partidasRegistradas')) || [];
  partidas.push(resultado);
  localStorage.setItem('partidasRegistradas', JSON.stringify(partidas));

  alert("Jogo registrado com sucesso!");
  document.getElementById('formJogo').reset();
});

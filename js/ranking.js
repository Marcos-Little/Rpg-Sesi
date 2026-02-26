const API_URL = "https://659fce55-7f63-4951-b3c5-f9b73ddb10a0-00-2tlr249v91xk0.picard.replit.dev";

const listaRanking = document.getElementById("listaRanking");
const btnVoltar = document.getElementById("btnVoltar");

async function buscarRanking() {
  const res = await fetch(`${API_URL}/alunos`);
  const alunos = await res.json();

  // ordena: level desc, xp desc
  alunos.sort((a, b) => {
    if ((b.level ?? 1) !== (a.level ?? 1)) {
      return (b.level ?? 1) - (a.level ?? 1);
    }
    return (b.xp ?? 0) - (a.xp ?? 0);
  });

  renderizarRanking(alunos);
}

function renderizarRanking(alunos) {
  listaRanking.innerHTML = "";

  alunos.forEach((aluno, index) => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <img src="${aluno.avatar || "https://api.dicebear.com/7.x/adventurer/svg?seed=" + aluno.usuario}" />
      <div>
        <h3>#${index + 1} - ${aluno.nome}</h3>
        <div class="status">🔼 Level: ${aluno.level ?? 1}</div>
        <div class="status">⭐ XP: ${aluno.xp ?? 0}</div>
        <div class="status">❤️ HP: ${aluno.hp ?? 100}</div>
      </div>
    `;

    listaRanking.appendChild(div);
  });
}

btnVoltar.addEventListener("click", () => {
  history.back();
});

buscarRanking();
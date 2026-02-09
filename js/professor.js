const API_URL = "https://659fce55-7f63-4951-b3c5-f9b73ddb10a0-00-2tlr249v91xk0.picard.replit.dev";

const listaAlunos = document.getElementById("listaAlunos");
const btnDarXpTodos = document.getElementById("btnDarXpTodos");
const btnTirarHpTodos = document.getElementById("btnTirarHpTodos");

async function buscarAlunos() {
  const res = await fetch(`${API_URL}/alunos`);
  const alunos = await res.json();
  renderizarAlunos(alunos);
}

function calcularLevel(xp) {
  return Math.floor(xp / 100) + 1;
}

function renderizarAlunos(alunos) {
  listaAlunos.innerHTML = "";

  alunos.forEach(aluno => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <img src="${aluno.avatar || "https://api.dicebear.com/7.x/adventurer/svg?seed=" + aluno.usuario}" />
      <h3>${aluno.nome}</h3>
      <div class="status">❤️ HP: ${aluno.hp ?? 100}</div>
      <div class="status">⭐ XP: ${aluno.xp ?? 0}</div>
      <div class="status">🔼 Level: ${aluno.level ?? 1}</div>

      <div class="acoes">
        <button class="btn-xp">+10 XP</button>
        <button class="btn-hp">-10 HP</button>
      </div>
    `;

    div.querySelector(".btn-xp").addEventListener("click", () => {
      atualizarAluno(aluno, { xp: (aluno.xp ?? 0) + 10 });
    });

    div.querySelector(".btn-hp").addEventListener("click", () => {
      atualizarAluno(aluno, { hp: Math.max(0, (aluno.hp ?? 100) - 10) });
    });

    listaAlunos.appendChild(div);
  });
}

async function atualizarAluno(aluno, changes) {
  const novoXp = changes.xp !== undefined ? changes.xp : aluno.xp ?? 0;
  const novoLevel = calcularLevel(novoXp);

  const body = {
    ...aluno,
    ...changes,
    level: novoLevel
  };

  await fetch(`${API_URL}/alunos/${aluno.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  buscarAlunos();
}

// Ações em massa
btnDarXpTodos.addEventListener("click", async () => {
  const valor = Number(document.getElementById("valorXp").value || 0);
  if (valor <= 0) return alert("Informe um valor de XP válido!");

  const res = await fetch(`${API_URL}/alunos`);
  const alunos = await res.json();

  await Promise.all(alunos.map(aluno => {
    const novoXp = (aluno.xp ?? 0) + valor;
    return fetch(`${API_URL}/alunos/${aluno.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...aluno,
        xp: novoXp,
        level: calcularLevel(novoXp)
      })
    });
  }));

  buscarAlunos();
});

btnTirarHpTodos.addEventListener("click", async () => {
  const valor = Number(document.getElementById("valorHp").value || 0);
  if (valor <= 0) return alert("Informe um valor de HP válido!");

  const res = await fetch(`${API_URL}/alunos`);
  const alunos = await res.json();

  await Promise.all(alunos.map(aluno => {
    const novoHp = Math.max(0, (aluno.hp ?? 100) - valor);
    return fetch(`${API_URL}/alunos/${aluno.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...aluno,
        hp: novoHp
      })
    });
  }));

  buscarAlunos();
});

// Inicializa
buscarAlunos();

const aluno = JSON.parse(localStorage.getItem("alunoLogado"));

if (!aluno) {
  window.location.href = "login.html";
}

document.getElementById("nome").textContent = aluno.nome;
document.getElementById("classe").textContent = aluno.classe || "Aventureiro";
document.getElementById("hp").textContent = aluno.hp ?? 100;
document.getElementById("xp").textContent = aluno.xp ?? 0;
document.getElementById("level").textContent = aluno.level ?? 1;
document.getElementById("historia").textContent = aluno.historia || "Sua jornada está só começando...";
document.getElementById("avatar").src = aluno.avatar || "https://api.dicebear.com/7.x/adventurer/svg?seed=player";

const hpMax = 100;
const xpParaProximoLevel = 100;

const hpAtual = aluno.hp ?? 100;
const xpAtual = aluno.xp ?? 0;

document.getElementById("barraHp").style.width = `${Math.max(0, Math.min(100, (hpAtual / hpMax) * 100))}%`;
document.getElementById("barraXp").style.width = `${Math.max(0, Math.min(100, (xpAtual / xpParaProximoLevel) * 100))}%`;

document.getElementById("btnSair").addEventListener("click", () => {
  localStorage.removeItem("alunoLogado");
  window.location.href = "login.html";
});

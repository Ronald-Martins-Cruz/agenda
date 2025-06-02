import { calendario, exibirMes } from "./exibirMes.js";
import { mesNoButton, anoNoButton, mesesDoAno } from "./selecionarMes.js";


calendario.addEventListener("click", async function (event) {
    if (event.target.classList.contains("delete")) {
        const tarefa = event.target.closest(".tarefa");
        const tarefaId = tarefa.dataset.id;
        const tipo = tarefa.dataset.tipo;

        try {
            const response = await fetch(`/controller/excluirTarefa.php?id=${tarefaId}&tipo=${tipo}`, {
                method: "DELETE"
            });
            exibirMes(mesesDoAno.indexOf(mesNoButton.innerText.toLowerCase()), anoNoButton.innerText);
        } catch (error) {
            console.error("Erro ao excluir:", error);
        }
    }
});


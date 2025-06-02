import { mesesDoAno, anoNoButton, mesNoButton } from './selecionarMes.js';


export const inputHorarioAtualizar = document.getElementById('horarioAtualizar');

const body = document.body;

document.getElementById('qualquerAtualizar').addEventListener('change', () => { requeridoAtualizar('qualquer') });
document.getElementById('especificoAtualizar').addEventListener('change', () => { requeridoAtualizar('especifico') });

export function requeridoAtualizar(tipoHorarioAtualizar) {
    if (tipoHorarioAtualizar == 'especifico') {
        inputHorarioAtualizar.style.display = 'block';
        inputHorarioAtualizar.setAttribute("required", true);
    } else {
        inputHorarioAtualizar.style.display = 'none';
        inputHorarioAtualizar.removeAttribute("required");
    }
}



export const atualizarTarefa = document.querySelector('.atualizar-tarefa');

const repeticaoAtualizar = document.getElementById('repeticaoAtualizar');

repeticaoAtualizar.addEventListener('change', function () {
    const tipoRepeticao = this.value;

    document.getElementById('diasSemanaAtualizar').classList.toggle('hidden', tipoRepeticao === 'unica');
    document.getElementById('diasSemanaAtualizar').classList.toggle('diasSemanaAtualizar', tipoRepeticao === 'semanal');
    if (tipoRepeticao === 'semanal') {
        dataLabel.innerText = 'Data Inicial: ';
    } else if (tipoRepeticao === 'unica') {
        dataLabel.innerText = 'Data: ';
    }

    //document.getElementById('diasMes').classList.toggle('hidden', tipoRepeticao !== 'mensal');
});

const formAtualizar = document.getElementById('formAtualizar');


//mousedown?
document.addEventListener('click', async(e) => {
    let condicao = true;
    let iteravel = e.target;
    while (iteravel != body) {
        if (iteravel.classList.contains('atualizar-tarefa')) {
            condicao = false;
        }
        iteravel = iteravel.parentNode;
    }
    if (condicao && atualizarTarefa.style.display == 'block' && !e.target.classList.contains('atualizar-tarefa')
        && !(e.target.classList.contains('tarefa') ||
            (e.target.parentNode.classList.contains('tarefa') && !e.target.classList.contains('delete')
                && e.target.tagName != 'IMG'))) {
        atualizarTarefa.style.display = 'none';
        formAtualizar.reset();
        const { criarTarefa } = await import('./formCriar.js');
        criarTarefa.style.display = 'none';
    }
})

formAtualizar.addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = new FormData(formAtualizar);
    const action = formAtualizar.getAttribute('action');

    try {
        const response = await fetch(action, {
            method: 'POST',
            body: formData
        })
        document.body.click();
        const { exibirMes } = await import('./exibirMes.js');
        exibirMes(mesesDoAno.indexOf(mesNoButton.innerText.toLowerCase()), anoNoButton.innerText);
        formAtualizar.reset();
    } catch (error) {
        console.error('Erro ao enviar formulário.');
    }
})
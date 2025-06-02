import { mesesDoAno, mesNoButton, anoNoButton } from './selecionarMes.js';
import { atualizarTarefa } from './formAtualizar.js';


export const criarTarefa = document.querySelector('.criar-tarefa');
export const inputHorario = document.querySelector('#horario');

//escolhendo tipo de repetição
const repeticao = document.getElementById('repeticao');
const dataLabel = document.querySelector('.dataLabel');

repeticao.addEventListener('change', function () {
    const tipoRepeticao = this.value;

    document.getElementById('diasSemana').classList.toggle('hidden', tipoRepeticao === 'unica');
    document.getElementById('diasSemana').classList.toggle('diasSemana', tipoRepeticao === 'semanal');
    if (tipoRepeticao === 'semanal') {
        dataLabel.innerText = 'Data Inicial: ';
    } else if (tipoRepeticao === 'unica') {
        dataLabel.innerText = 'Data: ';
    }

    //document.getElementById('diasMes').classList.toggle('hidden', tipoRepeticao !== 'mensal');
});

//definindo horário

const inputsRadio = document.querySelectorAll('input[name="horarioDefinido"]');
const horario = document.querySelector('#horario');

inputsRadio.forEach((radio) => {
    radio.addEventListener('change', function (e) {
        if (e.target.value == 'especifico') {
            horario.style.display = 'block';
        } else {
            horario.style.display = 'none';
        }
    })
});

const closeBtns = document.querySelectorAll('.close');

closeBtns.forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        criarTarefa.style.display = 'none';
        atualizarTarefa.style.display = 'none';
        formAtualizar.reset();
    })
})

const formCriar = document.getElementById('formCriar');

formCriar.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(formCriar);
    const action = formCriar.getAttribute('action');
    const divErro = document.querySelector('.erro-criar');

    try {
        const response = await fetch(action, {
            method: 'POST',
            body: formData
        });
        if (response.status == 400) {
            const resultado = await response.text();
            throw new Error(resultado);
        } else if (response.status == 500) {
            throw new Error("Erro no servidor, tente novamente mais tarde")
        }
        const { exibirMes } = await import('./exibirMes.js');
        exibirMes(mesesDoAno.indexOf(mesNoButton.innerText.toLowerCase()), anoNoButton.innerText);
        criarTarefa.style.display = 'none';
        divErro.style.display = 'none';
        formCriar.reset();
    } catch (error) {
        console.error(error.message);
        divErro.innerText = error.message;
        divErro.style.display = 'block';
    }
});

const body = document.body;

let clicouNoForm = false;


//mousedown?
body.addEventListener('click', function (e) {
    if (criarTarefa.style.display == 'block') {
        clicouNoForm = false;
        let node = e.target;
        while (node.tagName.toLowerCase() != 'body') {
            if (node.classList.contains("criar-tarefa")) {
                clicouNoForm = true;
            }
            node = node.parentNode;
        }
        if (!clicouNoForm) {
            criarTarefa.style.display = 'none';
        }
    }
})

document.getElementById('qualquer').addEventListener('change', () => requerido('qualquer'));
document.getElementById('especifico').addEventListener('change', () => requerido('especifico'));

function requerido(tipoHorario) {
    if (tipoHorario == 'especifico') {
        inputHorario.setAttribute("required", true);
    } else {
        inputHorario.removeAttribute("required");
    }
}
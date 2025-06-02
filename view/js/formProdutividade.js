import { anoNoButton, mesNoButton, mesesDoAno } from "./selecionarMes.js";
import { diasDoMes } from "./exibirMes.js";

export let somaPesoConcluidas = 0;
export let somaPeso = 0;

export function setSomaPeso( somaPesoAtual ){
    somaPeso = somaPesoAtual;
}

export function getSomaPeso(){return somaPeso}

export function setSomaPesoConcluidas( somaPesoConcluidasAtual ){
    somaPesoConcluidas = somaPesoConcluidasAtual;
}

export function getSomaPesoConcluidas(){return somaPesoConcluidas}

const formProdutividade = document.getElementById('calcular-produtividade');
const erroTexto = document.querySelector('.erro-produtividade');

formProdutividade.addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = new FormData(formProdutividade);
    const dataInicial = document.getElementById('primeiro-dia').value;
    const dataFinal = document.getElementById('ultimo-dia').value;
    const url = `${formProdutividade.getAttribute('action')}?dataInicial=${dataInicial}&dataFinal=${dataFinal}`;
    try {
        const response = await fetch(url, {
            method: 'GET',
        })
        if (response.ok) {
            const resultado = await response.json();
            exibirProdutividade(Number(resultado.somaPesoConcluidas), Number(resultado.somaPeso));
            erroTexto.innerText = "";
            erroTexto.style.display = 'none';
        } else if (response.status == 400) {
            const resultado = await response.text();
            erroTexto.innerText = resultado;
            erroTexto.style.display = 'block';
        } else if (response.status == 404) {
            exibirProdutividade(0, 0);
        }
    } catch (error) {
    }
})

export function exibirProdutividade(numerador, denominador, mesCompleto) {
    if (mesCompleto) {
        document.getElementById('primeiro-dia').value = anoNoButton.innerText + "-"
            + String(1 + mesesDoAno.indexOf(mesNoButton.innerText.toLowerCase())).padStart(2, '0')
            + "-01";
        document.getElementById('ultimo-dia').value = anoNoButton.innerText + "-"
            + String(1 + mesesDoAno.indexOf(mesNoButton.innerText.toLowerCase())).padStart(2, '0') + "-"
            + diasDoMes(String(1 + mesesDoAno.indexOf(mesNoButton.innerText.toLowerCase())).padStart(2, '0'), anoNoButton.innerText);
    }
    if (denominador == 0) {
        erroTexto.innerText = "Não há nenhuma tarefa no período selecionado";
        erroTexto.style.display = 'block';
        document.querySelector('.porcentagem p').innerText = "0%";
    } else if (denominador >= 1) {
        erroTexto.style.display = 'none';
        document.querySelector('.porcentagem p').innerText = Math.round(100 * numerador / denominador) + "%";
    }
}

document.getElementById('primeiro-dia').addEventListener('change', () => { document.getElementById('submit-calcular').click() })
document.getElementById('ultimo-dia').addEventListener('change', () => { document.getElementById('submit-calcular').click() })
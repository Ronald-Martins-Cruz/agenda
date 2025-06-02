import { exibirMes } from './exibirMes.js';
import { anoNoButton, mesNoButton, numeroAno, mesesDoAno } from './selecionarMes.js';
import './excluirTarefa.js';


document.addEventListener("DOMContentLoaded", async() => {
    const dataAtual = new Date();
    const mes = dataAtual.getMonth();
    const ano = dataAtual.getFullYear();
    mesNoButton.innerText = mesesDoAno[mes].toUpperCase();
    anoNoButton.innerText = ano;
    numeroAno.innerText = dataAtual.getFullYear();
    exibirMes(mes, ano);
});
import { desfazerTarefa, concluirTarefa } from './alternarEstadoTarefa.js';
import {setSomaPeso, setSomaPesoConcluidas, somaPeso, somaPesoConcluidas, exibirProdutividade} from './formProdutividade.js';
import { anoNoButton, mesNoButton, mesesDoAno } from "./selecionarMes.js";
import { atualizarTarefa, requeridoAtualizar } from "./formAtualizar.js";
import { criarTarefa, inputHorario} from './formCriar.js';


export function diasDoMes(mes, ano) {
    return new Date(ano, mes, 0).getDate();
}

export const calendario = document.querySelector('.calendario');


//função será adaptada para fazer apenas a exibição das tarefas
export async function exibirMes(mes, ano) {
    //to do: passar para o backend esses cálculos
    const diasMes = diasDoMes(mes + 1, ano);
    let diasMesAnterior = -999;
    if (mes != 0) {
        diasMesAnterior = diasDoMes(mes, ano);
    } else {
        diasMesAnterior = diasDoMes(12, ano - 1);
    }

    let mesString = mes + 1;
    let dataString = ano + "-" + mesString + "-" + "01";
    let data = new Date(dataString);

    //variável representa em qual dia da semana caiu o primeiro dia do mes
    const diaSemana = data.getDay();

    const anoAtual = ano;
    const mesAnterior = (mes != 0) ? mes - 1 : 11;
    const anoDoMesAnterior = (mesAnterior != 11) ? anoAtual : anoAtual - 1;
    const mesPosterior = (mes != 11) ? mes + 1 : 0;
    const anoDoMesPosterior = (mesPosterior != 0) ? anoAtual : Number(anoAtual) + 1;

    const dataInicial = (diaSemana == 0) ? new Date(anoAtual, mes, 1) :
        new Date(anoDoMesAnterior, mesAnterior, diasMesAnterior - diaSemana + 1);

    const dataFinal = new Date(dataInicial.getTime());

    dataFinal.setDate(dataFinal.getDate() + 34);


    const dados = {
        mes: mesString,
        diasMes: diasMes,
        diaSemana: diaSemana,
        diasMesAnterior: diasMesAnterior,
        ano: ano
    };

    let resultado = null;

    try {
        const response = await fetch('/controller/carregarDias.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        if (!response.ok) {
            throw new Error();
        }
        resultado = await response.json();

    } catch (error) {
        console.error('Erro ao carregar tarefas');
    }
    const fragment = document.createDocumentFragment();
    let i = 0;
    setSomaPesoConcluidas(0);
    setSomaPeso(0);
    for (let data = new Date(dataInicial.getTime()); data <= dataFinal; data.setDate(data.getDate() + 1)) {
        const anoData = data.getFullYear();
        const mesData = String(data.getMonth() + 1).padStart(2, '0');
        const diaData = String(data.getDate()).padStart(2, '0');
        const iesimoDia = document.createElement("div");
        iesimoDia.classList.add('dia');
        const scrolavel = document.createElement("nav");
        scrolavel.classList.add("scrolavel");
        iesimoDia.appendChild(scrolavel);

        iesimoDia.dataset.dia = `${anoData}-${mesData}-${diaData}`;

        //mousedown?
        iesimoDia.addEventListener('click', (e) => {
            if (criarTarefa.style.display == 'block') {
                return;
            }
            let naoEFeriado = true;
            let target = e.target;
            while (!target.classList.contains('dia')) {
                if (target.classList.contains('feriado')) {
                    naoEFeriado = false;
                }
                target = target.parentNode;
                i++;
            }
            if (naoEFeriado && !e.target.classList.contains('delete') && !(e.target.tagName == 'IMG')) {
                criarTarefa.style.display = 'block';
                e.stopPropagation();
                formCriar.reset();
                document.querySelector('.erro-criar').style.display = 'none';
                inputHorario.style.display = 'none';
                inputHorario.removeAttribute("required");
                const dataForm = document.querySelector('#dataInicial');
                dataForm.value = iesimoDia.dataset.dia;
            }
        })

        const numeroDia = document.createElement("p");
        if (data.getMonth() != mes) {
            numeroDia.classList.add("numero-dia-opaco");
        } else {
            numeroDia.classList.add("numero-dia");
        }
        numeroDia.innerText = data.getDate();

        iesimoDia.appendChild(numeroDia);
        resultado['unica'][i].forEach(tarefa => {
            setSomaPeso(somaPeso + Number(tarefa.peso));
            if (tarefa.concluida)
                setSomaPesoConcluidas(somaPesoConcluidas + Number(tarefa.peso));
            montarTarefa(scrolavel, tarefa);
        }
        )

        criarLegenda(i, iesimoDia);
        i++;

        fragment.appendChild(iesimoDia);
    }
    calendario.replaceChildren(fragment);
    exibirProdutividade(somaPesoConcluidas, somaPeso, true);
    exibirFeriados(dataInicial, dataFinal);
}

async function exibirFeriados(dataInicial, dataFinal) {
    let feriados;
    let feriadosResponseCode;
    try {
        const url = 'https://brasilapi.com.br/api/feriados/v1/' + anoNoButton.innerText;
        const response = await fetch(url);
        feriadosResponseCode = response.status;
        feriados = await response.json();
        if (mesesDoAno.indexOf(mesNoButton.innerText.toLowerCase()) === 11) {
            const responseAnoSeguinte = await fetch('https://brasilapi.com.br/api/feriados/v1/' + (Number(anoNoButton.innerText) + 1));
            if (responseAnoSeguinte.status != 200) {
                feriadosResponseCode = responseAnoSeguinte;
            }
            const resultadoAnoSeguinte = await responseAnoSeguinte.json();
            feriados = feriados.concat(resultadoAnoSeguinte);
        }
    } catch (e) {
        console.error('Erro ao consultar feriados');
    }
    if (feriadosResponseCode == 200) {
        for (let data = new Date(dataInicial.getTime()); data <= dataFinal; data.setDate(data.getDate() + 1)) {
            const dataAtual = '' + data.getFullYear() + "-" +
                (Number(data.getMonth()) + 1).toString().padStart(2, '0') +
                "-" + data.getDate().toString().padStart(2, '0');
            for (let i = 0; i < feriados.length; i++) {
                if (feriados[i].date == dataAtual) {
                    const divFeriado = document.createElement('div');
                    divFeriado.classList.add("feriado");
                    const nomeDoFeriado = document.createElement('p');
                    nomeDoFeriado.classList.add('nome');
                    nomeDoFeriado.innerText = feriados[i].name;
                    divFeriado.title = feriados[i].name;
                    divFeriado.appendChild(nomeDoFeriado);
                    const scrolavel = document.querySelector(`[data-dia="${dataAtual}"] .scrolavel`);
                    scrolavel.appendChild(divFeriado);
                }
            }

        }
    }
}

function criarLegenda(iteracao, iesimoDia) {
    const legenda = document.createElement('p');
    legenda.classList.add("legenda");
    switch (iteracao) {
        case 0:
            legenda.innerText = 'dom';
            break;
        case 1:
            legenda.innerText = 'seg';
            break;
        case 2:
            legenda.innerText = 'ter';
            break;
        case 3:
            legenda.innerText = 'qua';
            break;
        case 4:
            legenda.innerText = 'qui';
            break;
        case 5:
            legenda.innerText = 'sex';
            break;
        case 6:
            legenda.innerText = 'sab';
            break;
        default:
            break;
    }
    iesimoDia.appendChild(legenda);
}

function montarTarefa(iesimoDia, tarefa) {
    const divTarefa = document.createElement("div");
    divTarefa.classList.add("tarefa");

    divTarefa.dataset.id = tarefa.id;
    divTarefa.dataset.tipo = 'unica';

    eventoFecharForm(divTarefa, 'click');

    eventoAbrirAtualizar(divTarefa);

    const img = document.createElement("img");
    if (!tarefa.concluida) {
        img.src = "imagens/unchecked.png";
    } else {
        img.src = "imagens/checked.png"
    }

    img.classList.add("checked");
    divTarefa.appendChild(img);

    img.addEventListener('mouseover', function () {
        if (!img.src.includes('imagens/checked.png'))
            img.src = 'imagens/unchecked-hover.png';
    })

    img.addEventListener('mouseout', function () {
        if (img.src.includes('imagens/unchecked-hover.png'))
            img.src = 'imagens/unchecked.png';
    })

    img.addEventListener('click', function () {
        if (img.src.includes('imagens/unchecked-hover.png') || img.src.includes('imagens/unchecked.png')) {
            img.src = 'imagens/checked.png';
            concluirTarefa(tarefa.id, 'unica');
        } else if (img.src.includes('imagens/checked.png')) {
            img.src = 'imagens/unchecked-hover.png';
            desfazerTarefa(tarefa.id, 'unica');
        }
    })

    const nome = document.createElement("p");
    nome.classList.add("nome");
    nome.innerText = tarefa.nome;
    divTarefa.appendChild(nome);

    const times = document.createElement("span");
    times.classList.add('delete');
    times.innerHTML = "&times;";

    divTarefa.appendChild(times);
    iesimoDia.appendChild(divTarefa);
}

function eventoFecharForm(elemento, evento) {
    elemento.addEventListener(evento, () => {
        criarTarefa.style.display = 'none';
    })
}

function eventoAbrirAtualizar(divTarefa) {
    //mousedown?
    divTarefa.addEventListener('click', (e) => {
        if (e.target.classList.contains('tarefa') ||
            (e.target.parentNode.classList.contains('tarefa') && !e.target.classList.contains('delete')
                && e.target.tagName != 'IMG')) {
            atualizarTarefa.style.display = 'block';
            abrirAtualizar(divTarefa.dataset.id, divTarefa.dataset.tipo);
        }
    })
}

async function abrirAtualizar(id, tipo) {
    try {
        const response = await fetch(`/controller/buscarTarefa.php?id=${id}&tipo=${tipo}`, {
            method: "Get"
        });

        const resultado = await response.json();
        document.getElementById('nomeAtualizar').value = resultado.nome;
        document.getElementById('descricaoAtualizar').value = resultado.descricao;
        document.getElementById('pesoAtualizar').value = resultado.peso;

        if (resultado.horario != null) {
            requeridoAtualizar('especifico');
            document.getElementById('qualquerAtualizar').checked = false;
            document.getElementById('especificoAtualizar').checked = true;
            document.getElementById('horarioAtualizar').value = resultado.horario;
        } else {
            requeridoAtualizar('qualquer');
            document.getElementById('especificoAtualizar').checked = false;
            document.getElementById('qualquerAtualizar').checked = true;
        }
        if (tipo === 'unica') {
            document.getElementById('repeticaoAtualizar').value = 'unica';
            document.getElementById('repeticaoAtualizar').disabled = true;
            document.getElementById('tipoDeRepeticao').value = 'unica';
        }
        document.getElementById('dataInicialAtualizar').value = resultado.data;
        document.getElementById('idTarefa').value = id;
    } catch (e) {
        console.error('Erro ao abrir formulário');
    }
}

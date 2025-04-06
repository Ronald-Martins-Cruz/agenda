const mesesDoAno = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

const concluirTarefa = async (id, tipo) => {
    try {
        const response = await fetch(`/controller/concluirTarefa.php?id=${id}&tipo=${tipo}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error('Erro ao obter dados do PHP');
        }

    } catch (error) {
        console.error('Erro:', error);
    }

}

const desfazerTarefa = async (id, tipo) => {
    try {
        response = await fetch(`/controller/desfazerTarefa.php?id=${id}&tipo=${tipo}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error('Erro ao obter dados do PHP');
        }

    } catch (error) {
        console.error('Erro:', error);
    }

}

const abrirAtualizar = async (id, tipo) => {
    const response = await fetch(`/controller/buscarTarefa.php?id=${id}&tipo=${tipo}`, {
        method: "Get"
    });

    const resultado = await response.json();

    document.querySelector('#nomeAtualizar').value = resultado.nome;

}

const atualizarTarefa = document.querySelector('.atualizar-tarefa');

const exibirMes = async (mes, ano) => {
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
        response = await fetch('/controller/carregarDias.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        if (!response.ok) {
            throw new Error('Erro ao obter dados do PHP');
        }

        resultado = await response.json();

    } catch (error) {
        console.error('Erro:', error);
    }
    calendario.innerHTML = "";
    let i = 0;
    for (let data = new Date(dataInicial.getTime()); data <= dataFinal; data.setDate(data.getDate() + 1)) {
        const anoData = data.getFullYear();
        const mesData = String(data.getMonth() + 1).padStart(2, '0');
        const diaData = String(data.getDate()).padStart(2, '0');
        const iesimoDia = document.createElement("div");
        iesimoDia.classList.add('dia');

        iesimoDia.dataset.dia = `${anoData}-${mesData}-${diaData}`;

        iesimoDia.addEventListener('click', () => {
            criarTarefa.style.display = 'block';
            const dataForm = document.querySelector('#dataInicial');
            dataForm.value = iesimoDia.dataset.dia;
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
            montarTarefa(iesimoDia, tarefa);
        }
        )
        criarLegenda(i, iesimoDia);
        i++;

        calendario.appendChild(iesimoDia);
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
        k = 200;
    })
}

function eventoAbrirAtualizar(divTarefa) {
    divTarefa.addEventListener('click', (e) => {
        if (e.target.classList.contains('tarefa') ||
            (e.target.parentNode.classList.contains('tarefa') && !e.target.classList.contains('delete')
                && e.target.tagName != 'IMG')) {
            atualizarTarefa.style.display = 'block';
            abrirAtualizar(divTarefa.dataset.id, divTarefa.dataset.tipo);
        }
    })
}

const calendario = document.querySelector('.calendario');

calendario.addEventListener("click", async function (event) {
    if (event.target.classList.contains("delete")) {
        const tarefa = event.target.closest(".tarefa");
        const tarefaId = tarefa.dataset.id;
        const tipo = tarefa.dataset.tipo;

        try {
            const response = await fetch(`/controller/excluirTarefa.php?id=${tarefaId}&tipo=${tipo}`, {
                method: "DELETE"
            });

            const data = await response.json();
            mes = mesesDoAno.indexOf(mesNoButton.innerText.toLowerCase());
            ano = anoNoButton.innerText;
            exibirMes(mes, ano);
        } catch (error) {
            console.error("Erro ao excluir:", error);
        }
    }
});


//manipulando button para selecionar mês

const selecionarMes = document.querySelector('.selecionar-mes');
const meses = document.querySelector('.inativo');

selecionarMes.addEventListener('click', (event) => {
    const clickedElement = event.target;
    const tagName = clickedElement.tagName;
    const seta = clickedElement.classList;

    if (tagName === 'P' || tagName == 'BUTTON' || seta == 'seta') {
        meses.classList.toggle('inativo');
        meses.classList.toggle('meses');
    }
})

document.addEventListener('click', (event) => {
    if (
        !meses.classList.contains('inativo') &&
        !meses.contains(event.target) &&
        !event.target.closest('.selecionar-mes')
    ) {
        meses.classList.add('inativo');
        meses.classList.remove('meses');
    }
});

//selecionando os meses e ano clicando

Array.from(meses.children).forEach(child => {
    if (child.tagName.toLowerCase() == 'p') {
        child.addEventListener('click', () => {
            switch (child.innerHTML) {
                case 'Jan':
                    mesNoButton.innerHTML = mesesDoAno[0].toUpperCase();
                    anoNoButton.innerHTML = numeroAno.innerHTML;
                    exibirMes(0, anoNoButton.innerHTML);
                    break;
                case 'Fev':
                    mesNoButton.innerHTML = mesesDoAno[1].toUpperCase();
                    anoNoButton.innerHTML = numeroAno.innerHTML;
                    exibirMes(1, anoNoButton.innerHTML);
                    break;
                case 'Mar':
                    mesNoButton.innerHTML = mesesDoAno[2].toUpperCase();
                    anoNoButton.innerHTML = numeroAno.innerHTML;
                    exibirMes(2, anoNoButton.innerHTML);
                    break;
                case 'Abr':
                    mesNoButton.innerHTML = mesesDoAno[3].toUpperCase();
                    anoNoButton.innerHTML = numeroAno.innerHTML;
                    exibirMes(3, anoNoButton.innerHTML);
                    break;
                case 'Mai':
                    mesNoButton.innerHTML = mesesDoAno[4].toUpperCase();
                    anoNoButton.innerHTML = numeroAno.innerHTML;
                    exibirMes(4, anoNoButton.innerHTML);
                    break;
                case 'Jun':
                    mesNoButton.innerHTML = mesesDoAno[5].toUpperCase();
                    anoNoButton.innerHTML = numeroAno.innerHTML;
                    exibirMes(5, anoNoButton.innerHTML);
                    break;
                case 'Jul':
                    mesNoButton.innerHTML = mesesDoAno[6].toUpperCase();
                    anoNoButton.innerHTML = numeroAno.innerHTML;
                    exibirMes(6, anoNoButton.innerHTML);
                    break;
                case 'Ago':
                    mesNoButton.innerHTML = mesesDoAno[7].toUpperCase();
                    anoNoButton.innerHTML = numeroAno.innerHTML;
                    exibirMes(7, anoNoButton.innerHTML);
                    break;
                case 'Set':
                    mesNoButton.innerHTML = mesesDoAno[8].toUpperCase();
                    anoNoButton.innerHTML = numeroAno.innerHTML;
                    exibirMes(8, anoNoButton.innerHTML);
                    break;
                case 'Out':
                    mesNoButton.innerHTML = mesesDoAno[9].toUpperCase();
                    anoNoButton.innerHTML = numeroAno.innerHTML;
                    exibirMes(9, anoNoButton.innerHTML);
                    break;
                case 'Nov':
                    mesNoButton.innerHTML = mesesDoAno[10].toUpperCase();
                    anoNoButton.innerHTML = numeroAno.innerHTML;
                    exibirMes(10, anoNoButton.innerHTML);
                    break;
                case 'Dez':
                    mesNoButton.innerHTML = mesesDoAno[11].toUpperCase();
                    anoNoButton.innerHTML = numeroAno.innerHTML;
                    exibirMes(11, anoNoButton.innerHTML);
                    break;
                default:

            }

        })
    }
})

// setas para ir e voltar
// somar e diminuir meses

//ir
const ir = document.querySelector('.ir');
const setaFrente = document.querySelector('.seta-frente');
const mesNoButton = document.querySelector('.mes');
const anoNoButton = document.querySelector('.ano-no-button');


ir.addEventListener('mouseover', () => {
    setaFrente.src = 'imagens/seta-hover.png';
})

ir.addEventListener('mouseout', () => {
    setaFrente.src = 'imagens/seta.png';
})

ir.addEventListener('click', () => {
    for (let i = 0; i < mesesDoAno.length; i++) {
        const mes = mesesDoAno[i];
        if (mes.toLowerCase() == mesNoButton.innerHTML.toLowerCase() && mesNoButton.innerHTML.toLowerCase() != 'dezembro') {
            let j = i + 1;
            mesNoButton.innerHTML = mesesDoAno[j].toUpperCase();
            exibirMes(j, anoNoButton.innerHTML);
            break;
        } else if (mes.toLowerCase() == mesNoButton.innerHTML.toLowerCase() && mesNoButton.innerHTML.toLowerCase() == 'dezembro') {
            mesNoButton.innerHTML = mesesDoAno[0].toUpperCase();
            anoNoButton.innerHTML = Number(anoNoButton.innerHTML) + 1;
            exibirMes(0, anoNoButton.innerHTML);
        }
    }
});

//voltar
const voltar = document.querySelector('.voltar');
const setaTras = document.querySelector('.seta-tras');

voltar.addEventListener('mouseover', () => {
    setaTras.src = 'imagens/seta-hover.png';
})

voltar.addEventListener('mouseout', () => {
    setaTras.src = 'imagens/seta.png';
})

voltar.addEventListener('click', () => {
    let passouNoElse = false;
    mesesDoAno.forEach((mes, i) => {
        if (mes.toLowerCase() == mesNoButton.innerHTML.toLowerCase() && mesNoButton.innerHTML.toLowerCase() != 'janeiro' && !passouNoElse) {
            let j = i - 1;
            mesNoButton.innerHTML = mesesDoAno[j].toUpperCase();
            exibirMes(j, anoNoButton.innerHTML);
        } else if (mes.toLowerCase() == mesNoButton.innerHTML.toLowerCase() && mesNoButton.innerHTML.toLowerCase() == 'janeiro') {
            mesNoButton.innerHTML = mesesDoAno[11].toUpperCase();
            anoNoButton.innerHTML = Number(anoNoButton.innerHTML) - 1;
            exibirMes(11, anoNoButton.innerHTML);
            passouNoElse = true;
        }
    })
})

// somar ano e diminuir ano

const anoAnterior = document.querySelector('.ano-anterior');
const anoPosterior = document.querySelector('.ano-posterior');
const numeroAno = document.querySelector('.numero-ano');

//somar
anoAnterior.addEventListener('click', () => {
    let novoAno = numeroAno.innerHTML;
    novoAno--;
    numeroAno.innerHTML = novoAno;
})

//diminuir
anoPosterior.addEventListener('click', () => {
    let novoAno = numeroAno.innerHTML;
    novoAno++;
    numeroAno.innerHTML = novoAno;
})


//manipulando formulário

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

const inputHorario = document.querySelector('#horario');

const requerido = function (tipoHorario) {
    if (tipoHorario == 'especifico') {
        inputHorario.setAttribute("required", true);
    } else {
        inputHorario.removeAttribute("required");
    }
}

const criarTarefa = document.querySelector('.criar-tarefa');

let k = 0;

const header = document.querySelector("header");

header.addEventListener('click', function () {
    criarTarefa.style.display = 'none';
    k = -1;
})

const calculo = document.querySelector('.calculo');

calculo.addEventListener('click', function () {
    criarTarefa.style.display = 'none';
    k = -1;
})

body = document.body;

let clicouNoForm = false;

body.addEventListener('click', function (e) {
    k++;
    if (k > 1 && criarTarefa.style.display == 'block') {
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
            k = 0;
        }
    }
})

const closeBtns = document.querySelectorAll('.close');

closeBtns.forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        criarTarefa.style.display = 'none';
        atualizarTarefa.style.display = 'none';
        k = -1;
    })
})

//Fazendo a exibição do mês

function diasDoMes(mes, ano) {
    return new Date(ano, mes, 0).getDate();
}

//exibicao inicial da página

document.addEventListener("DOMContentLoaded", () => {
    dataAtual = new Date();
    mes = dataAtual.getMonth();
    ano = dataAtual.getFullYear();
    mesNoButton.innerText = mesesDoAno[mes].toUpperCase();
    anoNoButton.innerText = ano;
    numeroAno.innerText = dataAtual.getFullYear();
    exibirMes(mes, ano);
});

//exibicao do form de update

document.addEventListener('click', (e) => {
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
        criarTarefa.style.display = 'none';
        k = 0;
    }
})
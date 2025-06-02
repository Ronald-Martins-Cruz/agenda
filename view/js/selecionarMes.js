export const mesesDoAno = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];


//manipulando button para selecionar mês

const selecionarMes = document.querySelector('.selecionar-mes');
const meses = document.querySelector('.inativo');

selecionarMes.addEventListener('click', (event) => {
    const clickedElement = event.target;
    const tagName = clickedElement.tagName;
    const seta = clickedElement.classList;

    if (tagName === 'P' || tagName == 'BUTTON' || seta == 'seta' || clickedElement.classList.contains('mes-do-ano')) {
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

async function criarEventosButton() {
    const { exibirMes } = await import('./exibirMes.js');
    Array.from(meses.children).forEach(child => {
    if (child.tagName.toLowerCase() == 'p') {
        child.addEventListener('click', () => {
            switch (child.innerText) {
                case 'Jan':
                    mesNoButton.innerText = mesesDoAno[0].toUpperCase();
                    anoNoButton.innerText = numeroAno.innerText;
                    exibirMes(0, anoNoButton.innerText);
                    break;
                case 'Fev':
                    mesNoButton.innerText = mesesDoAno[1].toUpperCase();
                    anoNoButton.innerText = numeroAno.innerText;
                    exibirMes(1, anoNoButton.innerText);
                    break;
                case 'Mar':
                    mesNoButton.innerText = mesesDoAno[2].toUpperCase();
                    anoNoButton.innerText = numeroAno.innerText;
                    exibirMes(2, anoNoButton.innerText);
                    break;
                case 'Abr':
                    mesNoButton.innerText = mesesDoAno[3].toUpperCase();
                    anoNoButton.innerText = numeroAno.innerText;
                    exibirMes(3, anoNoButton.innerText);
                    break;
                case 'Mai':
                    mesNoButton.innerText = mesesDoAno[4].toUpperCase();
                    anoNoButton.innerText = numeroAno.innerText;
                    exibirMes(4, anoNoButton.innerText);
                    break;
                case 'Jun':
                    mesNoButton.innerText = mesesDoAno[5].toUpperCase();
                    anoNoButton.innerText = numeroAno.innerText;
                    exibirMes(5, anoNoButton.innerText);
                    break;
                case 'Jul':
                    mesNoButton.innerText = mesesDoAno[6].toUpperCase();
                    anoNoButton.innerText = numeroAno.innerText;
                    exibirMes(6, anoNoButton.innerText);
                    break;
                case 'Ago':
                    mesNoButton.innerText = mesesDoAno[7].toUpperCase();
                    anoNoButton.innerText = numeroAno.innerText;
                    exibirMes(7, anoNoButton.innerText);
                    break;
                case 'Set':
                    mesNoButton.innerText = mesesDoAno[8].toUpperCase();
                    anoNoButton.innerText = numeroAno.innerText;
                    exibirMes(8, anoNoButton.innerText);
                    break;
                case 'Out':
                    mesNoButton.innerText = mesesDoAno[9].toUpperCase();
                    anoNoButton.innerText = numeroAno.innerText;
                    exibirMes(9, anoNoButton.innerText);
                    break;
                case 'Nov':
                    mesNoButton.innerText = mesesDoAno[10].toUpperCase();
                    anoNoButton.innerText = numeroAno.innerText;
                    exibirMes(10, anoNoButton.innerText);
                    break;
                case 'Dez':
                    mesNoButton.innerText = mesesDoAno[11].toUpperCase();
                    anoNoButton.innerText = numeroAno.innerText;
                    exibirMes(11, anoNoButton.innerText);
                    break;
                default:

            }

        })
    }
})  
}

criarEventosButton();


// setas para ir e voltar
// somar e diminuir meses

//ir
const ir = document.querySelector('.ir');
const setaFrente = document.querySelector('.seta-frente');
export const mesNoButton = document.querySelector('.mes');
export const anoNoButton = document.querySelector('.ano-no-button');


ir.addEventListener('mouseover', () => {
    setaFrente.src = 'imagens/seta-hover.png';
})

ir.addEventListener('mouseout', () => {
    setaFrente.src = 'imagens/seta.png';
})

ir.addEventListener('click', async() => {
    const { exibirMes } = await import('./exibirMes.js');
    for (let i = 0; i < mesesDoAno.length; i++) {
        const mes = mesesDoAno[i];
        if (mes.toLowerCase() == mesNoButton.innerText.toLowerCase() && mesNoButton.innerText.toLowerCase() != 'dezembro') {
            let j = i + 1;
            mesNoButton.innerText = mesesDoAno[j].toUpperCase();
            exibirMes(j, anoNoButton.innerText);
            break;
        } else if (mes.toLowerCase() == mesNoButton.innerText.toLowerCase() && mesNoButton.innerText.toLowerCase() == 'dezembro') {
            mesNoButton.innerText = mesesDoAno[0].toUpperCase();
            anoNoButton.innerText = Number(anoNoButton.innerText) + 1;
            exibirMes(0, anoNoButton.innerText);
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

voltar.addEventListener('click', async() => {
    let passouNoElse = false;
    const { exibirMes } = await import('./exibirMes.js');
    mesesDoAno.forEach((mes, i) => {
        if (mes.toLowerCase() == mesNoButton.innerText.toLowerCase() && mesNoButton.innerText.toLowerCase() != 'janeiro' && !passouNoElse) {
            let j = i - 1;
            mesNoButton.innerText = mesesDoAno[j].toUpperCase();
            exibirMes(j, anoNoButton.innerText);
        } else if (mes.toLowerCase() == mesNoButton.innerText.toLowerCase() && mesNoButton.innerText.toLowerCase() == 'janeiro') {
            mesNoButton.innerText = mesesDoAno[11].toUpperCase();
            anoNoButton.innerText = Number(anoNoButton.innerText) - 1;
            exibirMes(11, anoNoButton.innerText);
            passouNoElse = true;
        }
    })
})

// somar ano e diminuir ano

const anoAnterior = document.querySelector('.ano-anterior');
const anoPosterior = document.querySelector('.ano-posterior');
export const numeroAno = document.querySelector('.numero-ano');

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
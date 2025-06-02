import {exibirProdutividade} from "./formProdutividade.js";
import { setSomaPesoConcluidas, somaPeso, somaPesoConcluidas } from "./formProdutividade.js";


export async function desfazerTarefa(id, tipo) {
    try {
        const response = await fetch(`/controller/desfazerTarefa.php?id=${id}&tipo=${tipo}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error('Erro ao obter dados');
        }
        const tarefa = await response.json();
        const dataInicial = document.getElementById('primeiro-dia').value;
        const dataFinal = document.getElementById('ultimo-dia');
        if (tarefa.data >= dataInicial && tarefa.data <= dataFinal) {
            setSomaPesoConcluidas(somaPesoConcluidas - Number(tarefa.peso));
            exibirProdutividade(somaPesoConcluidas, somaPeso);
        }

    } catch (error) {
        console.error('Erro:', error);
    }

}

export async function concluirTarefa(id, tipo) {
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

        const tarefa = await response.json();
        const dataInicial = document.getElementById('primeiro-dia').value;
        const dataFinal = document.getElementById('ultimo-dia');
        if (tarefa.data >= dataInicial && tarefa.data <= dataFinal) {
            setSomaPesoConcluidas(somaPesoConcluidas + Number(tarefa.peso));
            exibirProdutividade(somaPesoConcluidas, somaPeso);
        }

    } catch (error) {
        console.error('Erro:', error);
    }
}
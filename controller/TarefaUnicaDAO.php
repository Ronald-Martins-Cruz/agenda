<?php

namespace controller;
use model\TarefaUnica;
require_once 'conexao.php';


class TarefaUnicaDAO{
    public function __construct(){}

    function inserir(TarefaUnica $tarefaUnica){
        $pdo = criarPDO();
        if($tarefaUnica->getHorario() == null){
            $sql = 'INSERT INTO tarefa_unica(nome,descricao,data,peso) VALUES (?,?,?,?)';
            $ps = $pdo->prepare($sql);
            $dataFormatada = $tarefaUnica->getDataInicial()->format('Y-m-d');
            return $ps->execute([$tarefaUnica->getNome(),$tarefaUnica->getDescricao(),$dataFormatada,$tarefaUnica->getPeso()]);
        }elseif($tarefaUnica->getHorario() != null){
            $sql = 'INSERT INTO tarefa_unica(nome,descricao,data,peso,horario) VALUES (?,?,?,?,?)';
            $ps = $pdo->prepare($sql);
            $dataFormatada = $tarefaUnica->getDataInicial()->format('Y-m-d');
            $horarioFormatado = $tarefaUnica->getHorario()->format('H:i');
            return $ps->execute([$tarefaUnica->getNome(),$tarefaUnica->getDescricao(),$dataFormatada,$tarefaUnica->getPeso(),$horarioFormatado]);
        }
    }

    function selecionarTarefasPelaData(\DateTime $data){
        $sql = 'SELECT * FROM tarefa_unica WHERE data = ?';
        $data = $data->format('Y-m-d');
        $pdo = criarPDO();
        $ps = $pdo->prepare($sql);
        $ps->execute([$data]);
        return $ps->fetchAll();
    }

    function excluirTarefa(int $id){
        $sql = 'DELETE FROM tarefa_unica WHERE id = ?';
        $pdo = criarPDO();
        $ps = $pdo->prepare($sql);
        return $ps->execute([$id]);
    }

    /*
    function selecionarTarefasPorPeriodo(string $dataInicial, string $dataFinal){
        $sql = 'SELECT * FROM tarefa_unica WHERE data BETWEEN ? AND ?';
        $pdo = criarPDO();
        $ps = $pdo->prepare($sql);
        $ps->execute([$dataInicial, $dataFinal]);
        return $ps->fetchAll();
    }*/
}
?>
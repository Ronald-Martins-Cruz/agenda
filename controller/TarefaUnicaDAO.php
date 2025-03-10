<?php

namespace controller;
use model\TarefaUnica;
require_once 'conexao.php';


class TarefaUnicaDAO{
    public function __construct(){}

    function inserir(TarefaUnica $tarefaUnica){
        $pdo = criarPDO();
        if($tarefaUnica->horarioEspecifico()){
            $sql = 'INSERT INTO tarefa_unica(nome,descricao,data,peso) VALUES (?,?,?,?)';
            $ps = $pdo->prepare($sql);
            $dataFormatada = $tarefaUnica->getDataInicial()->format('Y-m-d');
            return $ps->execute([$tarefaUnica->getNome(),$tarefaUnica->getDescricao(),$dataFormatada,$tarefaUnica->getPeso()]);
        }elseif(!$tarefaUnica->horarioEspecifico()){
            $sql = 'INSERT INTO tarefa_unica(nome,descricao,data,peso) VALUES (?,?,?,?)';
            $ps = $pdo->prepare($sql);
            $dataFormatada = $tarefaUnica->getDataInicial()->format('Y-m-d');
            return $ps->execute([$tarefaUnica->getNome(),$tarefaUnica->getDescricao(),$dataFormatada,$tarefaUnica->getPeso()]);
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

    function concluirTarefa(int $id){
        $sql = 'UPDATE tarefa_unica SET concluida = true where ID = ?';
        $pdo = criarPDO();
        $ps = $pdo->prepare($sql);
        return $ps->execute([$id]);
    }

    function desfazerTarefa(int $id){
        $sql = 'UPDATE tarefa_unica SET concluida = false where ID = ?';
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
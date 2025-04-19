<?php

namespace controller;
use model\TarefaUnica;
require_once 'conexao.php';


class TarefaUnicaDAO{
    public function __construct(){}

    function inserir(TarefaUnica $tarefaUnica){
        try{
            $pdo = criarPDO();
            if($tarefaUnica->getHorario()->format('Y-m-d H:i:s') == '1000-12-25 00:00:00'){
                $sql = 'INSERT INTO tarefa_unica(nome,descricao,data,peso) VALUES (?,?,?,?)';
                $ps = $pdo->prepare($sql);
                $dataFormatada = $tarefaUnica->getDataInicial()->format('Y-m-d');
                $ps->execute([$tarefaUnica->getNome(),$tarefaUnica->getDescricao(),$dataFormatada,$tarefaUnica->getPeso()]);

            }else{
                $sql = 'INSERT INTO tarefa_unica(nome,descricao,data,peso,horario) VALUES (?,?,?,?,?)';
                $ps = $pdo->prepare($sql);
                $dataFormatada = $tarefaUnica->getDataInicial()->format('Y-m-d');
                $horario = $tarefaUnica->getHorario()->format('H:i:s');
                $ps->execute([$tarefaUnica->getNome(),$tarefaUnica->getDescricao(),$dataFormatada,$tarefaUnica->getPeso(),$horario]);
            }
        }catch(Exception $e){
            echo('Não foi possível inserir a tarefa');
        }
    }

    function selecionarTarefasPelaData(\DateTime $data){
        try{
            $sql = 'SELECT * FROM tarefa_unica WHERE data = ?';
            $data = $data->format('Y-m-d');
            $pdo = criarPDO();
            $ps = $pdo->prepare($sql);
            $ps->execute([$data]);
            return $ps->fetchAll();
        }catch(Exception $e){
            echo('Não foi possível buscar as tarefas');
        }
    }

    function selecionarTarefaPorId(int $id){
        try{
            $sql = 'SELECT * FROM tarefa_unica WHERE id = ?';
            $pdo = criarPDO();
            $ps = $pdo->prepare($sql);
            $ps->execute([$id]);
            return $ps->fetch();
        }catch(Exception $e){
            echo('Não foi possível buscar a tarefa');
        }
    }

    function excluirTarefa(int $id){
        try{
            $sql = 'DELETE FROM tarefa_unica WHERE id = ?';
            $pdo = criarPDO();
            $ps = $pdo->prepare($sql);
            return $ps->execute([$id]);
        }catch(Exception $e){
            echo('Não foi possível excluir a tarefa');
        }
    }

    function concluirTarefa(int $id){
        try{
            $sql = 'UPDATE tarefa_unica SET concluida = true where ID = ?';
            $pdo = criarPDO();
            $ps = $pdo->prepare($sql);
            return $ps->execute([$id]);
        }catch(Exception $e){
            echo('Não foi possível concluir a tarefa.');
        }
    }

    function desfazerTarefa(int $id){
        try{
            $sql = 'UPDATE tarefa_unica SET concluida = false where ID = ?';
            $pdo = criarPDO();
            $ps = $pdo->prepare($sql);
            return $ps->execute([$id]);
        }catch(Exception $e){
            echo('Não foi possível desfazer a tarefa.');
        }
    }

    function atualizarTarefa(int $id, TarefaUnica $tarefaUnica){
        try{
            $pdo = criarPDO();
            if($tarefaUnica->getHorario()->format('Y-m-d H:i:s') == '1000-12-25 00:00:00'){
                $sql = 'UPDATE tarefa_unica SET nome = ?, descricao = ?, data = ?, peso = ? WHERE id = ?';
                $ps = $pdo->prepare($sql);
                $dataFormatada = $tarefaUnica->getDataInicial()->format('Y-m-d');
                $ps->execute([$tarefaUnica->getNome(),$tarefaUnica->getDescricao(),$dataFormatada,$tarefaUnica->getPeso(),$id]);

            }else{
                $sql = 'UPDATE tarefa_unica SET nome = ?, descricao = ?, data = ?, peso = ?, horario = ? WHERE id = ?';
                $ps = $pdo->prepare($sql);
                $dataFormatada = $tarefaUnica->getDataInicial()->format('Y-m-d');
                $horario = $tarefaUnica->getHorario()->format('H:i:s');
                $ps->execute([$tarefaUnica->getNome(),$tarefaUnica->getDescricao(),$dataFormatada,$tarefaUnica->getPeso(),$horario,$id]);
            }
        }catch(Exception $e){
            echo('Não foi possível atualizar a tarefa');
        }
    }

    function selecionarTarefasPorPeriodo(string $dataInicial, string $dataFinal){
        $sql = 'SELECT * FROM tarefa_unica WHERE data BETWEEN ? AND ?';
        $pdo = criarPDO();
        $ps = $pdo->prepare($sql);
        $ps->execute([$dataInicial, $dataFinal]);
        return $ps->fetchAll();
    }
}
?>
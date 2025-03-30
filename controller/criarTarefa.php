<?php

namespace controller;
require_once __DIR__ . '/../autoload.php';
use model\TarefaUnica;


if($_SERVER['REQUEST_METHOD']=='POST' && isset($_POST['repeticao']) && $_POST['repeticao'] == 'unica'){
    
    $nome = htmlspecialchars(isset($_POST['nome'])? $_POST['nome']: '');
    $descricao = htmlspecialchars(isset($_POST['descricao'])? $_POST['descricao']: '');
    $data = isset($_POST['dataInicial'])? new \DateTime($_POST['dataInicial']): null;
    $peso = htmlspecialchars(isset($_POST['peso'])? $_POST['peso']: 0);

    if($_POST['horarioDefinido'] == 'especifico'){
        $horario = isset($_POST['horario'])? new \DateTime($_POST['horario']): null;
        $tarefaUnica = new TarefaUnica($nome, $descricao, $data, $peso, $horario);
    }else{
        $tarefaUnica = new TarefaUnica($nome, $descricao, $data, $peso);
    }
    $tarefaUnicaDao = new TarefaUnicaDAO();
    $tarefaUnicaDao->inserir($tarefaUnica);
}else if($_SERVER['REQUEST_METHOD']=='POST' && isset($_POST['repeticao']) && $_POST['repeticao'] == 'semanal'){
    //todo
    
    
}else{
    
}

header('Location: /view/index.html');
exit();
?>
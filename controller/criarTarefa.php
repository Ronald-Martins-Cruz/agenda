<?php

namespace controller;
require_once __DIR__ . '/../autoload.php';
use model\TarefaUnica;


if($_SERVER['REQUEST_METHOD']=='POST' && isset($_POST['repeticao']) && $_POST['repeticao'] == 'unica'){
    $nome = htmlspecialchars(isset($_POST['nome'])? $_POST['nome']: '');
    if(strlen($nome) < 2 || strlen($nome) > 255){
        http_response_code(400);
        die("Nome deve ter entre 2 e 255 caracteres");
    }
    $descricao = htmlspecialchars(isset($_POST['descricao'])? $_POST['descricao']: '');
    if(strlen($descricao) > 500){
        http_response_code(400);
        die("Descrição deve possuir menos de 500 caracteres");
    }
    $data = isset($_POST['dataInicial'])? new \DateTime($_POST['dataInicial']): null;
    if($data < new \DateTime('1001-01-01')){
        http_response_code(400);
        die("A data deve ser posterior ao ano 1000");
    }
    $peso = htmlspecialchars(isset($_POST['peso'])? $_POST['peso']: -1);
    if(!is_numeric($peso) || $peso < 0 || $peso > 9999){
        http_response_code(400);
        die("Peso deve ser um número entre 0 e 9999");
    }
    if(!isset($_POST['horarioDefinido']) && $_POST['horarioDefinido'] != 'especifico' && $_POST['horarioDefinido'] != 'qualquer'){
        http_response_code(400);
        die("Selecione uma opção válida para o horário");
    }
    if($_POST['horarioDefinido'] == 'especifico'){
        try{
            $horario = isset($_POST['horario'])? new \DateTime($_POST['horario']): null;
        }catch(Exception $e){
            http_response_code(400);
            die("Informe uma hora válida");
        }
        if($horario == null){
            http_response_code(400);
            die("É necessário informar um horário");
        }
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
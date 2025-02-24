<?php

namespace controller;
require_once __DIR__ . '/../autoload.php';
use model\TarefaUnica;


if($_SERVER['REQUEST_METHOD']=='POST' && isset($_POST['repeticao']) && $_POST['repeticao'] == 'unica'){
    //inlcuir htmlspecialchars e considerar a possibilidade de campos vazios
    $tarefaUnica = new TarefaUnica($_POST['nome'],$_POST['descricao'],new \DateTime($_POST['dataInicial']), $_POST['peso']);
    if($_POST['horarioDefinido'] == 'especifico'){
        $tarefaUnica->setHorario(new \DateTime($_POST['horario']));
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
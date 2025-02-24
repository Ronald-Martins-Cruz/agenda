<?php

namespace controller;
require_once __DIR__ . '/../autoload.php';

$id = isset($_GET['id'])? $_GET['id']: 0;
$tipo = isset($_GET['tipo'])? $_GET['tipo']: "";

if($id > 0){
    if($tipo == 'unica'){
        $tarefaUnicaDAO = new TarefaUnicaDAO();
        echo json_encode([$tarefaUnicaDAO->excluirTarefa($id)]);
    }
}else{
    echo json_encode(['Tarefa não encontrada']);
}

?>
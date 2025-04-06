<?php

namespace controller;
require_once __DIR__ . '/../autoload.php';
header('Content-Type: application/json');

$id = (isset($_GET['id']))? $_GET['id']: -1;
$tipo = (isset($_GET['tipo']))? $_GET['tipo']: "";

if($tipo = 'unica'){
    $tarefaDao = new TarefaUnicaDAO();
    echo(json_encode($tarefaDao->selecionarTarefaPorId($id)));
}

?>
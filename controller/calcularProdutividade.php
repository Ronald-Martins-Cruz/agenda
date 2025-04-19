<?php
namespace controller;
require_once __DIR__ . '/../autoload.php';


$dataInicial = isset($_GET['dataInicial'])?$_GET['dataInicial']:null;
$dataFinal = isset($_GET['dataFinal'])?$_GET['dataFinal']:null;

$dataInicalDate = new \DateTime($dataInicial);
$dataFinalDate = new \DateTime($dataFinal);

if($dataInicial != null && $dataFinal != null && $dataInicalDate <= $dataFinalDate){
    $tarefaUnicaDAO = new TarefaUnicaDAO();
    $tarefasUnicas = $tarefaUnicaDAO->selecionarTarefasPorPeriodo($dataInicial, $dataFinal);
    $somaPeso = 0;
    $somaPesoConcluidas = 0;
    foreach($tarefasUnicas as $tarefa){
        $somaPeso += $tarefa['peso'];
        $somaPesoConcluidas += ($tarefa['concluida'])?$tarefa['peso']:0;
    }

    if(sizeof($tarefasUnicas) == 0){
        http_response_code(404);
        die("Não há nenhuma tarefa no período selecionado");
    }
    $resultado = [];
    $resultado['somaPeso'] = $somaPeso;
    $resultado['somaPesoConcluidas'] = $somaPesoConcluidas;
    echo(json_encode($resultado));
}else{
    http_response_code(400);
    echo('A data de fim não pode ser anterior a data de início');
}
?>
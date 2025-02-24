<?php

namespace controller;
require_once __DIR__ . '/../autoload.php';

$dados = json_decode(file_get_contents("php://input"), true);

function formatarData($dia, $mes, $ano){
    if($dia < 10){
        $dia = "0" . $dia;
    }
    if($mes < 10){
        $mes = "0" . $mes;
    }
    $dataFormatada = "" . $ano . "-" . $mes . "-" . $dia;
    return $dataFormatada;  
}

if (isset($dados["mes"]) && isset($dados["diasMes"]) && isset($dados["diaSemana"]) && isset($dados["diasMesAnterior"]) && isset($dados['ano'])) {
    $mesAtual = (int)$dados["mes"];
    $diasMes = (int)$dados["diasMes"];
    $diaSemana = (int)$dados["diaSemana"];
    $anoAtual = (int)$dados['ano'];
    $diasMesAnterior = (int)$dados["diasMesAnterior"];
    $mesAnterior = ($mesAtual != 1)? $mesAtual -1: 12;
    $anoDoMesAnterior = ($mesAnterior != 12)? $anoAtual: $anoAtual - 1;
    $mesPosterior = ($mesAtual != 12)? $mesAtual +1: 1;
    $anoDoMesPosterior = ($mesPosterior != 1)? $anoAtual: $anoAtual + 1;

    $dataInicial = ($diaSemana == 0)? formatarData(1, $mesAtual, $anoAtual): 
        formatarData($diasMesAnterior - $diaSemana + 1, $mesAnterior, $anoDoMesAnterior);

    $dataInicial = new \DateTime($dataInicial);

    $dataFinal = "";

    if(($diasMes + $diaSemana) < 35){
        $dia = 35 - ($diasMes + $diaSemana);
        $mes = $mesPosterior;
        $ano = $anoDoMesPosterior;
        $dataFinal = formatarData($dia, $mes, $ano);
    }else{
        $diasFaltantes = ($diasMes + $diaSemana) - 35;
        $dia = $diasMes - $diasFaltantes;
        $mes = $mesAtual;
        $ano = $anoAtual;
        $dataFinal = formatarData($dia, $mes, $ano);
    }

    $dataFinal = new \DateTime($dataFinal);

    $tarefaUnicaDAO = new TarefaUnicaDAO(); 
    $retorno = [];
    $tarefasUnicas = [];

    $j = 1;

    for($i = clone $dataInicial; $i <= $dataFinal; $i->modify('+1 day')){
        $auxiliar = [];
        $tarefasUnicasDoDia = $tarefaUnicaDAO->selecionarTarefasPelaData($i);
        //to-do: outros tipos de tarefa
        array_push($tarefasUnicas, $tarefasUnicasDoDia);
    }
    $retorno['unica'] = $tarefasUnicas;
    //array_push($retorno, $tarefasUnicas);

    header('Content-Type: application/json');
    $json = json_encode($retorno);
    echo $json;
    
}

?>
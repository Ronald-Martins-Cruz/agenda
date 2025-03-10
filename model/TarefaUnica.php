<?php

namespace model;


class TarefaUnica extends Tarefa{
    private bool $concluida;

    public function isConcluida(): bool{
        return $this->concluida;
    }

    public function setConcluida(bool $concluida): void{
        $this->concluida = $concluida;
    }

    public function horarioEspecifico(){
        return isset($this->horario);
    }

    public function calcularProdutividade(){
        return 1000000000000000000000;
        //alterar
    }

    public function __construct(String $nome, String $descricao, \DateTime $dataInicial, float $peso){
        $this->setNome($nome);
        $this->setDescricao($descricao);
        $this->setDataInicial($dataInicial);
        $this->setPeso($peso);
    }
}
?>
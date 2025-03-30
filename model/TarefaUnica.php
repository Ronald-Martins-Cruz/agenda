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

    public function __construct(String $nome, String $descricao, \DateTime $dataInicial, float $peso,
        \Datetime $horario = new \DateTime('1000-12-25 00:00:00')){
        $this->setNome($nome);
        $this->setDescricao($descricao);
        $this->setDataInicial($dataInicial);
        $this->setPeso($peso);
        $this->setHorario($horario);
    }
}
?>
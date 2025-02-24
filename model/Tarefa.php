<?php

namespace model;

abstract class Tarefa{
    private String $nome;
    private String $descricao;
    private \DateTime $dataInicial;
    private \DateTime $horario;
    private float $peso;

    public function getNome(): string {
        return $this->nome;
    }

    public function setNome(string $nome): void {
        $this->nome = $nome;
    }

    public function getDescricao(): string {
        return $this->descricao;
    }

    public function setDescricao(string $descricao): void {
        $this->descricao = $descricao;
    }

    public function getDataInicial(): \DateTime {
        return $this->dataInicial;
    }

    public function setDataInicial(\DateTime $dataInicial): void {
        $this->dataInicial = $dataInicial;
    }

    public function getHorario(): \DateTime {
        return $this->horario;
    }

    public function setHorario(\DateTime $horario): void {
        $this->horario = $horario;
    }

    public function getPeso(): float {
        return $this->peso;
    }

    public function setPeso(float $peso): void {
        $this->peso = $peso;
    }

    abstract public function calcularProdutividade();
}

?>
<?php

namespace model;
require_once 'Tarefa.php';

class TarefaMensal extends Tarefa implements ProdutividadeMensuravel{
    private array $diasDoMes;
    private \DateTime $dataFinal;
    private int $qtdConclusoes;
    private array $cancelamentos;

    public function calcularProdutividade(){
        return 0;
        //mudar
    }

    public function getDiasDoMes(): array {
        return $this->diasDoMes;
    }

    public function setDiasDoMes(array $diasDoMes): void {
        $this->diasDoMes = $diasDoMes;
    }

    public function getDataFinal(): \DateTime {
        return $this->dataFinal;
    }

    public function setDataFinal(\DateTime $dataFinal): void {
        $this->dataFinal = $dataFinal;
    }

    public function getQtdConclusoes(): int {
        return $this->qtdConclusoes;
    }

    public function setQtdConclusoes(int $qtdConclusoes): void {
        $this->qtdConclusoes = $qtdConclusoes;
    }

    public function getCancelamentos(): array {
        return $this->cancelamentos;
    }

    public function setCancelamentos(array $cancelamentos): void {
        $this->cancelamentos = $cancelamentos;
    }

    public function qtdCancelamentos(): int{
        return sizeof(getCancelamentos());
    }

}

?>
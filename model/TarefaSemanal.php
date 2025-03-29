<?php

namespace model;


class TarefaSemanal extends Tarefa implements ProdutividadeMensuravel{
    private array $diasDaSemana;
    private \DateTime $dataFinal;
    private int $qtdConclusoes;
    private array $cancelamentos;

    public function calcularProdutividade(){
        return 0;
        //mudar
    }

    public function getDiasDaSemana(): array {
        return $this->diasDaSemana;
    }

    public function setDiasDaSemana(array $diasDaSemana): void {
        $this->diasDaSemana = $diasDaSemana;
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
import { Conta } from "../model/Conta";
import { ContaRepository } from "../repository/ContaRepository";    
import { colors } from "../util/colors";

export class ContaController implements ContaRepository {
    procurarPorNumero(numero: number): void {
        let buscaConta = this.buscarNoArray(numero);
        if (buscaConta != null) {
            console.log(colors.fg.green, "\nConta encontrada:\n", colors.reset);
            buscaConta.visualizar();
        } else {
            console.log(colors.fg.red, "\nA conta número: " + numero + " não foi encontrada!\n", colors.reset);
        }
    }

    atualizar(conta: Conta): void {
        let buscaConta = this.buscarNoArray(conta.numero);
        if (buscaConta != null) {
            this.listaContas[this.listaContas.indexOf(buscaConta)] = conta;
            console.log(colors.fg.green, "\nA conta número: " + conta.numero + " foi atualizada com sucesso!\n", colors.reset);
        } else {
            console.log(colors.fg.red, "\nA conta número: " + conta.numero + " não foi encontrada!\n", colors.reset);
        }
    }

    deletar(numero: number): void {
        let buscaConta = this.buscarNoArray(numero);
        if (buscaConta != null) {
            this.listaContas.splice(this.listaContas.indexOf(buscaConta), 1);
            console.log(colors.fg.green, "\nA conta número: " + numero + " foi removida com sucesso!\n", colors.reset);
        } else {
            console.log(colors.fg.red, "\nA conta número: " + numero + " não foi encontrada!\n", colors.reset);
        }
    }

    public sacar(numero: number, valor: number): void {
        let conta = this.buscarNoArray(numero);

        if (conta != null) {

            if (conta.sacar(valor) == true)
                console.log(colors.fg.green, "\nSaque realizado com sucesso na conta número: " + numero + "\n", colors.reset);
        } else {
            console.log(colors.fg.red, "\nA conta número: " + numero + " não foi encontrada!\n", colors.reset);
        }
    }

    public depositar(numero: number, valor: number): void {
        let conta = this.buscarNoArray(numero);
        if (conta != null) {
            conta.depositar(valor);
            console.log(colors.fg.green, "\nDepósito realizado com sucesso na conta número: " + numero + "\n", colors.reset);
        } else {
            console.log(colors.fg.red, "\nA conta número: " + numero + " não foi encontrada!\n", colors.reset);
        }
    }

    transferir(numeroOrigem: number, numeroDestino: number, valor: number): void {
        let contaOrigem = this.buscarNoArray(numeroOrigem);
        let contaDestino = this.buscarNoArray(numeroDestino);
        if (contaOrigem != null && contaDestino != null) {
            if (contaOrigem.sacar(valor)) {
                contaDestino.depositar(valor);
                console.log(colors.fg.green, `\nTransferência de ${valor} realizada com sucesso da conta ${numeroOrigem} para a conta ${numeroDestino}!\n`, colors.reset);
            } else {
                console.log(colors.fg.red, "\nSaldo insuficiente para transferência!\n", colors.reset);
            }
        } else {
            console.log(colors.fg.red, "\nConta de origem ou destino não encontrada!\n", colors.reset);
        }
    }

    private listaContas: Array<Conta> = new Array<Conta>();
    numeroConta: number = 0;

    listarTodas(): void {
        for (let conta of this.listaContas) {
            conta.visualizar();
        }
    }

    cadastrar(conta: Conta): void {
        this.listaContas.push(conta);
        console.log(colors.fg.green, "\nA conta número: " + conta.numero + " foi cadastrada com sucesso!\n", colors.reset);
    }

    public gerarNumero(): number {
        return ++this.numeroConta;
    }

    public buscarNoArray(numero: number): Conta | null {
        for (let conta of this.listaContas) {
            if (conta.numero == numero) {
                return conta;
            }
        }
        return null;
    }

}
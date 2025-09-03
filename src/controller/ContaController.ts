import { Conta } from "../model/Conta";
import { ContaRepository } from "../repository/ContaRepository";    
import { colors } from "../util/colors";

export class ContaController implements ContaRepository {
    procurarPorNumero(numero: number): void {
        throw new Error("Method not implemented.");
    }
    atualizar(conta: Conta): void {
        throw new Error("Method not implemented.");
    }
    deletar(numero: number): void {
        throw new Error("Method not implemented.");
    }
    sacar(numero: number, valor: number): void {
        throw new Error("Method not implemented.");
    }
    depositar(numero: number, valor: number): void {
        throw new Error("Method not implemented.");
    }
    transferir(numeroOrigem: number, numeroDestino: number, valor: number): void {
        throw new Error("Method not implemented.");
    }

    private listaContas: Array<Conta> = new Array<Conta>();
    numero: number =0;

    listarTodas(): void {
        for (let conta of this.listaContas) {
            conta.visualizar();
        };
    }

    cadastrar(conta: Conta): void {
        this.listaContas.push(conta);
        console.log(colors.fg.green, "\nA conta número: " + conta.numero + " foi cadastrada com sucesso!\n", colors.reset);
    }
}

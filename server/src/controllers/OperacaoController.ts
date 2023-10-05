import { Request, Response } from "express";
import { Operacao } from "../models/Operacao";
import { TestDataSource } from "../test-data-source";
import { AppDataSource } from "../data-source";

class OperacaoController {
  private conection: any;
  constructor() {
    if (process.env.NODE_ENV === "test") this.conection = TestDataSource;
    else this.conection = AppDataSource;

    this.create = this.create.bind(this);
    this.readAll = this.readAll.bind(this);
    this.readAllGroupedByCNPJ = this.readAllGroupedByCNPJ.bind(this);
    this.readByCNPJ = this.readByCNPJ.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }
  async create(req: Request, res: Response) {
    try {
      const { CNPJ, razao_social, tipo, data, quantidade, valor } = req.body;

      const operacao = new Operacao();
      operacao.CNPJ = CNPJ;
      operacao.razao_social = razao_social;
      operacao.tipo = tipo;
      operacao.data = new Date(data);
      operacao.quantidade = quantidade;
      operacao.valor = valor;

      await this.conection.manager.save(operacao);
      res.status(201).json(operacao);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async readAll(req: Request, res: Response) {
    try {
      const operacoes = await this.conection.manager.find(Operacao);
      res.json(operacoes);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async readAllGroupedByCNPJ(req: Request, res: Response) {
    try {
      const operacoes = await this.conection.manager.find(Operacao);
      const operacoesGrouped = operacoes.reduce((acc, operacao) => {
        if (!acc[operacao.CNPJ]) {
          acc[operacao.CNPJ] = {};
          acc[operacao.CNPJ].CNPJ = operacao.CNPJ;
          acc[operacao.CNPJ].razao_social = operacao.razao_social;
          acc[operacao.CNPJ].preco_total = 0;
          acc[operacao.CNPJ].quantidade_total = 0;
          acc[operacao.CNPJ].valor_unitario_atual = 1.2;
        }
        if (operacao.tipo === "COMPRA") {
          acc[operacao.CNPJ].quantidade_total += operacao.quantidade;
          acc[operacao.CNPJ].preco_total +=
            operacao.valor * operacao.quantidade;
        } else if (operacao.tipo === "VENDA") {
          acc[operacao.CNPJ].quantidade_total -= operacao.quantidade;
          acc[operacao.CNPJ].preco_total -=
            operacao.valor * operacao.quantidade;
        }
        return acc;
      }, {});
      res.json(operacoesGrouped);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async readByCNPJ(req: Request, res: Response) {
    try {
      const { CNPJ } = req.params;
      const operacoes = await this.conection.manager.find(Operacao, {
        where: { CNPJ },
      });
      res.json(operacoes);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { CNPJ, razao_social, tipo, data, quantidade, valor } = req.body;

      if (!id || isNaN(parseInt(id))) {
        res.status(400).json({ message: "ID inválido" });
        return;
      }

      const operacao = await this.conection.manager.findOne(Operacao, {
        where: { id: parseInt(id) },
      });
      if (!operacao) {
        res.status(404).json({ message: "Operação não encontrada" });
        return;
      }

      operacao.CNPJ = CNPJ;
      operacao.razao_social = razao_social;
      operacao.tipo = tipo;
      operacao.data = new Date(data);
      operacao.quantidade = quantidade;
      operacao.valor = valor;

      await this.conection.manager.save(operacao);
      res.json(operacao);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id || isNaN(parseInt(id))) {
        res.status(400).json({ message: "ID inválido" });
        return;
      }

      const operacao = await this.conection.manager.findOne(Operacao, {
        where: { id: parseInt(id) },
      });
      if (!operacao) {
        res.status(404).json({ message: "Operação não encontrada" });
        return;
      }

      await this.conection.manager.delete(Operacao, id);
      res.json(operacao);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default OperacaoController;

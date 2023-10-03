import { Request, Response } from "express";
import { Operacao } from "../models/Operacao";
import { AppDataSource } from "../data-source";

class OperacaoController {
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

      await AppDataSource.manager.save(operacao);
      res.status(201).json(operacao);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async readAll(req: Request, res: Response) {
    try {
      const operacoes = await AppDataSource.manager.find(Operacao);
      res.json(operacoes);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async readByCNPJ(req: Request, res: Response) {
    try {
      const { CNPJ } = req.params;
      const operacoes = await AppDataSource.manager.find(Operacao, {
        where: { CNPJ },
      });
      res.json(operacoes);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default OperacaoController;

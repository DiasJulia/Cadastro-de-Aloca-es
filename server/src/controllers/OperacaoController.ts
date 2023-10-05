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

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { CNPJ, razao_social, tipo, data, quantidade, valor } = req.body;

      if (!id || isNaN(parseInt(id))) {
        res.status(400).json({ message: "ID inválido" });
        return;
      }

      const operacao = await AppDataSource.manager.findOne(Operacao, {
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

      await AppDataSource.manager.save(operacao);
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

      const operacao = await AppDataSource.manager.findOne(Operacao, {
        where: { id: parseInt(id) },
      });
      if (!operacao) {
        res.status(404).json({ message: "Operação não encontrada" });
        return;
      }

      await AppDataSource.manager.delete(Operacao, id);
      res.json(operacao);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default OperacaoController;

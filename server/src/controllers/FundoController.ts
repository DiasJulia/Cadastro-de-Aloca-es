import { TestDataSource } from "../test-data-source";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { Fundo } from "../models/Fundo";
import { FetchData } from "../../utils/fetchData";

class FundoController {
  private conection: any;
  constructor() {
    if (process.env.NODE_ENV === "test") this.conection = TestDataSource;
    else this.conection = AppDataSource;

    this.createFromCSV = this.createFromCSV.bind(this);
    this.readByCNPJAndDate = this.readByCNPJAndDate.bind(this);
  }

  async createFromCSV(req: Request, res: Response) {
    try {
      const { cnpj, data } = req.body;
      if (!cnpj || !data) {
        res.status(400).json({
          message: "Parâmetros CNPJ e data são obrigatórios.",
        });
        return;
      }
      const fetchData = new FetchData();
      const zipData = await fetchData.downloadZipFile(data as string);
      if (!zipData) {
        res.status(404).json({
          message: "Não foi possível encontrar o arquivo zip.",
        });
        return;
      }
      const csvData = await fetchData.extractCSVFromZIP(zipData);
      if (!csvData) {
        res.status(404).json({
          message: "Não foi possível encontrar o arquivo CSV.",
        });
        return;
      }
      const rows = csvData.split("\n");
      for (let i = 1; i < rows.length; i++) {
        const row = rows[i].split(";");
        if (row[1] === cnpj) {
          const fundo = new Fundo();
          fundo.CNPJ = cnpj as string;
          fundo.data = new Date(row[2]);
          fundo.valor = parseFloat(row[4]);
          await this.conection.manager.save(fundo);
        }
      }
      res.status(201).json({
        message: "Fundos criados com sucesso.",
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async createHistoricalDataByCNPJ(req: Request, res: Response) {
    try {
      const { cnpj } = req.params;
      if (!cnpj) {
        res.status(400).json({
          message: "Parâmetro CNPJ é obrigatório.",
        });
        return;
      }
      const fetchData = new FetchData();
      const zipData = await fetchData.downloadZipFile(
        new Date(Date.now()).toISOString()
      );
      if (!zipData) {
        res.status(404).json({
          message: "Não foi possível encontrar o arquivo zip.",
        });
        return;
      }
      const csvData = await fetchData.extractCSVFromZIP(zipData);
      if (!csvData) {
        res.status(404).json({
          message: "Não foi possível encontrar o arquivo CSV.",
        });
        return;
      }
      const rows = csvData.split("\n");
      for (let i = 1; i < rows.length; i++) {
        const row = rows[i].split(";");
        if (row[1] === cnpj) {
          const fundo = new Fundo();
          fundo.CNPJ = cnpj;
          fundo.data = new Date(row[2]);
          fundo.valor = parseFloat(row[4]);
          await this.conection.manager.save(fundo);
        }
      }
      res.status(201).json({
        message: "Fundos criados com sucesso.",
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async readByCNPJAndDate(req: Request, res: Response) {
    try {
      const { cnpj, data } = req.query;
      if (!cnpj || !data) {
        res.status(400).json({
          message: "Parâmetros CNPJ e data são obrigatórios.",
        });
        return;
      }
      const fundo = await this.conection.manager.findOne(Fundo, {
        where: { CNPJ: cnpj, data: new Date(data as string) },
      });
      if (!fundo) {
        const fetchData = new FetchData();
        const zipData = await fetchData.downloadZipFile(data as string);
        if (!zipData) {
          res.status(404).json({
            message: "Não foi possível encontrar o arquivo zip.",
          });
          return;
        }
        const csvData = await fetchData.extractCSVFromZIP(zipData);
        if (!csvData) {
          res.status(404).json({
            message: "Não foi possível encontrar o arquivo CSV.",
          });
          return;
        }
        const cotaValue = fetchData.searchCSVForCota(
          csvData,
          cnpj as string,
          data as string
        );
        if (!cotaValue) {
          res.status(404).json({
            message:
              "Valor da cota não encontrada para o CNPJ e data especificados.",
          });
          const rows = csvData.split("\n");
          for (let i = 1; i < rows.length; i++) {
            const row = rows[i].split(";");
            if (row[1] === cnpj) {
              const fundo = new Fundo();
              fundo.CNPJ = cnpj;
              fundo.data = new Date(row[2]);
              fundo.valor = parseFloat(row[4]);
              await this.conection.manager.save(fundo);
            }
          }
          return;
        }
        res.status(200).json({ valor: cotaValue });
        const rows = csvData.split("\n");
        for (let i = 1; i < rows.length; i++) {
          const row = rows[i].split(";");
          if (row[1] === cnpj) {
            const fundo = new Fundo();
            fundo.CNPJ = cnpj;
            fundo.data = new Date(row[2]);
            fundo.valor = parseFloat(row[4]);
            await this.conection.manager.save(fundo);
          }
        }
        return;
      }
      res.status(200).json(fundo);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async readByCNPJ(req: Request, res: Response) {
    try {
      const { cnpj } = req.params;
      const fundos = await this.conection.manager.find(Fundo, {
        where: { CNPJ: cnpj },
      });
      res.json(fundos);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default FundoController;

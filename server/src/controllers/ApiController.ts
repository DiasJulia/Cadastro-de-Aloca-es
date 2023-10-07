import axios from "axios";
import { Request, Response } from "express";
import JSZip from "jszip";

class ApiController {
  private baseURL = "https://dados.cvm.gov.br/dados/FI/DOC/INF_DIARIO/DADOS/";
  constructor() {
    this.downloadZipFile = this.downloadZipFile.bind(this);
    this.extractCSVFromZIP = this.extractCSVFromZIP.bind(this);
    this.searchCSVForCota = this.searchCSVForCota.bind(this);
    this.fetchCSVDataByCNPJAndDate = this.fetchCSVDataByCNPJAndDate.bind(this);
  }

  public async downloadZipFile(res: Response, data): Promise<Buffer> {
    try {
      const formattedDate = data.replace(/-/g, "").slice(0, 6); // Remova o dia da data
      const zipFileURL = `${this.baseURL}inf_diario_fi_${formattedDate}.zip`;
      const response = await axios.get(zipFileURL, {
        responseType: "arraybuffer",
      });
      return response.data;
    } catch (err) {
      res
        .status(404)
        .json({ message: "Não foi possível encontrar o arquivo." });
    }
  }

  public async extractCSVFromZIP(
    zipData: Buffer,
    res: Response
  ): Promise<string> {
    try {
      const zip = new JSZip();
      const zipContent = await zip.loadAsync(zipData);

      // Procurar o arquivo CSV no ZIP
      for (const filename in zipContent.files) {
        if (filename.endsWith(".csv")) {
          return zipContent.files[filename].async("text");
        }
      }
    } catch (err) {
      res
        .status(404)
        .json({ message: "Não foi possível encontrar o arquivo." });
    }
  }

  public searchCSVForCota(csvData, cnpj, date): number | null {
    console.log("searchCSVForCota", cnpj, date);
    const rows = csvData.split("\n");
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i].split(";");
      if (row[1] === cnpj && row[2] === date) {
        return parseFloat(row[4]);
      }
    }
    return null;
  }

  async fetchCSVDataByCNPJAndDate(req: Request, res: Response) {
    try {
      const { cnpj, data } = req.query;
      if (!cnpj || !data) {
        res.status(400).json({
          message: "Parâmetros CNPJ e data são obrigatórios.",
        });
        return;
      }
      const zipData = await this.downloadZipFile(res, data);
      const csvData = await this.extractCSVFromZIP(zipData, res);
      const cotaValue = this.searchCSVForCota(csvData, cnpj, data);

      if (cotaValue === null) {
        console.log("Cota não encontrada para o CNPJ e data especificados.");
        res.status(404).json({
          message: "Cota não encontrada para o CNPJ e data especificados.",
        });
        return;
      }

      res.json({ cotaValue });
    } catch (error) {
      console.error("Ocorreu um erro:", error);
      res.status(500).json({ message: "Ocorreu um erro." });
    }
  }
}

export default ApiController;

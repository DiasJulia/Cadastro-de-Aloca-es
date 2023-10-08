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

  public async downloadZipFile(res: Response, data): Promise<Buffer | null> {
    try {
      const formattedDate = data.replace(/-/g, "").slice(0, 6); // Remova o dia da data
      const zipFileURL = `${this.baseURL}inf_diario_fi_${formattedDate}.zip`;
      const response = await axios.get(zipFileURL, {
        responseType: "arraybuffer",
      });
      return response.data;
    } catch (err) {
      return null;
    }
  }

  public async extractCSVFromZIP(
    zipData: Buffer,
    res: Response
  ): Promise<string | null> {
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
      return null;
    }
  }

  public searchCSVForCota(csvData, cnpj, date): number | null {
    const rows = csvData.split("\n");
    let mostRecentDate = "1900-01-01";
    let mostRecentCota = 0;
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i].split(";");
      if (row[1] === cnpj && row[2] === date) {
        return parseFloat(row[4]);
      }
      if (row[1] === cnpj && row[2] > mostRecentDate && row[2] <= date) {
        mostRecentDate = row[2];
        mostRecentCota = parseFloat(row[4]);
      }
    }
    if (mostRecentCota > 0) {
      return mostRecentCota;
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
      if (zipData === null) {
        res.status(404).json({
          message: "Não foi possível encontrar o arquivo zip.",
        });
        return;
      }
      const csvData = await this.extractCSVFromZIP(zipData, res);
      if (csvData === null) {
        res.status(404).json({
          message: "Não foi possível encontrar o arquivo CSV.",
        });
        return;
      }
      const cotaValue = this.searchCSVForCota(csvData, cnpj, data);

      if (cotaValue === null) {
        console.log("Cota não encontrada para o CNPJ e data especificados.");
        res.status(404).json({
          message: "Cota não encontrada para o CNPJ e data especificados.",
        });
        return;
      }

      res.json({ valor: cotaValue });
    } catch (error) {
      console.error("Ocorreu um erro:", error);
      res.status(500).json({ message: "Ocorreu um erro." });
    }
  }
}

export default ApiController;

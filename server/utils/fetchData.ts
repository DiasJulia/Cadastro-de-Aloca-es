import axios from "axios";
import JSZip from "jszip";
const fs = require("fs");
const csv = require("csv-parser");

export class FetchData {
  // URL do arquivo ZIP
  private zipFileURL =
    "https://dados.cvm.gov.br/dados/FI/DOC/INF_DIARIO/DADOS/inf_diario_fi_202310.zip";

  async findCotaValue(cnpj, date): Promise<number> {
    const zipData = await this.downloadZipFile();
    const csvData = await this.extractCSVFromZIP(zipData);
    const cotaValue = this.searchCSVForCota(csvData, cnpj, date);

    if (cotaValue === null) {
      throw new Error("Cota não encontrada para o CNPJ e data especificados.");
    }

    return cotaValue;
  }

  async downloadZipFile(): Promise<Buffer> {
    const response = await axios.get(this.zipFileURL, {
      responseType: "arraybuffer",
    });
    return response.data;
  }

  async extractCSVFromZIP(zipData: Buffer): Promise<string> {
    const zip = new JSZip();
    const zipContent = await zip.loadAsync(zipData);

    // Procurar o arquivo CSV no ZIP
    for (const filename in zipContent.files) {
      if (filename.endsWith(".csv")) {
        return zipContent.files[filename].async("text");
      }
    }

    throw new Error("Arquivo CSV não encontrado no ZIP.");
  }

  private searchCSVForCota(
    csvData: string,
    cnpj: string,
    date: string
  ): number | null {
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

  async checkIfCNPJExists(cnpj: string): Promise<boolean> {
    const zipData = await this.downloadZipFile();
    const csvData = await this.extractCSVFromZIP(zipData);
    const cotaValue = this.searchCSVForCNPJ(csvData, cnpj);

    if (cotaValue === null) {
      throw new Error("CNPJ não encontrado.");
    }

    return cotaValue;
  }

  private searchCSVForCNPJ(csvData: string, cnpj: string): boolean | null {
    const rows = csvData.split("\n");
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i].split(";");
      if (row[1] === cnpj) {
        return true;
      }
    }
    return null;
  }
}

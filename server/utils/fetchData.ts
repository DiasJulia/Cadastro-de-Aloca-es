import axios from "axios";
import JSZip from "jszip";
const fs = require("fs");
const csv = require("csv-parser");

export class FetchData {
  private baseURL = "https://dados.cvm.gov.br/dados/FI/DOC/INF_DIARIO/DADOS/";
  constructor() {
    this.downloadZipFile = this.downloadZipFile.bind(this);
    this.extractCSVFromZIP = this.extractCSVFromZIP.bind(this);
    this.searchCSVForCota = this.searchCSVForCota.bind(this);
  }

  public async downloadZipFile(data): Promise<Buffer | null> {
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

  public async extractCSVFromZIP(zipData: Buffer): Promise<string | null> {
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
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i].split(";");
      if (row[1] === cnpj && row[2] === date) {
        return parseFloat(row[4]);
      }
    }
    return null;
  }

  public searchCSVForNearestCota(csvData, cnpj, date): number | null {
    const rows = csvData.split("\n");
    let shortestDateDifference = Number.MAX_SAFE_INTEGER;
    let nearestCota = -1;
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i].split(";");
      if (
        row[1] === cnpj &&
        Math.abs(new Date(row[2]).valueOf() - new Date(date).valueOf()) <
          shortestDateDifference
      ) {
        shortestDateDifference = Math.abs(
          new Date(row[2]).valueOf() - new Date(date).valueOf()
        );
        nearestCota = parseFloat(row[4]);
      }
    }
    if (nearestCota > -1) {
      return nearestCota;
    }
    return null;
  }

  public async searchCSVForMostRecentCotaByCNPJ(
    cnpj: string
  ): Promise<{ mostRecentCota: number; mostRecentDate: string } | null> {
    try {
      const zipData = await this.downloadZipFile(
        new Date(Date.now()).toISOString()
      );
      const csvData = await this.extractCSVFromZIP(zipData);
      const rows = csvData.split("\n");
      let mostRecentCota = -1;
      let mostRecentDate = "1900-01-01";
      for (let i = 1; i < rows.length; i++) {
        const row = rows[i].split(";");
        if (row[1] === cnpj) {
          const cota = parseFloat(row[4]);
          const date = row[2];
          if (new Date(date) > new Date(mostRecentDate)) {
            mostRecentCota = cota;
            mostRecentDate = date;
          }
        }
      }
      return { mostRecentCota, mostRecentDate };
    } catch (err) {
      return null;
    }
  }
}

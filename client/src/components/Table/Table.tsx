"use client";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import TimelineIcon from "@mui/icons-material/Timeline";

import "./Table.css";

import axios from "axios";

interface Data {
  CNPJ: string;
  razao_social: string;
  quantidade_total: number;
  preco_total: number;
  valor_unitario_atual: number;
  data_consulta: string;
}

function TableComponent() {
  const [data, setData] = useState<Data[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/operacao/grouped")
      .then((response) => {
        var aux: Data[] = [];
        for (var CNPJ in response.data) {
          aux.push(response.data[CNPJ]);
        }
        setData(aux);
        setIsLoading(false);
      })
      .catch((error) => {});
  }, []);

  return (
    <TableContainer component={Paper}>
      {isLoading ? (
        <div className="progress-container">
          <CircularProgress />
        </div>
      ) : (
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>CNPJ</TableCell>
              <TableCell align="right">Razão Social</TableCell>
              <TableCell align="right">Data da Consulta</TableCell>
              <TableCell align="right">Valor unitário da cota</TableCell>
              <TableCell align="right">Número de cotas</TableCell>
              <TableCell align="right">Preço médio</TableCell>
              <TableCell align="right">Retorno da operação</TableCell>
              <TableCell align="right">Saldo de aplicação no fundo</TableCell>
              <TableCell align="right">Histórico</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell align="center" colSpan={9}>
                  Nenhum dado encontrado
                </TableCell>
              </TableRow>
            ) : (
              data.map((row) => (
                <TableRow
                  key={row.CNPJ}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.CNPJ}
                  </TableCell>
                  <TableCell align="right">{row.razao_social}</TableCell>
                  <TableCell align="right">
                    {row.data_consulta === "1900-01-01"
                      ? "-"
                      : new Date(
                          row.data_consulta + "T00:00:00"
                        ).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="right">
                    {row.valor_unitario_atual >= 0
                      ? "R$" +
                        row.valor_unitario_atual.toFixed(2).replace(".", ",")
                      : "-"}
                  </TableCell>
                  <TableCell align="right">{row.quantidade_total}</TableCell>
                  <TableCell align="right">
                    R$
                    {(row.preco_total / row.quantidade_total)
                      .toFixed(2)
                      .replace(".", ",")}
                  </TableCell>
                  <TableCell align="right">
                    {row.valor_unitario_atual === -1
                      ? "0,00%"
                      : (
                          100 *
                          (row.valor_unitario_atual /
                            (row.preco_total / row.quantidade_total) -
                            1)
                        )
                          .toFixed(2)
                          .replace(".", ",") + "%"}
                  </TableCell>
                  <TableCell align="right">
                    R$
                    {(
                      row.quantidade_total *
                      (row.valor_unitario_atual >= 0
                        ? row.valor_unitario_atual
                        : row.preco_total / row.quantidade_total)
                    )
                      .toFixed(2)
                      .replace(".", ",")}
                  </TableCell>
                  <TableCell align="center">
                    <a href={"/history?cnpj=" + row.CNPJ}>
                      <TimelineIcon className="action-button" />
                    </a>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
}

export default TableComponent;

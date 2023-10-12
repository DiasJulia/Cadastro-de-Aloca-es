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

import "./Table.css";

import axios from "axios";

interface Data {
  CNPJ: string;
  razao_social: string;
  quantidade_total: number;
  preco_total: number;
  valor_unitario_atual: number;
}

function TableComponent() {
  const [data, setData] = useState<Data[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/operacao/grouped")
      .then((response) => {
        console.log(response.data);
        var aux: Data[] = [];
        for (var CNPJ in response.data) {
          console.log(CNPJ);
          console.log(response.data[CNPJ]);
          aux.push(response.data[CNPJ]);
        }
        setData(aux);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
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
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.CNPJ}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.CNPJ}
                </TableCell>
                <TableCell align="right">{row.razao_social}</TableCell>
                <TableCell align="right">
                  {new Date().toLocaleDateString()}
                </TableCell>
                <TableCell align="right">
                  {row.valor_unitario_atual.toFixed(2).replace(".", ",")}
                </TableCell>
                <TableCell align="right">{row.quantidade_total}</TableCell>
                <TableCell align="right">
                  {(row.preco_total / row.quantidade_total)
                    .toFixed(2)
                    .replace(".", ",")}
                </TableCell>
                <TableCell align="right">
                  {(
                    100 *
                    (row.valor_unitario_atual /
                      (row.preco_total / row.quantidade_total) -
                      1)
                  )
                    .toFixed(2)
                    .replace(".", ",") + "%"}
                </TableCell>
                <TableCell align="right">
                  {(row.quantidade_total * row.valor_unitario_atual)
                    .toFixed(2)
                    .replace(".", ",")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
}

export default TableComponent;

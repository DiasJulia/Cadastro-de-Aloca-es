"use client";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Delete, Edit } from "@mui/icons-material";
import "./OperationTable.css";

import axios from "axios";

interface Data {
  id: number;
  CNPJ: string;
  razao_social: string;
  data: string;
  tipo: string;
  valor: number;
  quantidade: number;
}

function createData(
  id: number,
  CNPJ: string,
  razao_social: string,
  data: string,
  tipo: string,
  valor: number,
  quantidade: number
) {
  return {
    id,
    CNPJ,
    razao_social,
    data,
    tipo,
    valor,
    quantidade,
  };
}

function OperationTable() {
  const [data, setData] = useState<Data[]>([
    createData(
      1,
      "11.511.517/0001-61",
      "Empresa 1",
      "2023-10-03T00:00:00.000Z",
      "COMPRA",
      1,
      1.04
    ),
  ]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/operacao").then((response) => {
      console.log(response.data);
      setData(response.data);
    });
  }, []);

  const editOperation = (id: number) => () => {};

  const deleteOperation = (id: number) => () => {
    axios
      .delete(`http://localhost:3001/api/operacao/${id}`)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      });
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>CNPJ</TableCell>
            <TableCell align="right">Razão Social</TableCell>
            <TableCell align="right">Data da Operação</TableCell>
            <TableCell align="right">Tipo</TableCell>
            <TableCell align="right">Preço</TableCell>
            <TableCell align="right">Número de cotas</TableCell>
            <TableCell align="right">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.CNPJ}
              </TableCell>
              <TableCell align="right">{row.razao_social}</TableCell>
              <TableCell align="right">
                {new Date(row.data).toLocaleDateString()}
              </TableCell>
              <TableCell align="right">{row.tipo}</TableCell>
              <TableCell align="right">{row.valor}</TableCell>
              <TableCell align="right">{row.quantidade}</TableCell>
              <TableCell align="right">
                <Edit
                  color="action"
                  className="action-button"
                  onClick={editOperation(row.id)}
                />
                <Delete
                  color="action"
                  className="action-button"
                  onClick={deleteOperation(row.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default OperationTable;

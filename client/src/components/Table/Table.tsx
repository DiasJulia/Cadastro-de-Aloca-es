import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(
  CNPJ: string,
  razao_social: string,
  quantidade_total: number,
  valor_total: number,
  valor_unitario_atual: number
) {
  return {
    CNPJ,
    razao_social,
    quantidade_total,
    valor_total,
    valor_unitario_atual,
  };
}

const rows = [createData("11.511.517/0001-61", "Empresa 1", 1, 1, 1.03)];

function TableComponent() {
  return (
    <TableContainer component={Paper}>
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
          {rows.map((row) => (
            <TableRow
              key={row.CNPJ}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.CNPJ}
              </TableCell>
              <TableCell align="right">{row.razao_social}</TableCell>
              <TableCell align="right">{"05/10/23"}</TableCell>
              <TableCell align="right">{row.valor_unitario_atual}</TableCell>
              <TableCell align="right">{row.quantidade_total}</TableCell>
              <TableCell align="right">
                {row.valor_total / row.quantidade_total}
              </TableCell>
              <TableCell align="right">
                {row.valor_unitario_atual /
                  (row.valor_total / row.quantidade_total) -
                  1}
              </TableCell>
              <TableCell align="right">
                {row.quantidade_total * row.valor_unitario_atual}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableComponent;

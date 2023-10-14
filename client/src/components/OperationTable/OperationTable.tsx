"use client";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import CircularProgress from "@mui/material/CircularProgress";
import { Delete, Edit } from "@mui/icons-material";
import "./OperationTable.css";

import axios from "axios";
import { OperationForm } from "..";
import Button from "@mui/material/Button";
import { Card, Snackbar, TextField } from "@mui/material";

interface Data {
  id: number;
  CNPJ: string;
  razao_social: string;
  data: string;
  tipo: string;
  valor: number;
  quantidade: number;
}

function OperationTable() {
  const [isLoading, setIsLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [currentData, setCurrentData] = useState<Data | null>(null);
  const [data, setData] = useState<Data[]>([]);
  const [currentDataFilter, setCurrentDataFilter] = useState<Data[]>([]);

  const [dataInicio, setDataInicio] = useState<string | null>("");
  const [dataFim, setDataFim] = useState<string | null>("");

  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [currentId, setCurrentId] = useState<number | null>(null);

  const filterData = () => {
    const filteredData = data.filter((row) => {
      const data = new Date(row.data);
      if (!dataInicio || !dataFim) return true;
      const dataInicioDate = new Date(dataInicio ? dataInicio : Date.now());
      const dataFimDate = new Date(dataFim ? dataFim : Date.now());
      return data >= dataInicioDate && data <= dataFimDate;
    });
    console.log(filteredData);
    setCurrentDataFilter(filteredData);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/operacao")
      .then((response) => {
        console.log(response.data);
        setData(response.data);
        setCurrentDataFilter(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setOpenSnackbar(true);
        setSnackbarMessage("Erro ao carregar operações. Tente novamente.");
      });
  }, []);

  const editOperation = (id: number) => () => {
    const operation = data.find((row) => row.id === id);
    if (operation) {
      setCurrentData(operation);
      console.log(operation);
      setModalOpen(true);
    }
  };

  const deleteOperation = (id: number) => () => {
    axios
      .delete(`http://localhost:3001/api/operacao/${id}`)
      .then((response) => {
        setData(data.filter((row) => row.id !== id));
        setCurrentDataFilter(data);
        handleCloseDialog();
        setSnackbarMessage("Operação apagada com sucesso.");
        setOpenSnackbar(true);
      })
      .catch((err) => {
        console.log(err);
        handleCloseDialog();
        setSnackbarMessage("Erro ao apagar operação. Tente novamente.");
        setOpenSnackbar(true);
      });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDialog = (id: number) => () => {
    setCurrentId(id);
    setOpenDialog(true);
  };

  const clearFilter = () => {
    setDataInicio("");
    setDataFim("");
    setCurrentDataFilter(data);
  };

  return (
    <>
      <div className="container">
        <Card className="filter-card">
          <h4 className="m-1">Filtros</h4>
          <TextField
            className="m-1"
            InputLabelProps={{ shrink: true }}
            type="date"
            InputProps={{
              inputProps: {
                min: "2020-05-01",
                max: new Date(Date.now()).toISOString().split("T")[0],
              },
            }}
            id="input-data"
            label="Data de Início"
            variant="outlined"
            value={dataInicio}
            onChange={(e: any) => setDataInicio(e.target.value || null)}
          ></TextField>
          <TextField
            className="m-1"
            InputLabelProps={{ shrink: true }}
            type="date"
            InputProps={{
              inputProps: {
                min: "2020-05-01",
                max: new Date(Date.now()).toISOString().split("T")[0],
              },
            }}
            id="input-data"
            label="Data de Fim"
            variant="outlined"
            value={dataFim}
            onChange={(e: any) => setDataFim(e.target.value || null)}
          ></TextField>
          <div className="d-flex">
            <Button onClick={clearFilter} variant="outlined" color="error">
              Limpar
            </Button>
            <Button onClick={filterData} variant="contained">
              Filtrar
            </Button>
          </div>
        </Card>
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
                  <TableCell align="right">Data da Operação</TableCell>
                  <TableCell align="right">Tipo</TableCell>
                  <TableCell align="right">Preço</TableCell>
                  <TableCell align="right">Número de cotas</TableCell>
                  <TableCell align="right">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentDataFilter.map((row) => (
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
                    <TableCell align="right">
                      {row.valor.toFixed(2).replace(".", ",")}
                    </TableCell>
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
                        onClick={handleOpenDialog(row.id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <OperationForm
          modalOpen={modalOpen}
          closeModal={() => setModalOpen(false)}
          currentData={currentData}
        />
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Você tem certeza que deseja apagar essa operação?
              <br />
              Essa ação não pode ser desfeita.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancelar</Button>
            <Button onClick={deleteOperation(currentId!)} color="error">
              Apagar
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
          message={snackbarMessage}
        />
      </div>
    </>
  );
}

export default OperationTable;

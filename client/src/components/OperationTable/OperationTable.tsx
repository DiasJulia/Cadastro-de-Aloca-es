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
import {
  Card,
  Container,
  Snackbar,
  TablePagination,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";

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
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const [currentData, setCurrentData] = useState<Data | null>(null);
  const [data, setData] = useState<Data[]>([]);
  const [currentDataFilter, setCurrentDataFilter] = useState<Data[]>([]);

  const [dataInicio, setDataInicio] = useState<string | null>("");
  const [dataFim, setDataFim] = useState<string | null>("");

  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [currentId, setCurrentId] = useState<number | null>(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filterData = () => {
    const filteredData = data.filter((row) => {
      const data = new Date(row.data);
      if (!dataInicio || !dataFim) return true;
      const dataInicioDate = new Date(dataInicio ? dataInicio : Date.now());
      const dataFimDate = new Date(dataFim ? dataFim : Date.now());
      return data >= dataInicioDate && data <= dataFimDate;
    });
    setCurrentDataFilter(filteredData);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/operacao")
      .then((response) => {
        setData(response.data);
        setCurrentDataFilter(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setOpenSnackbar(true);
        setSnackbarMessage("Erro ao carregar operações. Tente novamente.");
      });
  }, []);

  const editOperation = (id: number) => () => {
    const operation = data.find((row) => row.id === id);
    if (operation) {
      setCurrentData(operation);
      router.push(`/operations?modalOpen=true`);
    }
  };

  const deleteOperation = (id: number) => () => {
    axios
      .delete(`http://localhost:3001/api/operacao/${id}`)
      .then((response) => {
        setData(data.filter((row) => row.id !== id));
        setCurrentDataFilter(currentDataFilter.filter((row) => row.id !== id));
        handleCloseDialog();
        setSnackbarMessage("Operação apagada com sucesso.");
        setOpenSnackbar(true);
      })
      .catch((err) => {
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

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const closeModal = () => {
    router.push("/operations");
  };

  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "stretch", md: "flex-start" },
        }}
      >
        <Card className="filter-card" sx={{ mr: { xs: 0, md: 2 }, mb: 2 }}>
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
            <>
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
                  {currentDataFilter
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
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
                          R${row.valor.toFixed(2).replace(".", ",")}
                        </TableCell>
                        <TableCell align="right">{row.quantidade}</TableCell>
                        <TableCell align="right">
                          <Edit
                            id="edit-button"
                            color="action"
                            className="action-button"
                            onClick={editOperation(row.id)}
                          />
                          <Delete
                            id="delete-button"
                            color="action"
                            className="action-button"
                            onClick={handleOpenDialog(row.id)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[15]}
                component="div"
                count={currentDataFilter.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
          )}
        </TableContainer>
        <OperationForm
          modalOpen={router.query.modalOpen === "true"}
          closeModal={closeModal}
          setData={setCurrentDataFilter}
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
            <Button
              id="confirm-delete"
              onClick={deleteOperation(currentId!)}
              color="error"
            >
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
      </Container>
    </>
  );
}

export default OperationTable;

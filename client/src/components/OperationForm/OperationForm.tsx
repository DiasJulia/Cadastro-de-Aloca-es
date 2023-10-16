import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import "./OperationForm.css";
import axios from "axios";
import CurrencyFormat from "react-currency-format";
import { FormProvider, useForm } from "react-hook-form";
import { FormHelperText, Snackbar } from "@mui/material";

function OperationForm(props: any) {
  const { modalOpen, closeModal, setData } = props;
  let { currentData } = props;

  const [step, setStep] = useState(1);
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const [tipo, setTipo] = useState<string | null>("");
  const [cnpj, setCnpj] = useState<string | null>("");
  const [razaoSocial, setRazaoSocial] = useState<string | null>("");
  const [quantidade, setQuantidade] = useState<Number | null>(null);
  const [valorUnitario, setValorUnitario] = useState<Number | null>(null);
  const [date, setDate] = useState<string | null>(
    new Date(Date.now()).toISOString().split("T")[0]
  );

  const [receivedCNPJ, setReceivedCNPJ] = useState<string | null>("");
  const [receivedDate, setReceivedDate] = useState<string | null>("" as string);
  const [receivedValue, setReceivedValue] = useState<Number | null>();

  const methods = useForm();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTipo(event.target.value);
  };

  const submitForm = () => {
    const data = {
      tipo: tipo,
      CNPJ: cnpj,
      razao_social: razaoSocial,
      data: new Date(date ? date + "T00:00" : Date.now()),
      quantidade: quantidade,
      valor: valorUnitario,
    };
    if (currentData) {
      axios
        .put(`http://localhost:3001/api/operacao/${currentData.id}`, data)
        .then((response) => {
          console.log(response);
          closeModal();
          setData((prevData: any) => {
            const newData = [...prevData];
            const index = newData.findIndex(
              (data: any) => data.id === currentData.id
            );
            newData[index] = response.data;
            return newData;
          });
          handleOpenSnackbar("Operação editada com sucesso!");
        })
        .catch((error) => {
          console.log(error);
          closeModal();
          handleOpenSnackbar("Erro ao editar operação!");
        });

      return;
    } else {
      axios
        .post("http://localhost:3001/api/operacao", data)
        .then((response) => {
          console.log(response);
          setData((prevData: any) => [response.data, ...prevData]);
          closeModal();
          handleOpenSnackbar("Operação adicionada com sucesso!");
        })
        .catch((error) => {
          console.log(error);
          closeModal();
          handleOpenSnackbar("Erro ao adicionar operação!");
        });
    }
  };

  const handleNextStep = () => {
    console.log(currentData);
    if (step === 1) {
      if (razaoSocial && cnpj && date) {
        if ((receivedCNPJ === cnpj && receivedDate === date) || currentData) {
          setStep(2);
          return;
        } else {
          axios
            .get(`http://localhost:3001/api/fundo?cnpj=${cnpj}&data=${date}`)
            .then((response) => {
              setReceivedCNPJ(cnpj);
              setReceivedDate(date);
              setReceivedValue(response.data.valor);
              setValorUnitario(response.data.valor);
              setStep(2);
            })
            .catch((error) => {
              console.log(error);
              handleOpenSnackbar(
                "Não foi possível encontrar o valor da cota neste dia! \n Por favor, insira manualmente ciente de que dados incorretos podem gerar inconsistências."
              );
              setStep(2);
            });
        }
      }
    } else {
      if (step === 2) {
        setStep(1);
      }
    }
  };

  const handleOpenSnackbar = (message: string) => {
    setSnackMessage(message);
    setOpenSnack(true);
  };

  const handleCloseSnackbar = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };

  useEffect(() => {
    if (currentData) {
      setTipo(currentData.tipo);
      setCnpj(currentData.CNPJ);
      setRazaoSocial(currentData.razao_social);
      setQuantidade(currentData.quantidade);
      setValorUnitario(currentData.valor);
      setDate(new Date(currentData.data).toISOString().split("T")[0]);
    } else {
      setTipo("");
      setCnpj("");
      setRazaoSocial("");
      setQuantidade(null);
      setValorUnitario(null);
      setDate(new Date(Date.now()).toISOString().split("T")[0]);
    }
  }, [currentData]);

  return (
    <>
      <Modal className="form-modal" open={modalOpen} onClose={closeModal}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(submitForm)}>
            <FormControl className="register-form">
              <FormLabel className="form-title">
                <h3>{currentData ? "Editar" : "Adicionar"} Operação</h3>
              </FormLabel>
              <br />
              {step === 1 && (
                <>
                  <TextField
                    required
                    name="cnpj"
                    error={cnpj === null ? true : false}
                    id="input-cnpj"
                    label="CNPJ"
                    variant="outlined"
                    value={cnpj}
                    onChange={(e: any) => setCnpj(e.target.value || null)}
                  ></TextField>
                  <br />
                  <TextField
                    required
                    name="razao-social"
                    error={razaoSocial === null ? true : false}
                    id="input-razao-social"
                    label="Razão Social"
                    variant="outlined"
                    value={razaoSocial}
                    onChange={(e: any) =>
                      setRazaoSocial(e.target.value || null)
                    }
                  ></TextField>
                  <br />
                  <TextField
                    required
                    name="data"
                    error={
                      date === null || new Date(date) > new Date(Date.now())
                        ? true
                        : false
                    }
                    type="date"
                    InputProps={{
                      inputProps: {
                        min: "2020-05-01",
                        max: new Date(Date.now()).toISOString().split("T")[0],
                      },
                    }}
                    id="input-data"
                    label="Data"
                    variant="outlined"
                    value={date}
                    onChange={(e: any) => setDate(e.target.value || null)}
                  ></TextField>
                  <FormHelperText error={true}>
                    {date === null || new Date(date) > new Date(Date.now())
                      ? "Data inválida"
                      : ""}
                  </FormHelperText>
                  <br />
                  <div className="button-container">
                    <Button
                      id="next-button"
                      variant="contained"
                      color="primary"
                      onClick={handleNextStep}
                    >
                      Próximo
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={closeModal}
                    >
                      Cancelar
                    </Button>
                  </div>
                </>
              )}
              {step === 2 && (
                <>
                  <TextField
                    required
                    name="tipo"
                    select
                    error={tipo === null ? true : false}
                    id="input-tipo"
                    value={tipo}
                    onChange={handleChange}
                    label="Tipo"
                    variant="outlined"
                  >
                    <MenuItem value="COMPRA">Compra</MenuItem>
                    <MenuItem value="VENDA">Venda</MenuItem>
                  </TextField>
                  <br />
                  <TextField
                    required
                    name="quantidade"
                    error={quantidade === null ? true : false}
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    id="input-quantidade"
                    label="Quantidade"
                    variant="outlined"
                    value={quantidade}
                    onChange={(e: any) =>
                      setQuantidade(parseInt(e.target.value) || null)
                    }
                  ></TextField>
                  <br />
                  <CurrencyFormat
                    required
                    name="valor"
                    error={valorUnitario === null ? true : false}
                    customInput={TextField}
                    thousandSeparator="."
                    decimalSeparator=","
                    fixedDecimalScale={true}
                    prefix="R$"
                    decimalScale={2}
                    placeholder="R$ 0,00"
                    label="Valor Unitário"
                    value={`R$ ${valorUnitario?.toString().replace(".", ",")}`}
                    onValueChange={(values) => {
                      const { formattedValue, value } = values;
                      setValorUnitario(parseFloat(value));
                    }}
                  />
                  <br />
                  <div className="button-container">
                    <Button variant="contained" color="primary" type="submit">
                      {currentData ? "Editar" : "Adicionar"}
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={handleNextStep}
                    >
                      Voltar
                    </Button>
                  </div>
                </>
              )}
            </FormControl>
          </form>
        </FormProvider>
      </Modal>
      <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackMessage}
      />
    </>
  );
}

export default OperationForm;

OperationForm.propTypes = {
  modalOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  currentData: PropTypes.object || null,
  setData: PropTypes.func || null,
};

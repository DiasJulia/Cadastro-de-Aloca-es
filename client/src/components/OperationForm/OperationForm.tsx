import React, { useState } from "react";
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
import { FormProvider, set, useForm } from "react-hook-form";
import { FormHelperText } from "@mui/material";

function OperationForm(props: any) {
  const { modalOpen, closeModal } = props;

  const [step, setStep] = useState(1);

  const [tipo, setTipo] = useState<string | null>("");
  const [cnpj, setCnpj] = useState<string | null>("");
  const [razaoSocial, setRazaoSocial] = useState<string | null>("");
  const [quantidade, setQuantidade] = useState<Number | null>();
  const [valorUnitario, setValorUnitario] = useState<Number | null>();
  const [date, setDate] = useState<string | null>(
    new Date(Date.now()).toISOString().split("T")[0]
  );
  const [inputValue, setInputValue] = useState("" as string);

  const methods = useForm();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTipo(event.target.value);
  };
  const submitForm = () => {
    const data = {
      tipo: tipo,
      CNPJ: cnpj,
      razao_social: razaoSocial,
      data: new Date(date ? date : Date.now()),
      quantidade: quantidade,
      valor: valorUnitario,
    };
    console.log(data);
    axios
      .post("http://localhost:3001/api/operacao", data)
      .then((response) => {
        console.log(response);
        closeModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (tipo && cnpj && date) {
        setStep(2);
      }
    } else {
      if (step === 2) {
        setStep(1);
      }
    }
  };

  return (
    <Modal className="form-modal" open={modalOpen} onClose={closeModal}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(submitForm)}>
          <FormControl className="register-form">
            <FormLabel className="form-title">
              <h3>Adicionar Operação</h3>
            </FormLabel>
            <br />
            {step === 1 && (
              <>
                <TextField
                  required
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
                  error={cnpj === null ? true : false}
                  id="input-cnpj"
                  label="CNPJ"
                  variant="outlined"
                  value={cnpj}
                  onChange={(e) => setCnpj(e.target.value || null)}
                ></TextField>
                <br />
                <TextField
                  required
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
                  onChange={(e) => setDate(e.target.value || null)}
                ></TextField>
                <FormHelperText error={true}>
                  {date === null || new Date(date) > new Date(Date.now())
                    ? "Data inválida"
                    : ""}
                </FormHelperText>
                <br />
                <div className="button-container">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNextStep}
                  >
                    Próximo
                  </Button>
                  <Button variant="outlined" color="error" onClick={closeModal}>
                    Cancelar
                  </Button>
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <TextField
                  required
                  error={razaoSocial === null ? true : false}
                  id="input-razao-social"
                  label="Razão Social"
                  variant="outlined"
                  value={razaoSocial}
                  onChange={(e) => setRazaoSocial(e.target.value || null)}
                ></TextField>
                <br />
                <TextField
                  required
                  error={quantidade === null ? true : false}
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  id="input-quantidade"
                  label="Quantidade"
                  variant="outlined"
                  value={quantidade}
                  onChange={(e) =>
                    setQuantidade(parseInt(e.target.value) || null)
                  }
                ></TextField>
                <br />
                <CurrencyFormat
                  required
                  error={valorUnitario === null ? true : false}
                  customInput={TextField}
                  thousandSeparator="."
                  decimalSeparator=","
                  fixedDecimalScale={true}
                  prefix="R$"
                  decimalScale={2}
                  placeholder="R$ 0,00"
                  label="Valor Unitário"
                  value={`R$ ${inputValue}`}
                  onValueChange={(values) => {
                    const { formattedValue, value } = values;
                    setInputValue(formattedValue);
                    setValorUnitario(parseFloat(value));
                  }}
                />
                <br />
                <div className="button-container">
                  <Button variant="contained" color="primary" type="submit">
                    Adicionar
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
  );
}

export default OperationForm;

OperationForm.propTypes = {
  modalOpen: PropTypes.bool,
  closeModal: PropTypes.func,
};

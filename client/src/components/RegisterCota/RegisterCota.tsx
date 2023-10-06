"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import "./RegisterCota.css";
import axios from "axios";
import CurrencyFormat from "react-currency-format";

function RegisterCota() {
  const [modalOpen, setModalOpen] = useState(false);
  const [tipo, setTipo] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [razaoSocial, setRazaoSocial] = useState("");
  const [quantidade, setQuantidade] = useState<Number | null>();
  const [valorUnitario, setValorUnitario] = useState<Number | null>();
  const [date, setDate] = useState(new Date(Date.now()));
  const [inputValue, setInputValue] = useState("" as string);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTipo(event.target.value);
  };
  const submitForm = () => {
    const data = {
      tipo: tipo,
      CNPJ: cnpj,
      razao_social: razaoSocial,
      data: date,
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
  return (
    <div>
      <Button variant="contained" color="primary" onClick={openModal}>
        Adicionar Operação
      </Button>
      <Modal className="form-modal" open={modalOpen} onClose={closeModal}>
        <FormControl className="register-form">
          <FormLabel className="form-title">
            <h3>Adicionar Operação</h3>
          </FormLabel>
          <br />
          <TextField
            select
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
            id="input-cnpj"
            label="CNPJ"
            variant="outlined"
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
          ></TextField>
          <br />
          <TextField
            id="input-razao-social"
            label="Razão Social"
            variant="outlined"
            value={razaoSocial}
            onChange={(e) => setRazaoSocial(e.target.value)}
          ></TextField>
          <br />
          <TextField
            type="number"
            id="input-quantidade"
            label="Quantidade"
            variant="outlined"
            value={quantidade}
            onChange={(e) => setQuantidade(parseInt(e.target.value))}
          ></TextField>
          <br />
          <CurrencyFormat
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
          <TextField
            type="date"
            id="input-data"
            label="Data"
            variant="outlined"
            value={date.toISOString().split("T")[0]}
            onChange={(e) => setDate(new Date(e.target.value))}
          ></TextField>
          <br />
          <div className="button-container">
            <Button variant="contained" color="primary" onClick={submitForm}>
              Adicionar
            </Button>
            <Button variant="outlined" color="error" onClick={closeModal}>
              Cancelar
            </Button>
          </div>
        </FormControl>
      </Modal>
    </div>
  );
}

export default RegisterCota;

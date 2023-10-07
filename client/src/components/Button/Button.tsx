"use client";
import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import "./Button.css";

function ButtonComponent(props: any) {
  const { clickFunction } = props;

  return (
    <div>
      <Button variant="contained" color="primary" onClick={clickFunction}>
        Adicionar Operação
      </Button>
    </div>
  );
}

export default ButtonComponent;

ButtonComponent.propTypes = {
  clickFunction: PropTypes.func,
};

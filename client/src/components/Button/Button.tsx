"use client";
import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import "./Button.css";
import PostAddIcon from "@mui/icons-material/PostAdd";

function ButtonComponent(props: any) {
  const { clickFunction } = props;

  return (
    <div>
      <Button
        className="add-button"
        variant="contained"
        color="primary"
        onClick={clickFunction}
      >
        <PostAddIcon FontSize="large" />
      </Button>
    </div>
  );
}

export default ButtonComponent;

ButtonComponent.propTypes = {
  clickFunction: PropTypes.func,
};

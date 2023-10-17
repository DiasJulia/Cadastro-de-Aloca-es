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
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          borderRadius: 50,
          zIndex: 5,
        }}
        className="add-button"
        variant="contained"
        color="primary"
        onClick={clickFunction}
      >
        <PostAddIcon fontSize="large" />
      </Button>
    </div>
  );
}

export default ButtonComponent;

ButtonComponent.propTypes = {
  clickFunction: PropTypes.func,
};

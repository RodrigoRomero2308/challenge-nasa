"use client";

import React from "react";
import SuiGenerisText from "./SuiGenerisText";
import { Grow } from "@mui/material";

const LandingTitle = () => {
  return (
    <div
      style={{
        paddingTop: "30vh",
        paddingBottom: "15vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        fontSize: "2rem",
      }}
    >
      <Grow in timeout={1000}>
        <div>
          <SuiGenerisText>Mars Rovers</SuiGenerisText>
        </div>
      </Grow>
    </div>
  );
};

export default LandingTitle;

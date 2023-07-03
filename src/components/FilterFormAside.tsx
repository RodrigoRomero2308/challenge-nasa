"use client";

import { Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import RoverFilterForm from "./RoverFilterForm";
import { useParams } from "next/navigation";

const FormAside = () => {
  const params = useParams();
  const theme = useTheme();
  const lgActive = useMediaQuery(theme.breakpoints.up("lg"));

  if (!lgActive) return null;
  return (
    <section
      style={{
        width: 240,
        paddingRight: 24,
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 40,
        }}
      >
        <Typography variant="h5">Filtros</Typography>
        <RoverFilterForm initialRover={params.rover} />
      </div>
    </section>
  );
};

export default FormAside;

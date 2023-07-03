"use client";

import { Typography } from "@mui/material";
import React from "react";

const Title = ({ text }: { text: string }) => {
  return <Typography variant="h1">{text}</Typography>;
};

export default Title;

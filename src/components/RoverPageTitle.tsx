"use client";

import { rovers } from "@/constants/rovers";
import { Typography } from "@mui/material";
import { useParams } from "next/navigation";
import React from "react";

const RoverPageTitle = () => {
  const params = useParams();
  const roverInfo = rovers.find((item) => item.apiEndpoint === params.rover);

  if (!roverInfo) return null;

  return (
    <Typography
      variant="h4"
      style={{
        textAlign: "center",
        paddingTop: 16,
      }}
    >
      {roverInfo.name}
    </Typography>
  );
};

export default RoverPageTitle;

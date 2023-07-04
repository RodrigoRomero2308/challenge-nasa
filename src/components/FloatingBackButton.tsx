"use client";

import React, { MouseEventHandler } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { SpeedDial } from "@mui/material";
import { useRouter } from "next/navigation";

const FloatingBackButton = () => {
  const router = useRouter();
  const handleClick: MouseEventHandler = (ev) => {
    ev.stopPropagation();

    router.back();
  };
  return (
    <SpeedDial
      ariaLabel="Actions"
      sx={{
        position: "fixed",
        top: "0",
        left: "16px",
      }}
      icon={<ChevronLeftIcon />}
      onClick={handleClick}
    ></SpeedDial>
  );
};

export default FloatingBackButton;

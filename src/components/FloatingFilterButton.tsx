"use client";

import {
  Card,
  CardContent,
  Fade,
  Modal,
  SpeedDial,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useParams } from "next/navigation";
import RoverFilterForm from "./RoverFilterForm";

const FloatingFilterButton = () => {
  const { rover } = useParams();
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const theme = useTheme();
  const lgActive = useMediaQuery(theme.breakpoints.up("lg"));

  const handleModalClose = () => {
    setFilterModalOpen(false);
  };

  const handleOpenModal = () => {
    setFilterModalOpen(true);
  };

  if (lgActive) return null;

  return (
    <>
      <SpeedDial
        ariaLabel="Actions"
        sx={{
          position: "fixed",
          bottom: "16px",
          right: "16px",
        }}
        icon={<FilterAltIcon />}
        onClick={handleOpenModal}
      ></SpeedDial>
      <Modal open={filterModalOpen} onClose={handleModalClose} disableAutoFocus>
        <Fade in={filterModalOpen}>
          <div
            style={{
              position: "absolute",
              maxWidth: "80vw",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Card
              style={{
                maxWidth: "80vw",
                minWidth: "50vw",
                margin: "auto",
              }}
            >
              <CardContent>
                <RoverFilterForm
                  initialRover={rover}
                  onSubmit={handleModalClose}
                />
              </CardContent>
            </Card>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default FloatingFilterButton;

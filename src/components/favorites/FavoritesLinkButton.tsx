"use client";

import { Button, Link } from "@mui/material";
import React from "react";

const FavoritesLinkButton = () => {
  return (
    <Link
      style={{
        display: "flex",
        flexDirection: "column",
      }}
      href="/favorites"
    >
      <Button variant="contained">Favoritos</Button>
    </Link>
  );
};

export default FavoritesLinkButton;

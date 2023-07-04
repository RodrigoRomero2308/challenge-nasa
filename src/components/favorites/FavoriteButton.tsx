"use client";

import { RoverPhotoDTO } from "@/interfaces/roverPhotoDTO";
import { db } from "@/providers/database";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { IconButton } from "@mui/material";
import React, { MouseEventHandler, useEffect, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";

const FavoriteButton = ({ image }: { image: RoverPhotoDTO }) => {
  const isImageFavorite = useLiveQuery(async () => {
    const favorite = await db.favorites.get({
      id: image.id,
    });

    return !!favorite;
  }, [image]);

  useEffect(() => {
    db.favorites
      .get({
        id: image.id,
      })
      .then((res) => {
        if (!res) return;
      });
  }, []);

  const handleClick: MouseEventHandler = async (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    if (isImageFavorite) {
      await db.favorites
        .where({
          id: image.id,
        })
        .delete();
    } else {
      await db.favorites.add(image);
    }
  };
  return (
    <IconButton onClick={handleClick}>
      {isImageFavorite ? <Favorite /> : <FavoriteBorder />}
    </IconButton>
  );
};

export default FavoriteButton;

"use client";

import { RoverPhotoDTO } from "@/interfaces/roverPhotoDTO";
import { db } from "@/providers/database";
import { ImageList, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import RoverPhoto from "../RoverPhoto";
import useImageListConstants from "@/hooks/useImageListConstants";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import RoversButtons from "../RoversButtons";

const FavoritesList = () => {
  const [imageList, setImageList] = useState<RoverPhotoDTO[]>([]);
  const { listCols, getColAndRowSpanByIndex } = useImageListConstants();

  useEffect(() => {
    db.favorites.toArray().then(setImageList);
  }, []);

  return (
    <div>
      <Typography
        variant="h4"
        style={{
          textAlign: "center",
          paddingTop: 16,
        }}
      >
        Favoritos
      </Typography>
      <ImageList variant="quilted" cols={listCols} rowHeight={"auto"} gap={4}>
        {imageList.map((item, index) => {
          const spans = getColAndRowSpanByIndex(index);
          return (
            <RoverPhoto
              image={item}
              key={item.id}
              cols={spans.col}
              rows={spans.row}
            />
          );
        })}
      </ImageList>
      {!imageList.length && (
        <>
          <Typography
            variant="body1"
            style={{
              textAlign: "center",
            }}
          >
            Aun no tienes favoritos.
          </Typography>
          <Typography
            variant="body1"
            style={{
              textAlign: "center",
              marginBottom: 16,
            }}
          >
            Navega y marca favoritos haciendo click en el botón con el ícono{" "}
            <FavoriteBorder
              style={{
                height: "1rem",
              }}
            />
          </Typography>
          <RoversButtons />
        </>
      )}
    </div>
  );
};

export default FavoritesList;

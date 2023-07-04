"use client";

import { RoverPhotoDTO } from "@/interfaces/roverPhotoDTO";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Fade,
  ImageListItem,
  ImageListItemBar,
  Modal,
  Skeleton,
  Typography,
} from "@mui/material";
import React, { forwardRef, useState } from "react";
import FavoriteButton from "@/components/favorites/FavoriteButton";
import useImageListConstants from "@/hooks/useImageListConstants";

const RoverPhoto = (
  {
    image,
    rows = 1,
    cols = 1,
  }: { image: RoverPhotoDTO; rows?: number; cols?: number },
  ref:
    | ((instance: HTMLLIElement | null) => void)
    | React.RefObject<HTMLLIElement>
    | null
    | undefined
) => {
  const [imageReady, setImageReady] = useState(false);
  const { itemMinHeight } = useImageListConstants();
  const onImageLoad = () => {
    setImageReady(true);
  };
  const [imageModalOpen, setImageModalOpen] = useState(false);

  const handleCloseModal = () => {
    setImageModalOpen(false);
  };

  const handleOpenModal = () => {
    setImageModalOpen(true);
  };

  return (
    <>
      <ImageListItem
        key={image.id}
        ref={ref}
        rows={rows}
        cols={cols}
        onClick={handleOpenModal}
      >
        <Fade
          in={imageReady}
          style={{
            display: "block",
            width: "100%",
            height: "100%",
          }}
        >
          <img
            style={{
              display: "block",
              objectFit: "cover",
              objectPosition: "center",
              cursor: "pointer",
              minHeight: itemMinHeight,
            }}
            src={image.img_src}
            alt={image.id.toString()}
            loading="lazy"
            onLoad={onImageLoad}
            hidden
          ></img>
        </Fade>
        <ImageListItemBar
          position="top"
          actionPosition="right"
          sx={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 80%, rgba(0,0,0,1) 100%);",
          }}
          actionIcon={<FavoriteButton image={image} />}
        />
        {!imageReady && (
          <div
            style={{
              position: "absolute",
              display: "grid",
              placeItems: "center",
              top: 0,
              height: "100%",
              width: "100%",
            }}
          >
            <Skeleton
              variant="rectangular"
              sx={{
                width: "100%",
                height: "100%",
              }}
            />
          </div>
        )}
      </ImageListItem>
      <Modal open={imageModalOpen} onClose={handleCloseModal} disableAutoFocus>
        <Fade in={imageModalOpen}>
          <div
            style={{
              position: "absolute",
              maxWidth: "90vw",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Card
              style={{
                maxWidth: "90vw",
                maxHeight: "90vh",
                margin: "auto",
              }}
            >
              <CardHeader
                title={image.rover.name}
                subheader={`${image.camera.name} - ${image.camera.full_name}`}
                action={<FavoriteButton image={image} />}
              />
              <CardMedia
                component="img"
                style={{
                  maxWidth: "90vw",
                  minWidth: "80vw",
                  maxHeight: "50vh",
                  minHeight: "40vh",
                  objectFit: "contain",
                }}
                image={image.img_src}
                alt={image.id.toString()}
              />
              <CardContent>
                <Typography>Fecha terrestre: {image.earth_date}</Typography>
                <Typography>Fecha marciana: {image.sol}</Typography>
              </CardContent>
            </Card>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default forwardRef(RoverPhoto);

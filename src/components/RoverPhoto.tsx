"use client";

import { RoverPhotoDTO } from "@/interfaces/roverPhotoDTO";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Fade,
  ImageListItem,
  Modal,
  Skeleton,
  Typography,
} from "@mui/material";
import React, { forwardRef, useState } from "react";

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
            }}
            src={image.img_src}
            alt={image.id.toString()}
            loading="lazy"
            onLoad={onImageLoad}
            hidden
          ></img>
        </Fade>
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
                {/* <img
                  style={{
                    display: "block",
                    objectFit: "contain",
                    width: "100%",
                    height: "100%",
                    marginTop: 8,
                  }}
                  src={image.img_src}
                  alt={image.id.toString()}
                  loading="lazy"
                ></img> */}
              </CardContent>
            </Card>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default forwardRef(RoverPhoto);

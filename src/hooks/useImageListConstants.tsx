"use client";

import { useMediaQuery, useTheme } from "@mui/material";

const useImageListConstants = () => {
  const theme = useTheme();
  const smActive = useMediaQuery(theme.breakpoints.up("sm"));
  const mdActive = useMediaQuery(theme.breakpoints.up("md"));
  const lgActive = useMediaQuery(theme.breakpoints.up("lg"));

  let listCols = 3;
  let itemMinHeight = 100;

  let getColAndRowSpanByIndex = (
    index: number
  ): {
    row: number;
    col: number;
  } => {
    const value = (index + 1) % 25;

    switch (value) {
      case 4:
      case 18:
        return {
          row: 2,
          col: 1,
        };
      case 13:
        return {
          row: 2,
          col: 2,
        };
      default:
        return {
          row: 1,
          col: 1,
        };
    }
  };

  switch (true) {
    case smActive:
      listCols = 4;
      itemMinHeight = 150;
      getColAndRowSpanByIndex = (index) => {
        const value = (index + 1) % 25;

        switch (value) {
          case 5:
          case 17:
            return {
              row: 2,
              col: 2,
            };
          case 13:
            return {
              row: 2,
              col: 1,
            };
          default:
            return {
              row: 1,
              col: 1,
            };
        }
      };
    case mdActive:
      itemMinHeight = 200;
    case lgActive:
      itemMinHeight = 250;
    default:
      break;
  }
  return {
    listCols,
    getColAndRowSpanByIndex,
    itemMinHeight,
  };
};

export default useImageListConstants;

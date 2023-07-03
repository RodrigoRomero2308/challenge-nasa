"use client";

import { Grow, GrowProps } from "@mui/material";
import React, { ReactElement } from "react";

const GrowTransition = ({
  children,
  ...growProps
}: GrowProps & { children: ReactElement }) => {
  return <Grow {...growProps}>{children}</Grow>;
};

export default GrowTransition;

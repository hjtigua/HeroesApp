import React, { Fragment } from "react";
import { HeroesList } from "../heroes/HeroesList";

export const DcScreen = () => {
  return (
    <Fragment>
      <HeroesList publisher="DC Comics" />
    </Fragment>
  );
};

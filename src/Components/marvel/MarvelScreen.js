import React, { Fragment, useState, useEffect } from "react";
import { HeroesList } from "../heroes/HeroesList";

export const MarvelScreen = () => {
  // const [tables, settables] = useState([]);    
  // useEffect(() => {           
    
  //   fetch("http://127.0.0.1:8000/api/mesas").then(resp => resp.json()).then(data => {
  //     settables(data);
  //   })
  // }, [])

  // console.log(tables);

  return (
    <Fragment>
      <HeroesList publisher="Marvel Comics" />
    </Fragment>
  );
};

import React from "react";
import { useParams } from "react-router";

const EditarServicio = () => {
  const {uid} = useParams();

  return (
            <div> EditarServicio 
            <h1>EditarServicio</h1>
            <p>Servicio id : {uid}</p>

            </div>);
};

export default EditarServicio;

import React from "react";
import {useParams} from "react-router-dom";

const EditarServicio = () => {
  const {id} = useParams();
  return (
            <div> EditarServicio 
            <h1>EditarServicio</h1>
            <p>Servicio id : {id}</p> 
            </div>);
};

export default EditarServicio; 
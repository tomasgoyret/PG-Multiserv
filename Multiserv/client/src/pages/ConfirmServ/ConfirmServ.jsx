import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Parrafo from "../../Components/Atoms/Parrafo/Parrafo";

const ConfirmServicio = () => {
  const text = "Redireccionando al Home en ... ";
  const [value, setValue] = useState(5);
  const [searchParams, setSearchParams] = useSearchParams();

  const params = {
    estadoDePago: searchParams.get("status"),
    idServ: searchParams.get("external_reference"),
  };

  const actualizarPago = async () => {
    await axios.put(`edit-service/${params.idServ}`, {
      estadoDePago: params.estadoDePago,
    });
  };
  useEffect(() => {
    document.title = "¡Tu pago se realizó exitosamente!"
    actualizarPago();
  }, []);

  value === 1 ? window.location.href = '/home' : setTimeout(function(){ setValue(value-1) }, 1000);
  
  return (
    <div className={params.estadoDePago === "Aprobado" ?'absolute bg-green-500 rounded-full  m-auto inset-1/3' : params.estadoDePago === "Rechazado"? 'absolute bg-red-500 rounded-full  m-auto inset-1/3' :'absolute bg-yellow-200 rounded-full  m-auto inset-1/3'}>
      <div className="items-center text-center ">
        <div>
          <h1 className="font-sans text-black text-2xl my-8">
            {params.estadoDePago === "Aprobado" &&
              `Estado de pago ${params.estadoDePago}`}
          </h1>
        </div>
        <div>
          <h1 className=" font-sans text-black text-2xl my-8">
            {
              params.estadoDePago === "Rechazado" && 
              `Estado de pago ${params.estadoDePago}`
            }
          </h1>
        </div>
        <div>
          <h1 className=" font-sans text-black text-2xl my-8">
            {params.estadoDePago === "Pendiente" &&
              `Estado de pago ${params.estadoDePago}`}
          </h1>
        </div>
        <div>
          <Parrafo
            classDivParrafo="text-xl my-8"
            classParrafo=" font-sans text-black focus:underline italic"
            parrafo={text}
          />
        </div>
        <div className="relative items-center text-center text-gray-300 text-4xl">
          <p className="font-sans bg-opacity-25 ">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmServicio;
main

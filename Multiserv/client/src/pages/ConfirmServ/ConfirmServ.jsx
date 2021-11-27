import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Parrafo from "../../Components/Atoms/Parrafo/Parrafo";
import { FcApproval } from "react-icons/fc";
import { useNavigate } from "react-router";


const ConfirmServicio = () => {
  const text = "Redireccionando al Home en ... ";
  const [value, setValue] = useState(5);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const params = {
    estadoDePago: searchParams.get("status"),
    idServ: searchParams.get("external_reference"),
  };

  let datosSesionFromLocalStorage = JSON.parse(localStorage.getItem("datoSesion"))
  let uid = datosSesionFromLocalStorage.uid
  let email = datosSesionFromLocalStorage.email
  let displayName= datosSesionFromLocalStorage.displayName

  const actualizarPago = async () => {
    await axios.post('mail',{
      email:email, 
      displayName:displayName,
      estadoDePago:params.estadoDePago
    })
    await axios.put(`edit-service/${params.idServ}`, {
      estadoDePago: params.estadoDePago,
    });
  };
  useEffect(() => {
    document.title = "¡Tu pago se realizó exitosamente!"
    actualizarPago();
  }, []);

  value === 1 ? window.location.href = `/home/servicios/${params.idServ}/editar` : setTimeout(function(){ setValue(value-1) }, 1000);
  
  return (
    <div className="flex w-full h-screen justify-center items-center">
      {
        params.estadoDePago === "approved" &&
        <div className="w-1/2 h-4/5 shadow-lg border border-gray-100">
          <div className="w-full h-1/5 bg-green-500"></div>
          <div className="w-full h-3/5 flex flex-col items-center">
            <h1 className="text-5xl font-bold my-6 mt-10">¡Pago Exitoso!</h1>
            <span className="text-lg font-semibold mb-5">El pago se realizó de manera exitosa.</span>
            <span>Serás redireccionado en: </span>
            <span className="text-3xl my-5 font-bold">{value}</span>
          </div>
          <div className="w-full h-1/5 flex justify-center items-center">
            <div className="w-2/5">
              <button
                className="mx-2 flex w-full flex-nowrap p-2 py-2 px-4 justify-center items-center rounded-md font-semibold bg-green-700 hover:bg-green-800 text-gray-50"
                onClick={() =>
                  navigate(`/home/servicios/${params.idServ}/editar`)
                }
              >
                Regresar
              </button>
            </div>
          </div>
        </div>
      }
     
      {
        params.estadoDePago === "rejected" &&
        <div className="w-1/2 h-4/5 shadow-lg border border-gray-100">
          <div className="w-full h-1/5 bg-red-500"></div>
          <div className="w-full h-3/5 flex flex-col items-center">
            <h1 className="text-5xl font-bold my-6 mt-10">¡Pago Rechazado!</h1>
            <span className="text-lg font-semibold mb-5">No se pudo procesar el pago.</span>
            <span>Seras redireccionado en: </span>
            <span className="text-3xl my-5 font-bold">{value}</span>
          </div>
          <div className="w-full h-1/5 flex justify-center items-center">
            <div className="w-2/5">
              <button
                className="mx-2 flex w-full flex-nowrap p-2 py-2 px-4 justify-center items-center rounded-md font-semibold bg-red-700 hover:bg-red-800 text-gray-50"
                onClick={() =>
                  navigate("/home")
                }
              >
                Regresar
              </button>
            </div>
          </div>
        </div>
      }
    </div>
    // <div className={params.estadoDePago === "Aprobado" ?'absolute bg-green-500 rounded-full  m-auto inset-1/3' : params.estadoDePago === "Rechazado"? 'absolute bg-red-500 rounded-full  m-auto inset-1/3' :'absolute bg-yellow-200 rounded-full  m-auto inset-1/3'}>
    //   <div className="items-center text-center ">
    //     <div>
    //       <h1 className="font-sans text-black text-2xl my-8">
    //         {params.estadoDePago === "Aprobado" &&
    //           `Estado de pago ${params.estadoDePago}`}
    //       </h1>
    //       Hola
    //     </div>
    //     <div>
    //       <h1 className=" font-sans text-black text-2xl my-8">
    //         {
    //           params.estadoDePago === "Rechazado" && 
    //           `Estado de pago ${params.estadoDePago}`
    //         }
    //       </h1>
    //     </div>
    //     <div>
    //       <h1 className=" font-sans text-black text-2xl my-8">
    //         {params.estadoDePago === "Pendiente" &&
    //           `Estado de pago ${params.estadoDePago}`}
    //       </h1>
    //     </div>
    //     <div>
    //       <Parrafo
    //         classDivParrafo="text-xl my-8"
    //         classParrafo=" font-sans text-black focus:underline italic"
    //         parrafo={text}
    //       />
    //     </div>
    //     <div className="relative items-center text-center text-gray-300 text-4xl">
    //       <p className="font-sans bg-opacity-25 ">{value}</p>
    //     </div>
    //   </div>
    // </div>
  );
};

export default ConfirmServicio;

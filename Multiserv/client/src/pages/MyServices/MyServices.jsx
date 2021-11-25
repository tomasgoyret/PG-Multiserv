import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { getServicios, deleteMyServices } from "../../redux/actions/actions";

const MyServices = () => {
  const navigate = useNavigate();
  const { uidClient } = useParams();
  const { misServicios } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => dispatch(getServicios(uidClient)), []);

  const eliminarServ = (e) => {
    dispatch(deleteMyServices(e.target.name, uidClient));
  }
  const irAlLink = (e) => {
    console.log(e.target.value)
    e.target.value === 'detalle' ? navigate(`/home/detalleServicio/${e.target.name}`) : navigate(`/home/servicios/${e.target.name}/editar`)
  }

  return (
    <div className="w-full h-screen block p-4 ">
      <div>
        <h1 className="text-4xl font-bold pb-4 border-b-2 border-gray-200"> Mis Servicios</h1>
      </div>{misServicios.length === 0 ?
      <div>
        <h3>No hay Servicios</h3>
      </div> : <div className="mt-2 grid grid-cols-3 gap-4">
        {misServicios.map((servicio) => {
          return (<div className='w-full shadow my-1 p-3 rounded-lg flex' key={servicio.id+'key'}>
          <div>
            <img className='w-36 rounded' src={servicio.photos[0]} alt={servicio.title} />
          </div>
          <div className='ml-4 flex flex-col'>

            <span className='text-xl font-semibold' >{servicio.title}</span>    

            <h6 className='text-xxl font-italic ' >{servicio.estadoDePago}</h6>

            <button className='hover:bg-red-300 hover:text-red-500 hover:shadow-md  bg-red-500 rounded my-1 text-white font-bold' name={servicio.id} onClick={eliminarServ}> Eliminar </button>

            <button onClick={irAlLink} name={servicio.id} className='hover:bg-yellow-100 hover:text-yellow-400 hover:shadow-md  bg-yellow-300 rounded my-1 text-white font-bold' value='editar'> Editar </button>

            <button onClick={irAlLink} name={servicio.id} value='detalle' className='hover:bg-cyan-100 hover:text-cyan-600 hover:shadow-md bg-cyan-600 rounded my-1 text-white font-bold' > Ver </button>

          </div>
        </div>
          );
        })}
      </div>}
    </div>
  );
};

export default MyServices;

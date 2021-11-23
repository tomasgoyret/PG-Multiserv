import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { getServicios, deleteMyServices } from "../../redux/actions/actions";

const MyServices = () => {
  const navigate = useNavigate();
  var uid ='xikCYZABF5XrgDvpRWwH9vdAhNy2'
  const { misServicios } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => dispatch(getServicios(uid)), []);

  const eliminarServ = (e) => {
    dispatch(deleteMyServices(e.target.name));
  }
  const irAlLink = (e) => {
    navigate(`/detalleServicio/${e.target.name}`)
  }

  return (
    <div>
      <div>
        <h1> Mis Servicios</h1>
      </div>{misServicios.length === 0 ?
      <div>
        <h3>No hay Servicios</h3>
      </div> : <div>
        {misServicios.map((servicio) => {
          return (<div className='w-full shadow my-1 p-3 rounded-lg flex' key={servicio.id+'key'}>
          <div>
            <img className='w-36 rounded' src={servicio.photos[0]} alt={servicio.title} />
          </div>
          <div className='ml-4 flex flex-col'>
            <span className='text-xl font-semibold' >{servicio.title}</span>
            <button className='bg-red-500 rounded my-1 text-white font-bold' name={servicio.id} onClick={eliminarServ}>Eliminar</button>
            <button onClick={irAlLink} name={servicio.id} className='bg-cyan-600 rounded my-1 text-white font-bold' >Ver</button>
          </div>
        </div>
          );
        })}
      </div>}
    </div>
  );
};

export default MyServices;

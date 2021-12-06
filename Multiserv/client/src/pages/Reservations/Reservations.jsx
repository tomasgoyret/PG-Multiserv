import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getReservas, getServicios } from "../../redux/actions/actions";
import { Calendar } from "react-multi-date-picker";
import "react-multi-date-picker/styles/colors/green.css";
import transition from "react-element-popper/animations/transition";
import Button from "react-multi-date-picker/components/button";
import axios from "axios";

const Reservations = () => {
  const { uidClient } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [misReservas, setMisReservas] = useState([]);
  const [diasService, setDiasService] = useState([]);
  const { reservas } = useSelector((state) => state);
  const today = new Date();
  const [modalServicios, setModalServicios] = useState(false);

  useEffect(async () => {
    dispatch(getReservas(uidClient));
  }, []);

  /* 
  ciudad: ""
  dia: "2021/11/27"
  direccion: "Calle falsa 123"
  hora: {hora: '07:30 - 08:00', reservado: true}
  id: 2
  nameUser: "undefined "
  servicioId: 2
  title: "peluqueria Rosal"
  usuarioUidClient: "CuKKIedNCegIauEKX78sIYjKbC32"
 */

  const handleSelect = (a) => {
    setModalServicios(true)
    a.sort((prev, post) => {
      if (prev.dia !== post.dia) {
        if (prev.dia < post.dia) return -1;
        else if (prev.dia > post.dia) return 1;
        else return 0;
      }
      if (prev.dia === post.dia) {
        if (prev.hora.hora < post.hora.hora) return -1;
        else if (prev.hora.hora > post.hora.hora) return 1;
        else return 0;
      }
    });

    setMisReservas(
      a.map((e, i) => {
        return (
          <div
            className="bg-cyan-300 h-auto border-2 border-cyan-500 px-3 py-3 flex flex-col mb-3"
            key={"titleServiceDivs" + i + e.id}
          >
            <span className="font-semibold text-lg">Cita con: {e.nameUser}</span>
            <span className="text-md text-gray-800">El dia: {e.dia}</span>
            <span className="text-md text-gray-800">A las: {e.hora.hora}</span>
            <span className="text-md text-gray-800">En: {e.direccion + " " + e.ciudad}</span>
            <br />
          </div>
        );
      })
    );
    setDiasService(a.map((e) => e.dia));    
  };

  return (
    <div className="w-full h-screen overflow-y-scroll">
      <div className="py-5 w-full flex justify-center">
        <h1 className="source-sans text-center text-3xl font-semibold text-cyan-800">Reservas de mis Servicios</h1>
      </div>

      <div className={modalServicios ? "w-full flex py-5 h-3/6" : "w-full h-3/6 flex justify-center py-5"}>
        <div className={modalServicios ? "w-1/2 flex justify-center items-center" : "w-full flex justify-center items-center"}>
          <Calendar
            minDate={today.setDate()}
            maxDate={new Date().setDate(60)}
            readOnly
            value={diasService}
            className="green"
          />
        </div>
        {
        modalServicios &&
        <div className="w-1/2 flex justify-center items-center">
          <div className="w-4/6 h-5/6 flex flex-col overflow-y-scroll">
            {misReservas.length > 0 ?
              misReservas.map((a) => {
                return a;
              })
              :
              <div className="w-full h-full">
                <div className="w-full flex justify-center">
                  <h1 className="source-sans text-2xl font-semibold text-cyan-800">Sin reservas actualmente!</h1>
                </div>
              </div>
            }
          </div>
          <div className="h-5/6">
            <button
                className="flex justify-center items-center mx-2 font-semibold  w-auto text-lg px-6 py-1 bg-green-600 text-gray-50 hover:bg-green-700 focus:bg-green-700 rounded-md transition-all ease-in-out duration-300 "
                onClick={() => setModalServicios(false)}
              >
                X
            </button>
          </div>
        </div>
        }
      </div>

      <div className="py-5 w-full flex justify-center">
        <h1 className="source-sans text-center text-3xl font-semibold text-cyan-800">Reservas</h1>
      </div>
      <div className="w-full flex flex-wrap px-3 justify-start">
      {
      reservas.length > 0 ?
        reservas.map((e, i) => {
          if (e.length > 0) {
            return (
              <div key={"titleService" + i} className="w-64 h-32 py-3 mx-5 px-5 shadow-lg flex rounded-lg transition-all ease-in-out duration-300 transform hover:translate-x-1 hover:translate-y-1 hover:scale-105 hover:drop-shadow-xl hover:bg-gray-100 cursor-pointer">
                
                <div className="flex flex-col  w-full justify-center items-center">
                  <div className="mb-2 flex flex-col items-center justify-center">
                    <h2 className="text-md font-semibold text-gray-500">Servicio</h2>
                    <h2 className="text-2xl font-semibold text-gray-900">{e[0]?.title}</h2>
                  </div>
                  <button
                    className="flex justify-center items-center mx-2 font-semibold  w-auto text-lg px-6 py-1 bg-green-500 text-gray-50 hover:bg-green-700 focus:bg-green-700 rounded-md transition-all ease-in-out duration-300 "
                    id={e[0]?.id}
                    onClick={() => {
                      handleSelect(e);
                    }}
                  >
                    ver
                  </button>
                  </div>
              </div>
            );
          }
        })
        :
        <div className="w-64 h-32 py-3 mx-5 px-5 shadow-lg flex rounded-lg transition-all ease-in-out duration-300 transform hover:translate-x-1 hover:translate-y-1 hover:scale-105 hover:drop-shadow-xl hover:bg-gray-100 cursor-pointer">
                
                <div className="flex flex-col  w-full justify-center items-center">
                  <div className="mb-2 flex flex-col items-center justify-center">
                    <h2 className="text-md font-semibold text-gray-500">Servicio</h2>
                    <h2 className="text-2xl font-semibold text-gray-900">No disponible</h2>
                  </div>
                  <button
                    className="flex justify-center items-center mx-2 font-semibold  w-auto text-lg px-6 py-1 bg-green-500 text-gray-50 hover:bg-green-700 focus:bg-green-700 rounded-md transition-all ease-in-out duration-300 "
                    onClick={() => setModalServicios(true)}
                  >
                    Info
                  </button>
                  </div>
              </div>
      }
      </div>

      

{/* <div className="grid grid-flow-col auto-cols-max auto-rows-max mx-9 bg-cyan-200">
          {misReservas.length > 0 &&
            misReservas.map((a) => {
              return a;
            })}
        </div> */}

    </div>
  );
};

export default Reservations;

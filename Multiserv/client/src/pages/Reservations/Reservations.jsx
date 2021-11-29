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
            className="bg-cyan-600 placeholder-black"
            key={"titleServiceDivs" + i + e.id}
          >
            <h3>Cita con: {e.nameUser}</h3>
            <h3>El dia: {e.dia}</h3>
            <h3>A las: {e.hora.hora}</h3>
            <h3>En: {e.direccion + " " + e.ciudad}</h3>
            <br />
          </div>
        );
      })
    );
    setDiasService(a.map((e) => e.dia));    
  };

  return (
    <div>
      <h1>Reservas de mis Servicios</h1>

      {reservas.length > 0 &&
        reservas.map((e, i) => {
          if (e.length > 0) {
            return (
              <div key={"titleService" + i}>
                <h2>{e[0]?.title}</h2>
                <button
                  id={e[0]?.id}
                  onClick={() => {
                    handleSelect(e);
                  }}
                >
                  ver
                </button>
              </div>
            );
          }
        })}

      <br />
      <div>
        <Calendar
        minDate={today.setDate()}
          maxDate={new Date().setDate(60)}
          readOnly
          value={diasService}
          className="green"
        />
      </div>

      <br />

      <div className="grid grid-flow-col auto-cols-max auto-rows-max mx-9 bg-cyan-200">
        {misReservas.length > 0 &&
          misReservas.map((a) => {
            return a;
          })}
      </div>

    </div>
  );
};

export default Reservations;

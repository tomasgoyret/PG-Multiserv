import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getMisCitas, cancelarCita } from "../../redux/actions/actions";

const MisCitas = () => {
  const { uidClient } = useParams();
  const dispatch = useDispatch();
  const { misCitas } = useSelector((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getMisCitas(uidClient));
  }, []);
  misCitas.sort((prev, post) => {
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
  /*
ciudad: "sad"
dia: "2021/11/27"
direccion: "sdasdasd"
hora: {hora: '12:30 - 13:00', reservado: true}
id: 1
nameUser: "abril gil "
servicioId: 1
usuarioUidClient: "3FP9DkuqIgSkw78sedTF7tz0gCe2"
*/

  const handleClick = (e) => {
    e.preventDefault();
    e.target.name === "ver"
      ? navigate(`/home/detalleServicio/${e.target.value}`)
      : cancelar(e.target.value);
  };

  const cancelar = (e) => {
    dispatch(cancelarCita(e, uidClient));
  };

  return (
    <div>
      <h1>Mis Citas</h1>

      {/* Citas mapeadas por Servicio */}

      {misCitas.length > 0 &&
        misCitas.map((cita, i) => {
          return (
            <div key={"key-" + "-" + i}>
              <h3>Citas para el servicio: {cita.title}</h3>

              <h6>Fecha: {cita.dia}</h6>

              <h6>Hora: {cita.hora.hora}</h6>

              <h6>Direccion: {cita.direccion}</h6>

              <button
                value={cita.id}
                name="cancelar"
                onClick={handleClick}
                className="bg-red-900"
              >
                Cancelar
              </button>

              <button
                name="ver"
                value={cita.servicioId}
                onClick={handleClick}
                className="bg-cyan-900"
              >
                Ver
              </button>
            </div>
          );
        })}

      {/* No hay citas */}

      {misCitas.length === 0 && <h3>No tienes citas</h3>}
    </div>
  );
};
export default MisCitas;

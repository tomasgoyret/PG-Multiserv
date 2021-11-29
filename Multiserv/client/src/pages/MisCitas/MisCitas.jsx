<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getMisCitas, cancelarCita,statusCita } from "../../redux/actions/actions";
import axios from "axios";

const MisCitas = () => {
  const { uidClient } = useParams();
  const dispatch = useDispatch();
  const { misCitas } = useSelector((state) => state);
  const navigate = useNavigate();
  const [citasVencidas, setCitasVencidas] = useState([]);
  const today = new Date();

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

  useEffect(() => {
    setCitasVencidas(
      misCitas?.filter((e, i) => {
        let hora = today.getHours() + ":" + today.getMinutes();
        let dia =
          today.getFullYear() +
          "/" +
          (today.getMonth() + 1) +
          "/" +
          today.getDate();
        if (e.dia < dia || (e.dia === dia && e.hora.hora.slice(0, 5) < hora)) {
          return e;
        }
      })
    );
  }, [misCitas]);

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

  const handleClick = async (e) => {
    e.preventDefault();
    if (e.target.name === "ver")
      return navigate(`/home/detalleServicio/${e.target.value}`);
    if (e.target.name === "cancelar") return cancelar(e.target.value);
    if (e.target.name === "concretada") {
      dispatch(statusCita(e.target.value, uidClient));
       alert('ULISES --ej: Desea dejar reseña?');
      
      {
        /* ------------ MODAL --------------- 
      alert('Desea dejar una reseña?')      
      return navigate(`/home/detalleServicio/${e.servicioId}`)
       ------------ MODAL --------------- */
      }
    }
  };

  const cancelar = (e) => {
    dispatch(cancelarCita(e, uidClient));
  };

  return (
    <div>
      <h1>Mis Citas</h1>

      {/* Citas mapeadas por Servicio */}
      <h2> Proximas :</h2>

      {misCitas.length > 0 &&
        misCitas.map((cita, i) => {
          return (
            <div key={"key-proximas" + "-" + i}>
              <br />
              <h3>Citas para el servicio: {cita.title}</h3>

              <h6>Fecha: {cita.dia}</h6>

              <h6>Hora: {cita.hora.hora}</h6>

              <h6>Direccion: {cita.direccion}</h6>

              <button
                name="cancelar"
                value={cita.id}
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

      {misCitas.length === 0 && <h3>No hay citas proximas</h3>}

      <div>
        <h2> Caducadas :</h2>
        {citasVencidas.length > 0 ? (
          citasVencidas.map((cita, i) => {
            let values = [cita.id,cita.usuarioUidClient]
            return (
              <div key={"key-caducadas" + "-" + i}>
                <br />
                <h3>Citas para el servicio: {cita.title}</h3>

                <h6>Fecha: {cita.dia}</h6>

                <h6>Hora: {cita.hora.hora}</h6>

                <h6>Direccion: {cita.direccion}</h6>

                <h6>
                  Estado:{" "}
                  {cita.status === "Pendiente" ? "Cita caducada" : cita.status}
                </h6>

                {cita.status !== "Concretada" ? (
                  <button
                    name="concretada"
                    value={cita.id}
                    onClick={handleClick}
                    className="bg-red-900"
                  >
                    Concretada
                  </button>
                ) : ''}
              </div>
            );
          })
        ) : (
          <h3>No hay citas caducadas</h3>
        )}
      </div>
    </div>
  );
};
=======
import React, {useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getListCitas } from "../../redux/actions/actions";

const MisCitas = () => {
  const { uidClient } = useParams();
  const dispatch = useDispatch()
  const citas = useSelector((state) => state.misCitas);
  useEffect(() => {
    dispatch(getListCitas(uidClient));
  }, []);

// Aca consologeo las props de cita
console.log(citas[0] || citas)

  return (
    <div>
      <div>
        <h1>Mis Citas</h1>
      </div>
      {citas.length > 0
        ? citas.map((cita) => {
            <div>
            <span>{cita.nameUser}</span>
              <span>{cita.horario}</span>
              <span>{cita.dia}</span>
            </div>;
          })
        : ""}
    </div>
  );
};

>>>>>>> main
export default MisCitas;

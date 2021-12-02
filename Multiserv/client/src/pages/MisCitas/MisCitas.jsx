import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  getMisCitas,
  cancelarCita,
  statusCita,
} from "../../redux/actions/actions";
import Swal from "sweetalert2";

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
    let a = misCitas?.filter((e, i) => {
      let hora = today.getHours() + ":" + today.getMinutes();
      let dia =
        today.getFullYear() +
        "/" +
        (today.getMonth() + 1) +
        "/" +
        today.toString().slice(8, 10);
      if (e.dia < dia || (e.dia === dia && e.hora.hora.slice(0, 5) < hora)) {
        return e;
      }
    });
    setCitasVencidas(a);
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
      Swal.fire(
        'Si deseas dejar una reseña del servicio, presiona el botón de "Dejar una reseña"',
        "",
        "success"
      );
    }
    if (e.target.name === "review") {
      return navigate(`/home/detalleServicio/${e.target.value}`);
    }
  };

  const cancelar = (e) => {
    dispatch(cancelarCita(e, uidClient));
  };

  return (
    <div className="mx-4 my-4 w-full">
      <h1 className="text-4xl font-bold pb-2 border-b w-full mb-2">
        Mis Citas
      </h1>
      <h2 className="text-xl pl-2 font-semibold"> Proximas :</h2>
      {/* Citas mapeadas por Servicio */}
      <div className="justify-center items-center flex flex-row flex-wrap h-full overflow-y-auto"
          >
        {misCitas.length > 0 &&
          misCitas.map((cita, i) => {
            let hoy =
              today.getFullYear() +
              "/" +
              (today.getMonth() + 1) +
              "/" +
              today.toString().slice(8, 10);

            if (cita.dia > hoy) {
              return (
                <div
                  key={"key-proximas" + "-" + i}
                  className="shadow-lg rounded-xl p-4 hover:shadow-xl hover:scale-50"
                >
                  <h3 className="text-xl text-center py-2 font-semibold">{`${cita.title[0].toUpperCase()}${cita.title.slice(
                    1
                  )}`}</h3>
                  <h6 className="text-center">{cita.dia}</h6>
                  <h6 className="text-center">{cita.hora.hora}</h6>
                  <h6 className="text-center mb-2">{cita.direccion}</h6>
                  <div className="flex justify-evenly">
                    <button
                      name="cancelar"
                      value={cita.id}
                      onClick={handleClick}
                      className="px-4 bg-rose-700 rounded-lg py-0.5 font-semibold text-white hover:bg-rose-900"
                    >
                      Cancelar
                    </button>

                    <button
                      name="ver"
                      value={cita.servicioId}
                      onClick={handleClick}
                      className="px-4 bg-cyan-700 rounded-lg py-0.5 font-semibold text-white hover:bg-cyan-900"
                    >
                      Ver
                    </button>
                  </div>
                </div>
              );
            }
          })}
      </div>
      {/* No hay citas */}

      {misCitas.length === 0 && (
        <div className="w-full bg-gray-50 py-16 rounded-lg shadow-md">
          <h3 className="text-center font-semibold">No hay citas proximas</h3>
        </div>
      )}
      <br />
      <h2 className="text-xl pl-2 font-semibold"> Caducadas :</h2>
      <div className="justify-center items-center flex flex-row flex-wrap h-full overflow-y-auto"
          >
      {citasVencidas.length > 0 ? (
        citasVencidas.map((cita, i) => {
          let values = [cita.id, cita.usuarioUidClient];
          return (
              <div
                key={"key-caducadas" + "-" + i}
                className="shadow-lg rounded-xl p-4 hover:shadow-xl hover:scale-50"
              >
                <h3 className="text-xl text-center py-2 font-semibold">
                  {cita.title}
                </h3>
                <h6 className="text-center">{cita.dia}</h6>
                <h6 className="text-center">{cita.hora.hora}</h6>
                <h6 className="text-center mb-2">{cita.direccion}</h6>
                <h6>
                  Estado:{" "}
                  {cita.status === "Pendiente" ? "Cita caducada" : cita.status}
                </h6>
                <div className="flex justify-evenly">
                {cita.status !== "Concretada" ? (
                  <button 
                    name="concretada"
                    value={cita.id}
                    onClick={handleClick}
                    className="px-4 bg-rose-700 rounded-lg py-0.5 font-semibold text-white hover:bg-rose-900"
                  >
                    Concretada
                  </button>
                ) : (
                  ""
                )}
                {cita.status === "Concretada" ? (
                  <button
                    name="review"
                    value={cita.servicioId}
                    onClick={handleClick}
                    className="px-4 bg-cyan-700 rounded-lg py-0.5 font-semibold text-white hover:bg-cyan-900"
                  >
                    Dejar una reseña
                  </button>
                ) : (
                  ""
                )}
                </div>
              </div>
          
          );
        })
      ) : (
        <div className="w-full bg-gray-50 py-16 rounded-lg shadow-md my-2">
          <h3 className="text-center font-semibold">No hay citas caducadas</h3>
        </div>
      )}</div>
    </div>
  );
};

export default MisCitas;

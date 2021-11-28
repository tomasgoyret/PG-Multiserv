import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getHorarios, servicesId } from "../../redux/actions/actions";
import { useParams } from "react-router-dom";
import DatePicker from "react-multi-date-picker";
import "react-multi-date-picker/styles/colors/green.css";
import { storage } from "../../Firebase";
import axios from "axios";

const AgendarCita = () => {
  const navigate = useNavigate();
  const datosSesionFromLocalStorage = JSON.parse(
    localStorage.getItem("datoSesion")
  );
  const { uid } = datosSesionFromLocalStorage;
  let today = new Date();
  const dispatch = useDispatch();
  const { idService } = useParams();
  const { verHorarios, detalleServicio } = useSelector((state) => state);
  const [value, setValue] = useState(new Date());
  const [prop, setProp] = useState([]);
  const [fecha, setFecha] = useState([]);
  const [diasDelServicio, setDiasDelServicio] = useState([]);
  const [diasOcupados, setDiasOcupados] = useState([]);
  const [dia, setDia] = useState("");
  const [direccion, setDireccion] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [hora, setHora] = useState({
    hora: "",
    reservado: false,
  });
  const [errors, setErrors] = useState({
    dia: "",
    hora: "",
    direccion: "",
    ciudad: "",
  });
  let array = verHorarios[0]?.fechas;

  const filtroDiasDelServicio = () => {
    let dias = [];
    for (let i = 0; i < array?.length; i++) {
      dias.push(Object.keys(array[i])[0]);
    }
    setDiasDelServicio(dias);
  };

  const filtroDiasOcupados = () => {
    let dias = [];
    for (let i = 0; i < array?.length; i++) {
      let key = Object.keys(array[i])[0];
      if (array[i][key].every((item) => item.reservado === true)) {
        dias.push(Object.keys(array[i])[0]);
      }
    }
    setDiasOcupados(dias);
  };

  useEffect(() => {
    dispatch(getHorarios(idService));
    dispatch(servicesId(idService));
  }, []);

  const handleChange = (value) => {
    setDia(value?.format());
    setFecha(value?.format());
    setValue(value);
    setErrors({ ...errors, dia: "" });
  };

  const handleClickFecha = (e) => {
    filtroDiasDelServicio();
    filtroDiasOcupados();
    setHora({
      hora: "",
      reservado: false,
    });
    console.log(verHorarios, "verHorarios");
    if (verHorarios.length > 0) {
      setProp(Object.keys(array[array.length - 1]));
    }
  };

  const coincidencia = () => {
    if (array?.length > 0) {
      var inputCalendar = array.filter((e) => {
        let dia = Object.keys(e);
        if (dia[0] === fecha) {
          return e;
        }
      });
      if (inputCalendar.length > 0) {
        let prop = Object.keys(inputCalendar[0])[0];
        let horas = inputCalendar[0][prop];

        return (
          //----------------- Horas disponibles -------------------//

          <div>
            {horas.map((e, i) =>
              e.reservado === false ? (
                <div key={"kj78234g43" + i}>
                  <button
                    type="button"
                    name="hora"
                    value={e.hora}
                    onClick={handleClick}
                    className="bg-teal-500"
                  >
                    {e.hora}
                  </button>
                </div>
              ) : (
                <div key={"kj78234g43" + i}>
                  <button type="button" value={false} className="bg-gray-400">
                    {e.hora}
                  </button>
                </div>
              )
            )}{" "}
            {errors.hora.length > 1 && (
              <p className="text-red-500"> Elija un horario para la cita</p>
            )}
          </div>

          //----------------- Horas disponibles -------------------//
        );
      }
      return (
        <div>
          <h1>No hay horarios disponibles</h1>
        </div>
      );
    }
  };

  const handleClick = (e) => {
    if (dia.length < 1) {
      setErrors({ ...errors, dia: "error" });
    } else {
      setErrors({ ...errors, dia: "" });
    }
    if (e.target.name === "direccion") {
      setDireccion(e.target.value);
    }
    if (e.target.name === "ciudad") {
      setCiudad(e.target.value);
    }
    if (e.target.name === "hora") {
      setHora({ hora: e.target.value, reservado: true });
    }
    handleErrors(e);
  };

  const handleErrors = (e) => {
    if (e.target.name === "hora") {
      e.target.value.length < 1
        ? setErrors({ ...errors, hora: "error" })
        : setErrors({ ...errors, hora: "" });
    }
    if (e.target.name === "direccion") {
      e.target.value < 1
        ? setErrors({ ...errors, direccion: "error" })
        : setErrors({ ...errors, direccion: "" });
    }
    if (e.target.name === "ciudad") {
      e.target.value.length < 1
        ? setErrors({ ...errors, ciudad: "error" })
        : setErrors({ ...errors, ciudad: "" });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (detalleServicio[0]?.homeService === true) {
      if (
        dia.length > 0 &&
        hora.hora.length > 0 &&
        direccion.length > 0 &&
        ciudad.length > 0
      ) {
        var body = {
          dia:'2021',
          hora,
          direccion,
          ciudad,
          uidClient: uid,
        };
        agregarCita(body, idService);
        setCiudad("");
        setDireccion("");
        setHora({
          hora: "",
          reservado: false,
        });
        setDia("");
        setValue(new Date());
      }
    } else if (detalleServicio[0]?.homeService === false) {
      if (dia.length > 0 && hora.hora.length > 0) {
        let body = {
          dia,
          hora,
          direccion: detalleServicio[0]?.address,
          ciudad,
          uidClient: uid,
        };
        agregarCita(body, idService);
        setCiudad("");
        setDireccion("");
        setHora({
          hora: "",
          reservado: false,
        });
        setDia("");
        setValue(new Date());
      }
    } else {
      alert("Complete los campos");
    }
  };
  const agregarCita = async (body, idService) => {
    const cita = `citas/${idService}`;
    const response = await axios.post(cita, body);
    alert(response.data);
    navigate("/home");
  };
  return (
    <div>
      <h1>Ver Horarios</h1>
      <h3>Seleccione una fecha para el turno: </h3>
      <form onSubmit={onSubmit}>
        {
          <DatePicker
            onOpen={handleClickFecha}
            format="YYYY/MM/DD"
            className="green"
            minDate={ today.getFullYear()+'/'+(today.getMonth()+1)+'/'+(today.getDate()+1)} 
            maxDate={prop[0]}
            value={value}
            onChange={handleChange}
            mapDays={({ date }) => {
              let props = {};
              let dias = diasOcupados?.map((e) => parseInt(e.slice(8, 10)));
              if (dias.includes(date.day)) props.disabled = true;
              return props;
            }}
          />
        }
        {errors.dia.length > 1 && (
          <p className="text-red-500"> Elija una fecha para la cita</p>
        )}
        <br />
        <span>Seleccione la hora del turno:</span>

        {/* Horas que coinciden con fecha de almanaque */}

        {dia.length > 0 ? coincidencia() : <p>No hay turno para esa fecha</p>}

        <br />
        {/* Si no es a Domicilio el usuario tiene que colocar direccion de cita */}
         {detalleServicio[0]?.homeService === true ? (
          <div>
            <h3>Direccion de la cita</h3>
            <label htmlFor="ciudad"> Ingrese su ciudad: </label>
            <input
              id="ciudad"
              name="ciudad"
              onChange={(e) => {
                handleClick(e);
              }}
              value={ciudad}
              type="text"
              placeholder="Ingrese su ciudad..."
            />
            {errors.ciudad.length > 1 && (
              <p className="text-red-500"> Ingrese una ciudad para continuar</p>
            )}

            <label htmlFor="direccion"> Ingrese su direccion: </label>
            <input
              id="direccion"
              name="direccion"
              onChange={(e) => {
                handleClick(e);
              }}
              value={direccion}
              type="text"
              placeholder="Ingrese una dirección..."
            />
            {errors.direccion.length > 1 && (
              <p className="text-red-500">
                {" "}
                Ingrese una direccion para continuar
              </p>
            )}
          </div>
        ) : (
          ""
        )}

        {/*--------------  Previsualizacion Turno  -------------------*/}

        <div className="bg-green-500">
          <h1>Turno para el Servicio: {detalleServicio[0]?.title}</h1>
          <h2>Con: {detalleServicio[0]?.nameUser}</h2>
          <h3>Fecha: {dia}</h3>
          <h3>Hora: {hora.hora}</h3>{" "}
          {detalleServicio[0]?.homeService === false ? (
            <div>
              {detalleServicio[0]?.homeService === true && <h3>Ciudad: {ciudad}</h3>}
              <h3>Dirección: {direccion || detalleServicio[0]?.address}</h3>
            </div>
          ) : (
            <div>
              <h3>Dirección: {detalleServicio[0]?.address}</h3>
            </div>
          )}
        </div>

        <button type="submit" className="bg-cyan-500">
          Agendar cita
        </button>
      </form>
    </div>
  );
};

export default AgendarCita;

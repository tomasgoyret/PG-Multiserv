import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import "react-multi-date-picker/styles/colors/green.css";
import { storage } from "../../Firebase";
import { useSelector, useDispatch } from "react-redux";
import { servicesId } from "../../redux/actions/actions";
import { Navigate, useNavigate } from "react-router";

const Horarios = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { detalleServicio } = useSelector((state) => state);
  const datosSesionFromLocalStorage = JSON.parse(
    localStorage.getItem("datoSesion")
  );
  const { uid } = datosSesionFromLocalStorage;
  const { idService } = useParams(); // id del Servicio
  const [rango, setRango] = useState([]);
  const [seteoRango, setSeteoRango] = useState("");
  const [errors, setErrors] = useState({ fecha: "", horas: "" });
  const [value, setValue] = useState([]);
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);
  const [fechas, setFechas] = useState([]);
  const [valuePanel, setValuePanel] = useState("");
  const today = new Date();
  var array = [];

  const rangoCuarto = [
    "06:00",
    "06:15",
    "06:30",
    "06:45",
    "07:00",
    "07:15",
    "07:30",
    "07:45",
    "08:00",
    "08:15",
    "08:30",
    "08:45",
    "09:00",
    "09:15",
    "09:30",
    "09:45",
    "10:00",
    "10:15",
    "10:30",
    "10:45",
    "11:00",
    "11:15",
    "11:30",
    "11:45",
    "12:00",
    "12:15",
    "12:30",
    "12:45",
    "13:00",
    "13:15",
    "13:30",
    "13:45",
    "14:00",
    "14:15",
    "14:30",
    "14:45",
    "15:00",
    "15:15",
    "15:30",
    "15:45",
    "16:00",
    "16:15",
    "16:30",
    "16:45",
    "17:00",
    "17:15",
    "17:30",
    "17:45",
    "18:00",
    "18:15",
    "18:30",
    "18:45",
    "19:00",
    "19:15",
    "19:30",
    "19:45",
    "20:00",
    "20:15",
    "20:30",
    "20:45",
    "21:00",
    "21:15",
    "21:30",
    "21:45",
    "22:00",
  ];
  const rangoMedio = rangoCuarto.filter((hora, i) => {
    if (i % 2 === 0) {
      return hora;
    }
  });
  const rangoHora = rangoMedio.filter((hora, i) => {
    if (i % 2 === 0) {
      return hora;
    }
  });
  const [claseDefault, setClaseDefault] = useState(
    "bg-green-200 rounded shadow-lg inset-0.5 m-1"
  );

  // Control de rangos Horarios
  const handleOnChange = (e) => {
    if (e.target.name === "rangos") {
      if (e.target.value === "cuarto") {
        setRango(rangoCuarto);
      }
      if (e.target.value === "medio") {
        setRango(rangoMedio);
      }
      if (e.target.value === "hora") {
        setRango(rangoHora);
      }
      if (e.target.value === "") {
        setRango([]);
      }
      handleErrors(e);
    }
    setSeteoRango(e.target.value);
  };

  // Seleccion de horarios para el cliente
  const handleOnSelect = (e) => {
    if (
      horariosDisponibles.filter((h) => {
        return h.hora === e.target.value;
      }).length === 0
    ) {
      setHorariosDisponibles([
        ...horariosDisponibles,
        { hora: e.target.value, reservado: false },
      ]);
      array = e.target.value;
      clasesBotones(true, e);
    } else {
      array = horariosDisponibles.filter((obj) => obj.hora !== e.target.value);
      setHorariosDisponibles(array);
      clasesBotones(false, e);
    }
    handleErrors(e, array);
  };

  // Errores
  const handleErrors = (e, a) => {
    if (e === "fecha") {
      if (a.length === 0) {
        setErrors({ ...errors, fecha: "Seleccione fechas para las citas" });
      } else {
        setErrors({ ...errors, fecha: "" });
      }
    } else {
      if (e.target.name === "rangos") {
        if (e.target.value === "") {
          setErrors({ ...errors, rango: "Seleccione un rango de horarios" });
        } else {
          setErrors({ ...errors, rango: "" });
        }
      }
      if (e.target.name === "horas") {
        if (a.length === 0) {
          setErrors({ ...errors, horas: "Seleccione horario para las citas" });
        } else {
          setErrors({ ...errors, horas: "" });
        }
      }
    }
  };

  const handleChange = (value) => {
    let dias = [];
    for (let i = 0; i < value.length; i++) {
      dias.push(value[i].format());
    }
    setFechas(dias);
    handleErrors("fecha", value);
  };

  // Submit de formulario para guardar horarios
  /* BACK END pide
    const { id } = req.params; 
    const { dias, horarios } = req.body; --> dias y horarios son []
  */
  const submitHorarios = async (e) => {
    e.preventDefault();
    let dias = fechas;
    let body = dias.map((d) => {
      return { [d]: horariosDisponibles };
    });
    let formHorarios = {
      fechas: body,
      uidClient: uid,
    };
    enviarHorarios(idService, formHorarios);
  };
  const enviarHorarios = async (idService, body) => {
    setSeteoRango("");
    setHorariosDisponibles([]);
    setRango([]);
    setFechas([]);
    setValue([]);
    setValuePanel("");
    const res = await axios.post(`horarios/${idService}`, body);
    alert(res.data);
    navigate("/home");
  };
  // Clases de botones
  const clasesBotones = (b, e) => {
    // clase de boton si esta seleccionado
    if (b === true) {
      e.target.className = "bg-green-400 rounded shadow-lg inset-0.5 m-1";
    }
    // clase de boton si no esta seleccionado
    else {
      e.target.className = "bg-green-200 rounded shadow-lg inset-0.5 m-1";
    }
  };

  useEffect(() => {
    dispatch(servicesId(idService));
  }, []);

/* useEffect(() => {
 
},[ ]) */

if(detalleServicio.length > 0 && uid !== detalleServicio[0].usuarioUidClient){
navigate("/home");
}
  return (<>
    { detalleServicio.length > 0 &&
    <div>
      <h1>Horarios para el servicio</h1>
      <br />
      <form id="formulario" onSubmit={(e) => submitHorarios(e)}>
        <div>
          <h3>Seleccione los dias hábiles para las citas</h3>
          <br />
          <DatePicker
            className="green"
            format="YYYY/MM/DD"
            minDate={new Date().setDate(today.getDate())}
            maxDate={new Date().setDate(30)}
            multiple
            value={value}
            onChange={handleChange}
            plugins={[<DatePanel value={valuePanel} />]}
          />
        </div>
        {errors.fecha !== "" && <p className="text-red-500">{errors.fecha}</p>}
        <br />
        <div>
          <label htmlFor="rangos">Seleccione intervalos de las citas</label>
          <select
            value={seteoRango}
            id="rangos"
            name="rangos"
            onChange={handleOnChange}
          >
            <option value="">Seleccion una opcion</option>
            <option value="cuarto">15 minutos</option>
            <option value="medio">30 minutos</option>
            <option value="hora">60 minutos</option>
          </select>
        </div>
        <p className="text-red-400">{errors.rango}</p>
        <br />
        <div>
          {rango.length > 0 && (
            <label htmlFor="horas">Seleccione horarios de las citas</label>
          )}
          {rango.length === 65 &&
            rangoCuarto.map((hora, i) =>
              i + 1 < rangoCuarto.length ? (
                <div key={"keyderangosCuartos" + i}>
                  <input
                    id="horas"
                    name="horas"
                    className={claseDefault}
                    type="button"
                    onClick={handleOnSelect}
                    value={`${hora} - ${rangoCuarto[i + 1]}`}
                  />
                </div>
              ) : (
                ""
              )
            )}
          {rango.length === 33 &&
            rangoMedio.map((hora, i) =>
              i + 1 < rangoMedio.length ? (
                <div key={"keyderangosMedios" + i}>
                  <input
                    name="horas"
                    className={claseDefault}
                    type="button"
                    onClick={handleOnSelect}
                    value={`${hora} - ${rangoMedio[i + 1]}`}
                  />
                </div>
              ) : (
                ""
              )
            )}
          {rango.length === 17 &&
            rangoHora.map((hora, i) =>
              i + 1 < rangoHora.length ? (
                <div key={"keyderangosHoras" + i}>
                  <input
                    name="horas"
                    className={claseDefault}
                    type="button"
                    onClick={handleOnSelect}
                    value={`${hora} - ${rangoHora[i + 1]}`}
                  />
                </div>
              ) : (
                ""
              )
            )}
        </div>
        <p className="text-red-400">{errors.horas}</p>
        <br />
        Aqui
        {fechas.length !== 0 && horariosDisponibles.length !== 0 ? (
          <div>
            <button type="submit" className="">
              enviar
            </button>
          </div>
        ) : (
          <div>
            <button disabled={true} className="">
              enviar
            </button>
          </div>
        )}
      </form>
    </div> }</>
  );
};
// pais ciudad calle numero
export default Horarios;

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import "react-multi-date-picker/styles/colors/green.css";
import ListBox from "../../Components/HeadLess/ListBox/ListBox";
import { useSelector, useDispatch } from "react-redux";
import { servicesId } from "../../redux/actions/actions";
import { Navigate, useNavigate } from "react-router";
import { IoReturnUpBack } from "react-icons/io5";
import { FcClock, FcCalendar, FcAdvertising } from "react-icons/fc";
import InputIcon from "react-multi-date-picker/components/input_icon";
import { WiTime3, WiTime6, WiTime12 } from "react-icons/wi";
import { CgOptions } from "react-icons/cg";
import Swal from "sweetalert2";

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
  const handleOnChange = (option) => {
    if (option.value !== "none") {
      setErrors({ ...errors, rango: "" });
      if (option.value === "cuarto") {
        setRango(rangoCuarto);
      }
      if (option.value === "medio") {
        setRango(rangoMedio);
      }
      if (option.value === "hora") {
        setRango(rangoHora);
      }
    } else {
      setRango([]);
      setErrors({ ...errors, rango: "Para agregar horarios de servicio, primero escoge alguna opción de la lista" });
    }
    setSeteoRango(option.value);
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
  const options = [
    {
      name: 'Escoge una opción:',
      value: 'none',
      icon: <CgOptions className="text-2xl" />
    },
    {
      name: '15 minutos',
      value: 'cuarto',
      icon: <WiTime3 className="text-2xl" />
    },
    {
      name: 'Media hora',
      value: 'medio',
      icon: <WiTime6 className="text-2xl" />
    },
    {
      name: 'Una hora',
      value: 'hora',
      icon: <WiTime12 className="text-2xl" />
    },
  ]
  const enviarHorarios = async (idService, body) => {
    setSeteoRango("");
    setHorariosDisponibles([]);
    setRango([]);
    setFechas([]);
    setValue([]);
    setValuePanel("");
    const res = await axios.post(`horarios/${idService}`, body);
    Swal.fire(
      '¡Listo!',
      'Se modificaron los horarios de tu servicio con éxito',
      'success'
    )
    navigate(-1);
  };
  // Clases de botones
  const clasesBotones = (b, e) => {
    // clase de boton si esta seleccionado
    if (b === true) {
      e.target.className = "cursor-pointer px-2 py-1 m-1 rounded-md bg-cyan-900 text-white font-semibold transition-all ease-in-out duration-300";
    }
    // clase de boton si no esta seleccionado
    else {
      e.target.className = "cursor-pointer px-2 py-1 m-1 rounded-md bg-teal-100 text-cyan-900 font-semibold transition-all ease-in-out duration-300 hover:bg-cyan-700 hover:text-white";
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
      <div className="w-full max-h-screen flex flex-col">
        <div className="flex flex-row justify-between items-center w-full h-20 bg-gray-900 px-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex flex-row px-4 py-0.5 bg-transparent rounded-full text-white transition-all ease-in-out duration-300 bg-gray-900 hover:bg-gray-600">
            <IoReturnUpBack className="mr-3 self-center text-xl" />
            <span className="font-semibold self-center ">Regresar</span>
          </button>
        </div>
        <div className="flex flex-col px-16 pt-8 bg-gray-50 h-auto overflow-y-auto ">
          <h1 className="text-4xl font-semibold text-sky-900">Horarios de tu servicio</h1>
      <br />
        <form id="formulario" onSubmit={(e) => submitHorarios(e)} className="bg-white rounded-xl shadow-lg py-6 px-8 mb-8 transition-all ease-in-out duration-300">
          <div className="border-b border-gray-200 mb-4 pb-2">
            <h2 className="text-center text-2xl font-semibold text-sky-900" >Escoge los detalles de fechas y horas</h2>
          </div>
          <div className="flex flex-col justify-start">
            <div className="flex flex-row">
              <FcCalendar className="self-center mr-2 text-2xl" />
              <span className="font-semibold text-xl mr-4">¿En qué fechas brindarás tus servicios? </span>
            </div>
            <div className="flex flex-row mt-2">
          <DatePicker
                placeholder="Seleccione una fecha"
                style={{
                  boxSizing: "border-box",
                  height: "26px",
                  border: '2px solid black'
                }}

                render={<InputIcon />}
                className="green"
                format="YYYY/MM/DD"
                minDate={today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + (today.getDate() + 1)}
                maxDate={new Date().setDate(60)}
                multiple
                value={value}
                onChange={handleChange}
                plugins={[<DatePanel value={valuePanel} />]}
              />
            </div>
          </div>
          {errors.fecha !== "" && <p className="font-semibold text-rose-800 mt-2 px-4">{errors.fecha}</p>}
        <br />
        <div>
            <label htmlFor="rangos" className="font-semibold text-xl mr-3 cursor-pointer flex flex-row items-center mb-4">
              <FcClock className="self-center mr-2 text-2xl" />
              <span className="self-center">¿Cuánto durará cada sesión?</span>
            </label>
            <ListBox
              includeIconOnDesc
              options={options}
              callBack={handleOnChange}
              theme="#0C4A6E"
            />
        </div>
          <p className="font-semibold text-rose-800 mt-2 px-4">{errors.rango}</p>
        <br />
        <div>
          {rango.length > 0 && (
              <label htmlFor="horas" className="font-semibold text-xl mr-3 cursor-pointer flex flex-row items-center mb-2">
                <FcAdvertising className="self-center mr-2 text-2xl" />
                <span className="self-center">¿En qué horarios estarás disponible?</span>
              </label>
          )}
          {rango.length === 65 &&
              <div className="flex flex-row justify-start max-w-full flex-wrap">
                {rangoCuarto.map((hora, i) =>
              i + 1 < rangoCuarto.length ? (
                <div key={"keyderangosCuartos" + i}>
                  <input
                    id="horas"
                    name="horas"
                        className="cursor-pointer px-2 py-1 m-1 rounded-md bg-teal-100 text-cyan-900 font-semibold hover:bg-cyan-700 hover:text-white"
                    type="button"
                    onClick={handleOnSelect}
                    value={`${hora} - ${rangoCuarto[i + 1]}`}
                  />
                </div>
              ) : (
                ""
              )
            )}
              </div>}
          {rango.length === 33 &&
              <div className="flex flex-row justify-start max-w-full flex-wrap">
                {rangoMedio.map((hora, i) =>
              i + 1 < rangoMedio.length ? (
                <div key={"keyderangosMedios" + i}>
                  <input
                    name="horas"
                        className="cursor-pointer px-2 py-1 m-1 rounded-md bg-teal-100 text-cyan-900 font-semibold hover:bg-cyan-700 hover:text-white"
                    type="button"
                    onClick={handleOnSelect}
                    value={`${hora} - ${rangoMedio[i + 1]}`}
                  />
                </div>
              ) : (
                ""
              )
            )}
              </div>}
          {rango.length === 17 &&
              <div className="flex flex-row justify-start max-w-full flex-wrap">
                {rangoHora.map((hora, i) =>
              i + 1 < rangoHora.length ? (
                    <div key={"keyderangosHoras" + i} className="mx-2">
                  <input
                    name="horas"
                        className="cursor-pointer px-2 py-1 m-1 rounded-md bg-teal-100 text-cyan-900 font-semibold hover:bg-cyan-700 hover:text-white"
                    type="button"
                    onClick={handleOnSelect}
                    value={`${hora} - ${rangoHora[i + 1]}`}
                  />
                </div>
              ) : (
                ""
              )
            )}
              </div>}
        </div>
          <p className="font-semibold text-rose-800 mt-2 px-4">{errors.horas}</p>
          <br />
          <div>
            <button disabled={!(fechas.length !== 0 && horariosDisponibles.length !== 0)} type="submit" className="px-4 py-2 rounded-md bg-sky-800 text-white font-semibold transition-all ease-in-out duration-300 disabled:opacity-50">
              Guardar cambios
            </button>
          </div>
      </form>
      </div>
    </div> }</>
  );
};
// pais ciudad calle numero
export default Horarios;

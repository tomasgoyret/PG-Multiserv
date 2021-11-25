import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Horarios = () => {
  const { idService } = useParams(); // id del Servicio
  var formHorarios = {};
  const [rango, setRango] = useState([]);
  const [errors, setErrors] = useState({
    dias: "",
    horas: "",
    address: "",
    aDomicilio: "",
  });
  const [address, setAddress] = useState("");
  const [aDomicilio, setADomicilio] = useState("");
  const [dias, setDias] = useState("");
  const [location, setLocation] = useState([]);
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);
  const [claseDefault, setClaseDefault] = useState(
    "bg-green-200 rounded shadow-lg inset-0.5 m-1"
  );
  var horas = [];
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
  // Control de Checkbox de DIAS y rangos Horarios
  const handleOnChange = (e) => {
    if (e.target.name === "rangos") {
      horas = [];
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
    if (e.target.type === "checkbox") {
      if (e.target.checked === true) {
        if (!dias.includes(e.target.value)) {
          setDias([...dias, e.target.value]);
        }
      } else {
        if (dias.includes(e.target.value)) {
          setDias(dias.filter((dia) => dia !== e.target.value));
        }
      }
    }
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

  // Control de address
  const handleAddress = (e) => {
    handleErrors(e);
    setAddress(e.target.value);
  };

  // Control de a domicilio
  const servicioADomicilio = (e) => {
    if (e.target.value === true) {
      setADomicilio(e.target.value);
      handleErrors(e);
    } else {
      setAddress("");
      setADomicilio(e.target.value);
      handleErrors(e);
    }
  };
  // Errores
  const handleErrors = (e, a) => {
    if (e.target.name === "rangos") {
      if (e.target.value === "") {
        setErrors({ ...errors, rango: "Seleccione un rango de horarios" });
      } else {
        setErrors({ ...errors, rango: "" });
      }
    }
    if (e.target.name === "aDomicilio") {
      if (e.target.value === "") {
        setErrors({ ...errors, aDomicilio: "Seleccione una opcion" });
      } else {
        setErrors({ ...errors, aDomicilio: "" });
      }
    }
    if (e.target.name === "address") {
      if (e.target.value.length === 0 && aDomicilio === "true") {
        setErrors({ ...errors, address: "Ingrese una direccion" });
      } else {
        setErrors({ ...errors, address: "" });
      }
    }
    if (e.target.name === "horas") {
      if (a.length === 0) {
        setErrors({ ...errors, horas: "Seleccione horario para las citas" });
      } else {
        setErrors({ ...errors, horas: "" });
      }
    }
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

  // Submit de formulario para guardar horarios
  /* BACK END pide
    const { id } = req.params; 
    const { address, aDomicilio, dias, horarios } = req.body;
  */

  const submitHorarios = async (e) => {
    e.preventDefault();
    if (
      errors.dias === "" &&
      errors.horas === "" &&
      errors.address === "" &&
      errors.aDomicilio === "" &&
      dias.length > 0 &&
      horariosDisponibles.length > 0 &&
      ((aDomicilio === "false" && address === "") ||
        (aDomicilio === "true" && address.length > 0))
      /*&& location.length > 0 */
    ) {
      formHorarios = {
        aDomicilio,
        address,
        dias,
        location,
        horarios: horariosDisponibles,
      };
      enviarHorarios(idService, formHorarios);
    } else {
      alert("Complete todos los campos");
    }
  };

  const enviarHorarios = async (idService, body) => {
console.log('s')

    const res = await axios.post(`horarios/${idService}`, body);
    const resetDomicilio = document.getElementById("aDomicilio");
    const resetRangos = document.getElementById("rangos");
    const inputs = document.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].checked = false;
    }
    resetDomicilio.value = "";
    resetRangos.value = "";
    setDias([]);
    setADomicilio('');
    setHorariosDisponibles([]);
    setAddress("");
    setLocation([]);
    setRango([])
    alert(res.data);
  };
  return (
    <div>
      <h1>Horarios</h1>
      <br />
      <form id="formulario" onSubmit={(e) => submitHorarios(e)}>
        <div>
          <h1>Seleccione los dias hábiles para las citas</h1>
          <br />
        </div>
        <div>
          <input
            type="checkbox"
            name="Lunes"
            onClick={handleOnChange}
            value="Lunes"
          />{" "}
          <label htmlFor="Lunes"> Lunes </label>
          <input
            type="checkbox"
            name="Martes"
            onClick={handleOnChange}
            value="Martes"
          />{" "}
          <label htmlFor="Martes"> Martes </label>
          <input
            type="checkbox"
            name="Miercoles"
            onClick={handleOnChange}
            value="Miercoles"
          />{" "}
          <label htmlFor="Miercoles"> Miercoles </label>
          <input
            type="checkbox"
            name="Jueves"
            onClick={handleOnChange}
            value="Jueves"
          />{" "}
          <label htmlFor="Jueves"> Jueves </label>
          <input
            type="checkbox"
            name="Viernes"
            onClick={handleOnChange}
            value="Viernes"
          />{" "}
          <label htmlFor="Viernes"> Viernes </label>
          <input
            type="checkbox"
            name="Sabado"
            onClick={handleOnChange}
            value="Sabado"
          />{" "}
          <label htmlFor="Sabado"> Sabado </label>
          <input
            type="checkbox"
            name="Domingo"
            onClick={handleOnChange}
            value="Domingo"
          />{" "}
          <label htmlFor="Domingo"> Domingo </label>
        </div>
        {dias.length < 1 && dias !== "" && (
          <p className="text-red-400">
            Debe seleccionar días disponibles para la cita
          </p>
        )}
        <br />
        <div>Seleccione intervalos de las citas</div>
        <br />
        <div>
          <select id="rangos" name="rangos" onChange={handleOnChange}>
            <option value="">Seleccion una opcion</option>
            <option value="cuarto">15 minutos</option>
            <option value="medio">30 minutos</option>
            <option value="hora">60 minutos</option>
          </select>
        </div>
        <p className="text-red-400">{errors.rango}</p>
        <br />
        {rango.length > 0 && <div>Seleccione horarios de las citas</div>}
        <br />
        <div>
          {rango.length === 65 && (
            <div>
              {rangoCuarto.map((hora, i) =>
                i + 1 < rangoCuarto.length ? (
                  <div key={"keyderangosCuartos" + i}>
                    <input
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
            </div>
          )}
          {rango.length === 33 && (
            <div>
              {rangoMedio.map((hora, i) =>
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
            </div>
          )}
          {rango.length === 17 && (
            <div>
              {rangoHora.map((hora, i) =>
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
          )}
        </div>
        <p className="text-red-400">{errors.horas}</p>
        <div>
          <br />
          <div>¿ El servicio que ofrece es a domicilio ?</div>
          <br />
          <select
            name="aDomicilio"
            id="aDomicilio"
            onChange={servicioADomicilio}
          >
            <option value="">Seleccione una opcion</option>
            <option value={true}>Si</option>
            <option value={false}>No</option>
          </select>
        </div>
        <p className="text-red-400">{errors.aDomicilio}</p>
        <div>
          <br />
          {aDomicilio === "true" && (
            <div>
              <h1>Direccion</h1>
              <label htmlFor="address">Ingrese direccion del servicio : </label>
              <input
                type="text"
                name="address"
                onChange={handleAddress}
                placeholder="ingrese direccion..."
              />
              <div>
                <br />
                <h1>Location</h1>
                <p>Tomas y Santi manejensen ajaja</p>
              </div>
            </div>
          )}
        </div>
        <p className="text-red-400"> {errors.address}</p>
        <button type="submit" className="">
          enviar
        </button>
      </form>
    </div>
  );
};
// pais ciudad calle numero
export default Horarios;

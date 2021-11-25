/* import React, { useState, useEffect, DateObject } from "react";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import "react-multi-date-picker/styles/colors/green.css";

const Fechas = () => {
    const [value, setValue] = useState([]);
    const [fechas, setFechas] = useState([]);
    const today = new Date();
  const handleChange = (value) => {
    for (let i = 0; i < value.length; i++) {
      let fecha = value[i].toDate().toString().slice(0, 16);
       setFechas([...fechas, fecha])
    }
  };

  return (
    <DatePicker
      className="green"
      minDate={new Date().setDate(today.getDate())}
      maxDate={new Date().setDate(60)}
      multiple
      value={value}
      onChange={handleChange}
      plugins={[<DatePanel />]}
    />
  );
};

export default Fechas; */

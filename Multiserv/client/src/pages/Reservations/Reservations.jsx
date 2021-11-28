import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getReservas, getServicios } from "../../redux/actions/actions";

const Reservations = () => {
  const { uidClient } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [misReservas, setMisReservas] = useState([]);
  const { reservas, misServicios } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getServicios(uidClient));
  }, []);

  useEffect(() => {
    for (let i = 0; i < misServicios.length; i++) {
      dispatch(getReservas(misServicios[i].id));
    }
  }, [misServicios]);

  console.log(reservas, "reservas");

  console.log(reservas[0], "asd");

  return (
    <div>
      <h1>Reservations</h1>
      <p className="">{reservas[0]?.id}</p>




      
    </div>
  );
};
export default Reservations;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getReservas } from "../../redux/actions/actions";

const Reservations = () => {
  const datosSesionFromLocalStorage = JSON.parse(
    localStorage.getItem("datoSesion")
  );
  const { uid } = datosSesionFromLocalStorage;
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [misReservas, setMisReservas] = useState([]);
  const { reservas } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getReservas(id));
  }, []);
  useEffect(() => {
    navigate("/home");
  }, [reservas.usuarioUidClient !== uid]);

  console.log(reservas.citas,'reservas');
  console.log(uid, 'uidClient');
  console.log(id, 'idService');

  return (
    <div>
      <h1>Reservations</h1>
    </div>
  );
};
export default Reservations;

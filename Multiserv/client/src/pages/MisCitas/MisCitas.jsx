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

export default MisCitas;

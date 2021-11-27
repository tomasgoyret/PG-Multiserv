import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getMisCitas, cancelarCita } from "../../redux/actions/actions";

const Reservations = () => {
    return(
        <div>
            <h1>Reservations</h1>
        </div>
    )
}
export default Reservations;
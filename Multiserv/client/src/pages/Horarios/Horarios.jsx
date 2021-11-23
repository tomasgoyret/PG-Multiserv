import React from "react";
import { useParams } from 'react-router-dom';

const Horarios = () => {
    const { uidClient } = useParams();
    return <div>Horarios</div>;
}

export default Horarios;
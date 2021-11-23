import React from "react";
import { useParams } from 'react-router-dom';

const MisCitas = () => {
    const { uidClient } = useParams();
    console.log(uidClient);
    return (
    <div>Mis Citas</div>
    )
}
export default MisCitas;
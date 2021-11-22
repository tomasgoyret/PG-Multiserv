import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from "react-router-dom";


const ConfirmServicio = () => {




    const [searchParams, setSearchParams] = useSearchParams()
    const params = {
        estadoDePago: searchParams.get('status'),
        idServ: searchParams.get('external_reference'),
    }
    console.log(params.estadoDePago, params.idServ)

    const actualizarPago = async ()=>{
        await axios.put(`edit-service/${params.idServ}`,{estadoDePago : params.estadoDePago})
    }

    useEffect(() => {
        actualizarPago()
      }, []);

    return (
        <h1>El estado del pago es {params.estadoDePago} y el id del servicio es {params.idServ}</h1>
    )
}

export default ConfirmServicio;
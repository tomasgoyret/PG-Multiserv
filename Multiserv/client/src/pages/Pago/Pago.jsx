import axios from 'axios';
import React ,{ useEffect, useState } from 'react';




const Pago = () => {
    const [linkdePago,setLinkPago] = useState("")
    let id = {id : "prueba"}
    const handleRedirect = ()=>{
        window.open(linkdePago)
    }

    useEffect( async () => {
        let link = await axios.post("pay-service",id)
        setLinkPago(link.data)
    }, [])
    
    console.log(linkdePago)
    return <div>
        <div className="">
            <button onClick={handleRedirect}>Pagar</button>
        </div>
    </div>
}

export default Pago;
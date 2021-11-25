const { Servicios } = require("../db.js");

const putServ = async (req, res,next) => {
    const { id } = req.params;
    let { title, currency,  category, description, max, min, rating, photos, direccion, estadoDePago} = req.body;
    let traduccion = ""
    console.log(estadoDePago)
    if( estadoDePago==="approved"){
        traduccion = "Aprobado"
    }
    if(estadoDePago==="rejected"){
        traduccion = "Rechazado"
    }
    if( estadoDePago==="in_process"){
        traduccion = "Pendiente"
    }
    try {
        const serv = await Servicios.update({
            title,
            currency,
            category,
            description,
            max,
            min,
            rating,
            photos,
            direccion,
            estadoDePago: traduccion? traduccion : estadoDePago
        },{
            where: { id }
            } );
        res.send({ msg: "Servicio actualizado correctamente", serv})
    }
    catch (error) {
        next(error)
    }
}

module.exports = putServ;
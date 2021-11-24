const { Servicios } = require("../db.js");


const putUbicacion = async(req,res,next)=>{
    const { id } = req.params
    const { location , address} = req.body
    try {
        const loc = await Servicios.update({
            location: location,
            address: address
        },{
            where: { id }
            } );
        res.send({ msg: "Se agregó la ubicación correctamente", loc})
    }
    catch (error) {
        next(error)
    }
} 




module.exports = putUbicacion;
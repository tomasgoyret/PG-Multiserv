const { Horarios, Servicios } = require("../db.js");

const postHorarios = async (req, res) => {
    const { idService } = req.params; 
    const { fechas, uidClient } = req.body;
    try {
        const servicio = await Servicios.findByPk(idService)
        if(servicio.usuarioUidClient === uidClient){
        const horario = await Horarios.create({fechas:fechas});
        await servicio.addHorarios(horario)
         res.send(`agregado correctamente al servicio ${servicio.title}, con id: ${idService}`)
        }else{
            res.send("Usuario incorrecto para creacion de servicio")
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = postHorarios
const { Servicios, Categorias } = require("../db.js");

const putServ = async (req, res,next) => {
    const { id } = req.params;
    let { title, currency,  category, description, max, min, rating, photos, direccion, estadoDePago, homeService} = req.body;
    let traduccion = ""
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
            description,
            max,
            min,
            rating,
            photos,
            direccion,
            homeService,
            estadoDePago: traduccion? traduccion : estadoDePago
        },{
            where: { id }
            } );

        if(category){
        const servicesUpdt = await Servicios.findByPk(id);
        console.log(servicesUpdt)
        servicesUpdt.removeCategorias([1]);
        const categoria = await Categorias.findOne({ where: { title: category } })
        await servicesUpdt.addCategorias(categoria)
        }
        res.send({ msg: "Servicio actualizado correctamente", serv})
    }
    catch (error) {
        next(error)
    }
}

module.exports = putServ;
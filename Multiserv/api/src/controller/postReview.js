const { Servicios, Resenas, Usuarios }= require("../db");


const postResena = async (req, res)=> {
    const { id } = req.params;
    const {title, details, rating, uidClient} = req.body;
    try{ 
        const [resena, created] = await Resenas.findOrCreate({
            where: { usuarioUidClient: uidClient, servicioId: id},
            defaults: {
                title,
                details,
                rating
            }
        });
        if(created) {
            const servicio = await Servicios.findByPk(id);
            const usuario = await Usuarios.findOne({where: {uidClient}}); 
            await servicio.addResenas(resena);
            await usuario.addResenas(resena);
        }
        if(!created) return res.status(404).json({msg: "Solo puede hacer una reseña por servicio"})
        res.status(200).json({msg:"La reseña se creo correctamente", resena})

    } catch(err){
        res.status(400).send(err)
    }
}

module.exports = postResena;
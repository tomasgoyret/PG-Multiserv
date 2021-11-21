const { Servicios, Resenas, Usuarios }= require("../db");

const postResena= async (req, res)=> {
        const { id } = req.params; 
        const {title, details, rating, uidClient} = req.body;

        const newResena = {
            title, details, rating
        };
        try{ 
            const resena = await Resenas.create(newResena);
            const servicio = await Servicios.findByPk(id); 
            const usuario = await Usuarios.findOne({where: {uidClient}}); 
            await servicio.addResenas(resena);
            await usuario.addResenas(resena);
            res.status(200).json({msg:"La reseña se creo correctamente", data: resena})

        } catch(err){
            console.log(err)
            res.status(400).send(err)
        }
}

const getResenas = async (req, res) => {
    const {id} = req.params;
    try {
        const resenas= await Resenas.findAll();
        if(id){
            const filtered= resenas.filter(resena => parseInt(resena.dataValues.servicioId) === parseInt(id));
            res.status(200).json(filtered);
        }
        else res.status(200).json(resenas);
        
    } catch (error) {
        res.status(400).json(error);
    }
}

module.exports= {
    postResena,
    getResenas
}

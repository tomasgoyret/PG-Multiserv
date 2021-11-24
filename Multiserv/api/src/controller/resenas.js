const { Servicios, Resenas, Usuarios }= require("../db");

const postResena= async (req, res)=> {
        const { id } = req.params; 
        const {title, details, rating, uidClient} = req.body;

        const newResena = {
            title, details, rating
        };
        try{ 
            const [resena, created] = await Resenas.findOrCreate({
                where: {usuarioUidClient: uidClient, servicioId: id},
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
            res.status(200).json({msg:"La reseña se creo correctamente", data: resena})

        } catch(err){
            res.status(400).send(err)
        }
}

const getResenas = async (req, res) => {
    try {
        const resenas= await Resenas.findAll();
        res.status(200).json(resenas);
    } catch (error) {
        res.status(400).json(error);
    }
}



const getResenasId = async (req, res) => {
    const {id} = req.params;
    try {
        const resenas= await Resenas.findAll();
        const filtered= resenas.filter(resena => parseInt(resena.dataValues.servicioId) === parseInt(id));
        res.status(200).json(filtered);
    } catch (error) {
        res.status(400).json(error);
    }
}

const deleteResenas = async (req, res) => {
        const id = req.params;
        const resena = await Resenas.destroy({where: id});
        resena ? res.json({msg: "La reseña se borró correctamente"}) : 
        res.json({msg: 'La reseña que intenta eliminar no existe'});
};


const putResenas = async (req, res) => {
    try {
        const { id } = req.params;
        const {title, details, rating} = req.body;

        const resena = await Resenas.update({
            title,
            details,
            rating
        }, {where: {
            id
        }});
        res.status(201).json({msg: "La reseña fue actualziada"})
    } catch (error) {
        console.log(error);
    }
};

module.exports= {
    postResena,
    getResenas,
    deleteResenas,
    putResenas,
    getResenasId
}

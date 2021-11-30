const { Servicios, Resenas, Usuarios }= require("../db");

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
        const resenas = await Resenas.findAll();
        const filtered = resenas.filter(resena => parseInt(resena.dataValues.servicioId) === parseInt(id));
        
        if(filtered.length > 0) {
          const rating = filtered.map(r => r.rating);
          const suma = rating.reduce((a, b) => a + b, 0);
          const promedio = suma / rating.length;
          const servicio = await Servicios.update({rating: promedio.toFixed(1)}, {where: {id}})
        }
        res.status(200).json(filtered);
    } catch (error) {
        res.status(400).json("No funciona");
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
    getResenas,
    deleteResenas,
    putResenas,
    getResenasId
}

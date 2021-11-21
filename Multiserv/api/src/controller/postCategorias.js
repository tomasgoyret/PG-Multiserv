const {Categorias} = require('../db')


const postCategorias = async(req,res,next) =>{
    const { title } = req.body
    let cat = title.charAt(0).toUpperCase() + title.slice(1).toLowerCase()
    try {
        let existe = await Categorias.findOne({ where: { title: cat }})
        if(existe === null){
            await Categorias.create({title: cat})
            res.send(`Se creó la categoría ${cat} correctamente`)
        }
        res.send(`La categoría ${cat} ya existe`)
    } catch (error) {
        next(error)
    }
}

module.exports = postCategorias
const {Categorias} = require('../db')


const getCategorias = async(req,res,next) =>{
    try {
        let allCategories = await Categorias.findAll()
        let respuesta = allCategories.map((c)=>{
            let res = {
                id : c.id,
                title: c.title}
            return res
        })
        res.send(respuesta)
    } catch (error){
        next(error) 
    }
}

module.exports = getCategorias;
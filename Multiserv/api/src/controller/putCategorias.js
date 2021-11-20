const { Categorias } = require("../db.js");


const putCategoria = async (req, res) => {
    const { id , newTitle } = req.body;
    try {
        const cate = await Categorias.update({
            title : newTitle,
        },{
            where: { id }
            } );
        res.send({ msg: "Categoría actualizada correctamente", cate})
    }
    catch (error) {
        res.send(error)
    }
}

module.exports = putCategoria;
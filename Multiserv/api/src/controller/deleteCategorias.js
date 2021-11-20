const { Categorias } = require("../db.js");

const deleteCategorias = async (req, res) => {
    const { id } = req.params;
    try {
        let Categoria = await Categorias.destroy({ where:{ id } });
        Categoria !== 1 ? res.send('No hay Categorías que coincidan') : res.send("Categoria borrada correctamente")
    } catch (error) {
        console.log(error)
    }
}

module.export = deleteCategorias

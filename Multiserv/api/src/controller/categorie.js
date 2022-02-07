const { Categorias } = require('../db.js')

const deleteCategorie = async (req, res) => {
  const { id } = req.params
  try {
    const Categoria = await Categorias.destroy({ where: { id } })
    Categoria !== 1 ? res.send('No hay Categorías que coincidan') : res.send('Categoria borrada correctamente')
  } catch (error) {
    console.log(error)
  }
}

const getAllCategories = async (req, res, next) => {
  try {
    const allCategories = await Categorias.findAll()
    const respuesta = allCategories.map((c) => {
      const res = {
        id: c.id,
        title: c.title
      }
      return res
    })
    res.send(respuesta)
  } catch (error) {
    next(error)
  }
}

const postCategorie = async (req, res, next) => {
  const { title } = req.body
  const cat = title.charAt(0).toUpperCase() + title.slice(1).toLowerCase()
  try {
    const existe = await Categorias.findOne({ where: { title: cat } })
    if (existe === null) {
      await Categorias.create({ title: cat })
      res.send(`Se creó la categoría ${cat} correctamente`)
    }
    res.send(`La categoría ${cat} ya existe`)
  } catch (error) {
    next(error)
  }
}

const updateCategorie = async (req, res) => {
  const { id, newTitle } = req.body
  try {
    const cate = await Categorias.update({
      title: newTitle
    }, {
      where: { id }
    })
    res.send({ msg: 'Categoría actualizada correctamente', cate })
  } catch (error) {
    res.send(error)
  }
}

module.exports = {
  getAllCategories,
  updateCategorie,
  deleteCategorie,
  postCategorie
}

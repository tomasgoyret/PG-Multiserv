const { Categorias } = require('../db.js')

const deleteCategorie = async (req, res) => {
  const { id } = req.params
  const category = await Categorias.destroy({ where: { id } })
  category !== 1 ? res.status(400).json('No hay Categorías que coincidan') : res.status(200).json('Categoria borrada correctamente')
}

const getAllCategories = async (req, res) => {
  const allCategories = await Categorias.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] } })
  res.status(200).json(allCategories)
}

const postCategorie = async (req, res) => {
  let { title } = req.body
  title = title.charAt(0).toUpperCase() + title.slice(1).toLowerCase()
  const category = await Categorias.findOne({ where: { title: title } })
  if (!category) {
    await Categorias.create({ title: title })
    res.status(201).json(`Se creó la categoría ${title} correctamente`)
  }
  res.status(400).json(`La categoría ${title} ya existe`)
}

const updateCategorie = async (req, res) => {
  const { id, newTitle } = req.body
  try {
    const category = await Categorias.update({
      title: newTitle
    }, {
      where: { id }
    })
    res.status(201).json({ msg: 'Categoría actualizada correctamente', category })
  } catch (error) {
    res.status(400).json(error)
  }
}

module.exports = {
  getAllCategories,
  updateCategorie,
  deleteCategorie,
  postCategorie
}

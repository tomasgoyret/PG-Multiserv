const { Servicios, Categorias, Usuarios, Horarios } = require('../db.js')

const postService = async (req, res, next) => {
  const { title, currency, category, description, max, min, uidClient, rating, photos, location, address, homeService } = req.body
  try {
    await Usuarios.update({ provider: true }, { where: { uidClient: uidClient } })
    const usuario = await Usuarios.findByPk(uidClient)
    const newService = {
      title,
      currency,
      description,
      max,
      min,
      rating,
      photos,
      location,
      address,
      homeService,
      usuarioUidClient: uidClient,
      nameUser: usuario.displayName,
      profilePic: usuario.photoURL
    }
    const service = await Servicios.create(newService)
    await usuario.addServicios(service)
    const categoria = await Categorias.findOne({ where: { title: category } })
    await service.addCategorias(categoria)
    res.send({ msg: 'Nuevo servicio agregado correctamente', servicio: service })
  } catch (error) {
    next(error)
  }
}

const updateService = async (req, res, next) => {
  const { id } = req.params
  const { title, currency, category, description, max, min, rating, photos, direccion, estadoDePago, homeService, location, address } = req.body
  let traduccion = ''
  if (estadoDePago === 'approved') traduccion = 'Aprobado'
  if (estadoDePago === 'rejected') traduccion = 'Rechazado'
  if (estadoDePago === 'in_process')traduccion = 'Pendiente'
  try {
    const serv = await Servicios.update({
      title,
      currency,
      description,
      max,
      min,
      rating,
      photos,
      location,
      address,
      direccion,
      homeService,
      estadoDePago: traduccion || estadoDePago
    }, {
      where: { id }
    })

    if (category) {
      const servicesUpdt = await Servicios.findByPk(id, { include: { model: Categorias } })
      const idCate = servicesUpdt.categorias[0].id
      await servicesUpdt.removeCategorias(idCate)
      const categoria = await Categorias.findOne({ where: { title: category } })
      await servicesUpdt.addCategorias(categoria)
    }
    res.send({ msg: 'Servicio actualizado correctamente', serv })
  } catch (error) {
    next(error)
  }
}

const getAllServices = async (req, res) => {
  const services = await Servicios.findAll({
    include: {
      model: Categorias,
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    },
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    }
  })

  res.status(200).json(services)
}

// get user by id specific

const getServiceId = async (req, res, next) => {
  const { id } = req.params
  const service = await Servicios.findAll({ where: { id }, include: [Categorias, Horarios] })
  res.status(200).json(service)
}

const getUserService = async (req, res) => {
  const { uidClient } = req.params
  const servicios = await Servicios.findAll({
    where: { usuarioUidClient: uidClient },
    include: {
      model: Categorias,
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    },
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    }
  })
  res.status(200).json(servicios)
}

const deleteService = async (req, res) => {
  const { id } = req.params
  const servicio = await Servicios.destroy({ where: { id } })
  servicio !== 1 ? res.send('No hay Servicios que coincidan') : res.send('Servicio borrado correctamente')
}

module.exports = {
  getAllServices,
  getServiceId,
  getUserService,
  updateService,
  deleteService,
  postService
}

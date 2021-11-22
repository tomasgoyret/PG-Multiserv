const { Favoritos, Usuarios, Servicios } = require("../db.js");
const { v4: uuidv4 } = require('uuid');

const postFav = async (req, res) => {

    const { uidClient, idService } = req.body;

    try {

        // Corroboro si el favorito existe en ese Usuario

        const usuario = await Usuarios.findOne({
            where: { uidClient: uidClient }, include: {
                model: Favoritos,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                through: {
                    attributes: []
                }
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });
        if (usuario.favoritos?.some(f => f.idService === idService)) {
            res.send('Favorito ya agregado')
        }

        //Sino, creo el Favorito para Usuario
        else {
            const servicio = await Servicios.findOne({ where: { id: idService } });
            const title = servicio.title;
            const newFav = await Favoritos.create({
                id: uuidv4(),
                idService,
                title
            });
            await newFav.addUsuarios(uidClient);
            res.send(`Se agrego favorito al usuario uid:${uidClient} como Favorito id: ${newFav.id} `)
        }
    }
    catch (error) {
        console.log(error)
    }
};

module.exports = postFav;
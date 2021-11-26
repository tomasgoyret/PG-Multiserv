const { Citas, Usuarios } = require("../db.js");


const getCitas = async (req, res) => { 
    
    try{   
        let citas = await Citas.findAll({
            include: {
                model: Usuarios,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                through: {
                    attributes: []
                }
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
        })
         res.send(citas)  
    } catch (error) {
        console.log(error)
    }
}


const getCitasId = async (req, res) => {
    const { uidClient } = req.params;
    try {        
        let citas = await Citas.findAll({
            include: {
                model: Usuarios,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                through: {
                    attributes: []
                },
                where: { uidClient }
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
        })
         res.send(citas)  
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getCitas,
    getCitasId
}

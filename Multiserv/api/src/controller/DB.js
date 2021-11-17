const { LlamadoUsers, DataServices, Users } = require('../Funciones/User');


const getDB = async(req, res) => {
    try{
        LlamadoUsers(Users);
        DataServices();
        res.send('Datos cargados al DB')
    }
    catch(err){console.error}
};

module.exports = getDB ;
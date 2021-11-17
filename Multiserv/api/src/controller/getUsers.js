const getUsers = async(req, res) => {
    try{
        LlamadoUsers(Users);
        res.send('Usuarios cargados al DB')
    }
    catch(err){console.error}
};


const getUserId = async(req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        const peticion= await auth.getUser(id);
        res.status(200).json(peticion)
    } catch (error) {
        res.status(400).json(error)
    }
};

//en proceso----->
const getUserEmail = async(req, res) => {
    const { email } = req.params;
    console.log(email);
    try {
        const peticion= await auth.getUserByEmail(email);
        res.status(200).json(peticion)
    } catch (error) {
        res.status(400).json(error)
    }
};


module.exports = {
    getUsers,
    getUserId, 
    getUserEmail
};
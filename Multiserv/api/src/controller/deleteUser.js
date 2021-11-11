const {db} = require("../db.js");

const deleteUser = async(req, res) => {
    try {
        const {id} = req.params;
        db.collection("usuarios").doc(id).delete()
        res.redirect("/")
    } catch(error) {
        console.log(error)
    }
}

module.exports = deleteUser;
//const { Servicios, Categorias, Usuarios } = require("../db.js");
const { mailPago, sendEmail } = require("../mails/mails");


const mailEstadoDePago = async (req, res, next) => {
    const { email, displayName, estadoDePago } = req.body;
    try {
        let plantilla = await mailPago(displayName,estadoDePago)
        await sendEmail(email,subject="Estado de tu pago",plantilla)
        res.send(`Se envío mail a ${displayName}. Email: ${email}, Estado de pago ${estadoDePago}`)
    } catch (error) {
        next("Algo pasó con el envío del correo",error)
    }
}

module.exports= mailEstadoDePago;
const nodemailer = require("nodemailer");
const cron = require("node-cron");
const { Citas,Usuarios } = require("../db")
const mail = {
  user: process.env.EMAIL,
  pass: process.env.PASSWORD_EMAIL,
};
var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  autentication: "yes",
  auth: {
    user: mail.user,
    pass: mail.pass,
  },
});

let notificaciones = async (req,res,next) =>{
  let hoy =new Date ()
    try {
        cron.schedule('* * * * *', async ()=>{ //debieramos dejarlo en tres astericos para quie envíe una vez al día
          console.log("se prendio el cron, se envía notificaciones cada minuto")
          let citas = await Citas.findAll({            
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
          })
          for(var i=0; i<citas.length; i++){
            let fecha = new Date (citas[i].dia)
            //console.log(fecha)
              if(fecha.getMonth()==hoy.getMonth()){
                //console.log("entra en la comparación de mes")
                if(1 === (fecha.getDate() - hoy.getDate())){
                  //console.log(citas[i].usuarioUidClient, "entra a la comparacion de dias")
                  let usuario = await Usuarios.findOne({ where: { uidClient : citas[i].usuarioUidClient }})
                  let Usermail = usuario.email
                  await transporter.sendMail({
                            from: `Multiserv <${mail.user}>`,
                            to: Usermail,
                            subject : "Se aproxima tu turno",
                            text: "",
                            html: `
                            <head>
                            </head>
                            <div id="email___content">
                                <h2>Hola ${citas[i].nameUser}</h2>
                                <p>Te recordamos que se aproxima tu turno!</p>
                                <p>Detalle de tu turno:</p>
                                <p>Servicio contratado: ${citas[i].title}</p>
                                <p>Día: ${citas[i].dia}</p>
                                <p>Hora: ${citas[i].hora.hora}</p>
                                <p>Lugar: ${citas[i].direccion} , ${citas[i].ciudad}</p>
                                <br>
                  
                                <a href="https://pg-multiserv.vercel.app/">Visite nuestra página!</a>
                            </div>`,
                })
              }
          }
        }
      })
      res.send("se activaron notificaciones")
    } catch (error){
        next(error)
    }

} 

module.exports={notificaciones};


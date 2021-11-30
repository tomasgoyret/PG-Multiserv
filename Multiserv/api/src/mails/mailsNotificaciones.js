const nodemailer = require("nodemailer");
const cron = require("node-cron");
const { Citas,Usuarios } = require("../db")
const mail = {
  user: process.env.EMAIL,
  pass: process.env.PASSWORD_EMAIL,
};
var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  autentication: "yes",
  auth: {
    user: mail.user,
    pass: mail.pass,
  },
});

let notificaciones = async () =>{
  let hoy = new Date ()
    try {
      console.log(hoy)
       cron.schedule('* 1 * * * ', async ()=>{ //debieramos dejarlo en tres astericos para quie envíe una vez al día // si le dejas 5 se envía cada minuto
          console.log("se prendio el cron,se revisa si hay turnos y se envía notificaciones cada 24 horas")
          let hoy = new Date ()
          console.log(hoy)
          let citas = await Citas.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
          });
          console.log(citas.length)
          if(citas.length>0) {
            console.log("si hay citas")
           for(var i=0; i<citas.length-1; i++){
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
          } else {
            console.log("no hay citas")
          }
      })
     console.log("se activaron notificaciones")
    } catch (error){
        next(error)
    }

}

module.exports={notificaciones};

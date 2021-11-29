const nodemailer = require("nodemailer");
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

const sendEmail = async (email, subject, html) => {
    try {
      await transporter.sendMail({
        from: `Multiserv <${mail.user}>`,
        to: email,
        subject,
        text: "",
        html,
      });
    } catch (error) {
      console.log("Algo no va bien con el email", error);
    }
  };


  const mailPago = (name, estadoDePago) => {
      if(estadoDePago==="approved" || estadoDePago==="Aprobado"){
          return `
          <head>
          </head>
          <div id="email___content">
              <h2>Hola ${name}</h2>
              <p>Queríamos avisarte que tu pago se completó exitosamente!</p>
              <a href="https://pg-multiserv.vercel.app/">Visite nuestra página!</a>
          </div>`;
      }
      if(estadoDePago==="rejected" || estadoDePago==="Rechazado"){
          return `
          <head>
          </head>
          <div id="email___content">
              <h2>Hola ${name}</h2>
              <p>Queríamos avisarte que tuvimos problemas con el pago!</p>
              <p>Por favor, contactate con nostros!</p>
              <a href="https://pg-multiserv.vercel.app/">Visite nuestra página!</a>
          </div>`;
      }
      if(estadoDePago==="in_process" || estadoDePago==="Pendiente"){
          return `
          <head>
          </head>
          <div id="email___content">
              <h2>Hola ${name}</h2>
              <p>Tu pago se está procesando! En cuando se realice, publicaremos tu servicio</p>
              <a href="https://pg-multiserv.vercel.app/">Visite nuestra página!</a>
          </div>`;
      }
  };

  const mailTurno = (name,dia,hora,direccion,ciudad,servicio)=>{
    return `
          <head>
          </head>
          <div id="email___content">
              <h2>Hola ${name}</h2>
              <p>Tu turno se agendó correctamente!</p>
              <p>Detalle de tu turno:</p>
              <p>Servicio contratado: ${servicio}</p>
              <p>Día: ${dia}</p>
              <p>Hora: ${hora}</p>
              <p>Lugar: ${direccion} , ${ciudad}</p>
              <br>

              <a href="https://pg-multiserv.vercel.app/">Visite nuestra página!</a>
          </div>`;
  }

  module.exports = {
    sendEmail,
    mailPago,
    mailTurno
  };
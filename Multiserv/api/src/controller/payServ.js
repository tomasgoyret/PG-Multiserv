          // SDK de Mercado Pago
const mercadopago = require ('mercadopago');
// Agrega credenciales
mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN,
});

const payService = {};

payService.pago = (req, res) => {
  const{id} = req.body;
    let preference = {
    items: [{
        title: "Publicación en Multiservicos",
        unit_price: 100,
        quantity: 1,
    }],
    back_urls: {
      success: "https://pg-multiserv.vercel.app/confirmServ",
      failure: "https://pg-multiserv.vercel.app/confirmServ",
      pending: "https://pg-multiserv.vercel.app/confirmServ",
    },
    auto_return: "approved",
    external_reference: id,
  };
  mercadopago.preferences
    .create(preference)
    .then(function (respuesta) {
      const redireccion = respuesta.body.init_point;
      console.log(redireccion);
      res.send(redireccion)
    })
    .catch(function (error) {
      error;
    });
};

module.exports = payService;
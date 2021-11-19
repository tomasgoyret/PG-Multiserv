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
        title: "Mi nuevo servicio en Multiservicos",
        unit_price: 100,
        quantity: 1,
    }],
    back_urls: {
      success: "https://http://localhost:3000/pago-confirm",
      failure: "https://http://localhost:3000/pago-confirm",
      pending: "https://http://localhost:3000/pago-confirm",
    },
    auto_return: "approved",
    external_reference: id,
  };
  mercadopago.preferences
    .create(preference)
    .then(function (respuesta) {
      const redireccion = respuesta.body.init_point;
      res.send(redireccion);
    })
    .catch(function (error) {
      error;
    });
};

module.exports = payService;
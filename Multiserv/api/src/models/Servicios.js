const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("servicios", {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nameUser: {
      type: DataTypes.STRING,
      allowNull: false
    },
    currency: {
      type: DataTypes.ENUM('USD', 'MXN', 'ARS', 'COP')
    },
    description: {
      type: DataTypes.STRING(1234),
      allowNull: false
    },
    max: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    min: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    estadoDePago: {
      type: DataTypes.ENUM('Pendiente', 'Aprobado', 'Rechazado'),
      defaultValue: 'Pendiente'
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    photos: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    // idAdress: {
    //   type: DataTypes.STRING,
    // },
  });
};

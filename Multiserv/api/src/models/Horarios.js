const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("horarios", {
    horarios: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: false,
    },
    dias: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    }
  });
};
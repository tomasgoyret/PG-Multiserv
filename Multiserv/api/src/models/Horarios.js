const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("horarios", {
    start: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    end: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    days: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
    },
  });
};
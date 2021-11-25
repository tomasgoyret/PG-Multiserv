const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("citas", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    dia: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    horario: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: false,
    },
    nameUser: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
};
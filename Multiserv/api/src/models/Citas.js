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
        type: DataTypes.STRING,
        allowNull: false,
    },
    horario: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nameUser: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    serviceId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },    
    nameProv: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
};
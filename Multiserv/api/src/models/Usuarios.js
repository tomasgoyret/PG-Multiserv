const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("usuarios", {
    uidClient: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    photoURL: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    provider: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    uidProvider: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    idAddress: {
      type: DataTypes.STRING,
      allowNull: false
    },
    disable: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  });
};
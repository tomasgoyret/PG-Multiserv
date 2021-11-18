const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("usuarios", {
    uidClient: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    photoURL: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phoneNumber: {
      type: DataTypes.STRING
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    provider: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    uidProvider: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    disabled: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  });
};
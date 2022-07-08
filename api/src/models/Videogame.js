const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Videogame', {
    id : {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },

    background_image :{
      type : DataTypes.TEXT,
    },
    
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    description_raw : {
      type: DataTypes.TEXT, 
      allowNull: false
    },

    released : {
      type: DataTypes.TEXT
    },

    rating : {
      type : DataTypes.FLOAT,
    },

    platforms : {
      type : DataTypes.ARRAY(DataTypes.JSONB),
      defaultValue : []
    },

    genres : {
      type : DataTypes.ARRAY(DataTypes.JSONB),
      defaultValue : []
    },

    storeInDb : {
      type : DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  });
};

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

//need to check password
class User extends Model {
  checkPassword(loginPass) {
    return bcrypt.compareSync(loginPass, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate {
      //   lens[3],
      // }
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserInput) => {
        newUserInput.password = await bcrypt.hash(newUserInput.password, 10);
        return newUserInput;
      },
      beforeUpdate: async (newUserInput) => {
        newUserInput.password = await bcrypt.hash(newUserInput.password, 10);
        return newUserInput;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;

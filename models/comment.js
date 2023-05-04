"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: "UserId", as: "user" });
      this.belongsTo(models.Photo, { foreignKey: "PhotoId", as: "photos" });
    }
  }
  Comment.init(
    {
      UserId: DataTypes.INTEGER,
      PhotoId: DataTypes.INTEGER,
      comment: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          msg: "Comment cannot be empty",
        },
      },
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};

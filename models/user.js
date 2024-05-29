module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    FirstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    LastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    Phone: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      }
    },
    Info: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Speciality: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    ProfilePhoto: {
      type: DataTypes.BLOB('long'),
      allowNull: true,
    }
  })

  return User;
};
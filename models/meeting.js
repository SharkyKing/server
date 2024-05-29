module.exports = (sequelize, DataTypes) => {
    const Meeting = sequelize.define("Meeting", {
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
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      MeetingDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      PersonID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      MeetingStateId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'MeetingStates', // Model name
            key: 'id',
        }
    }
    })

    Meeting.associate = (models) => {
      Meeting.belongsTo(models.MeetingState, {
          foreignKey: 'MeetingStateId',
          as: 'state'
      });
    };
  
    return Meeting;
  };
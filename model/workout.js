module.exports = function(sequelize, DataTypes) {

    var Workouts = sequelize.define("Workouts", {

        monday: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [1]
            }
        },
        tuesday: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [1]
            }
        },
        wednesday: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [1]
            }
        },
        thursday: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [1]
            }
        },
        friday: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [1]
            }
        },
        saturday: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [1]
            }
        },

        sunday: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [1]
            }
        }
      },
        {
      // We're saying that we want our Author to have Posts
      classMethods: {
        associate: function(models) {
          // An Author (foreignKey) is required or a Post can't be made
          Workouts.belongsTo(models.User, {
            foreignKey: {
              allowNull: false
            }
          });
        }
      }
    });

    return Workouts;
};
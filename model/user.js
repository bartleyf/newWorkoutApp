module.exports = function(sequelize, DataTypes) {

    var User = sequelize.define("User", {

        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        user_email: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [1]
          }
        },
        user_password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },

        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }

        },

        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }

        },


        user_gender: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        user_age: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        user_weight: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        fitness_goals: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
      },
        {
    // We're saying that we want our Author to have Posts
    classMethods: {
      associate: function(models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        User.belongsTo(models.Workouts, {
          onDelete: "cascade"
        });
      }
    }
  }
);
  
    return User;
}
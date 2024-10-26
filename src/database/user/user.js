
module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define(
        'user',
        {
            name : {
                type : DataTypes.STRING,
                allowNull: false,
            },

            email : {
                type : DataTypes.STRING,
                allowNull : false
            },

            password : {
                type : DataTypes.STRING,
                allowNull : false
            }
        },
    )

    user.associate = (models) => {
        user.hasMany(models.Lecture, { foreignKey: 'user_id' })
        user.hasMany(models.UserAnswer,{ foreignKey: 'user_id'})
        user.hasMany(models.Chatbot,{ foreignKey: 'user_id'})
        user.hasMany(models.LearningManagement,{ foreignKey: 'user_id'})
    }
    return user;
}
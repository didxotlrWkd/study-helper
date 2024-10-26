module.exports = (sequelize, DataTypes) => {
    const UserAnswer = sequelize.define(
        'UserAnswer',
        {
            text : {
                type : DataTypes.STRING,
                allowNull: false,
            },
            is_correct : {
                type : DataTypes.BOOLEAN,
                allowNull : false,
            }
        },
    )

    UserAnswer.associate = (models) => {
        UserAnswer.belongsTo(models.Quiz, { foreignKey: 'quiz_id' })
        UserAnswer.belongsTo(models.User, { foreignKey: 'user_id' })
    }
    return UserAnswer;
}
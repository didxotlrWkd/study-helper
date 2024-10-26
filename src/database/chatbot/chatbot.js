const { response } = require("express")

module.exports = (sequelize, DataTypes) => {
    const Chatbot = sequelize.define(
        'Chatbot',
        {
            question : {
                type : DataTypes.STRING,
                allowNull: false,
            },
            response : {
                type : DataTypes.STRING,
                allowNull : false,
            }
        },
    )

    Chatbot.associate = (models) => {
        Chatbot.belongsTo(models.Lecture, { foreignKey: 'lecture_id' })
        Chatbot.belongsTo(models.User, { foreignKey: 'user_id' })
    }
    return Chatbot;
}
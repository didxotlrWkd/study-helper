module.exports = (sequelize, DataTypes) => {
    const Answer = sequelize.define(
        'Answer',
        {
            text : {
                type : DataTypes.STRING,
                allowNull: false,
            },
        },
    )

    Answer.associate = (models) => {
        Answer.belongsTo(models.Quiz, { foreignKey: 'quiz_id' })
    }
    return Answer;
}
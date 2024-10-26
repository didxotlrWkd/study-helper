module.exports = (sequelize, DataTypes) => {
    const LearningManagement = sequelize.define(
        'LearningManagement',
        {
            correct_count : {
                type : DataTypes.STRING,
                allowNull: false,
            },
            total_count : {
                type : DataTypes.BOOLEAN,
                allowNull : false,
            }
        },
    )

    LearningManagement.associate = (models) => {
        LearningManagement.belongsTo(models.Lecture, { foreignKey: 'lecture_id' })
        LearningManagement.belongsTo(models.User, { foreignKey: 'user_id' })
    }
    return LearningManagement;
}
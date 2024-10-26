
module.exports = (sequelize, DataTypes) => {
    const Summary = sequelize.define(
        'Summary',
        {
            content_url : {
                type : DataTypes.STRING,
                allowNull: false,
            },
        },
    )

    Summary.associate = (models) => {
        Summary.belongsTo(models.Lecture, { foreignKey: 'lecture_id' })
    }
    return Summary;
}
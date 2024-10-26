
module.exports = (sequelize, DataTypes) => {
    const Recording = sequelize.define(
        'Recording',
        {
            recording_url : {
                type : DataTypes.STRING,
                allowNull: false,
            },
        },
    )

    Recording.associate = (models) => {
        Recording.belongsTo(models.Lecture, { foreignKey: 'lecture_id' })
    }
    return Recording;
}
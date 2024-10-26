
module.exports = (sequelize, DataTypes) => {
    const Lecture = sequelize.define(
        'Lecture',
        {
            title : {
                type : DataTypes.STRING,
                allowNull: false,
            },

            content_url : {
                type : DataTypes.STRING,
                allowNull : false
            }
        },
    )

    Lecture.associate = (models) => {
        Lecture.belongsTo(models.User, { foreignKey: 'user_id' })
        Lecture.hasMany(models.Chatbot,{ foreignKey: 'lecture_id'})
        Lecture.hasMany(models.Recording,{ foreignKey: 'lecture_id'})
        Lecture.hasMany(models.Quiz,{ foreignKey: 'lecture_id'})
        Lecture.hasMany(models.UserAnswer,{ foreignKey: 'lecture_id'})
    }
    return Lecture;
}
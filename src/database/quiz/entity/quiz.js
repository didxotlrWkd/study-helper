module.exports = (sequelize, DataTypes) => {
    const Quiz = sequelize.define(
        'Quiz',
        {
            text : {
                type : DataTypes.STRING,
                allowNull: false,
            },
            type : {
                type : DataTypes.STRING,
                allowNull : false
            },

            option1 : {
                type : DataTypes.STRING,
            },

            option2 : {
                type : DataTypes.STRING,
            },
            
            option3 : {
                type : DataTypes.STRING,
            },
            
            option4 : {
                type : DataTypes.STRING,
            },

            is_solved : {
                type : DataTypes.BOOLEAN,
                default: false
            }
        },
    )

    Quiz.associate = (models) => {
        Quiz.belongsTo(models.Lecture, { foreignKey: 'lecture_id' })
    }
    return Quiz;
}
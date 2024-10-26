require('dotenv').config();
const Sequelize = require('sequelize');
const db = {};

const config = {
    username: process.env.DB_USER,
    password: process.env.DB_PASW,
    database: process.env.DB_BASE,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    timezone: '+09:00', // 한국 시간 "asia/seoul"
    // dialectOptions: {
    //     charset: 'utf8mb4',
    //     dateStrings: true,
    //     typeCast: true,
    // },
    define: {
        underscored: false,
        freezeTableName: false,
        charset: 'utf8',
        collate: "utf8_general_ci",
        timestamps: true,
        paranoid: false,
        createdAt: true,
        updatedAt: false,
    },
};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.User = require('./user/user')(sequelize, Sequelize);

db.Chatbot = require('./chatbot/chatbot')(sequelize, Sequelize);

db.LearningManagement = require('./learningManagement/learningManagement')(sequelize, Sequelize);

db.Lecture = require('./lecture/entity/lecture')(sequelize, Sequelize);
db.Recording = require('./lecture/entity/recording')(sequelize, Sequelize);
db.Summary = require('./lecture/entity/summary')(sequelize, Sequelize);

db.Quiz = require('./quiz/entity/quiz')(sequelize, Sequelize);
db.Answer = require('./quiz/entity/answer')(sequelize, Sequelize);
db.UserAnswer = require('./quiz/entity/userAnswer')(sequelize, Sequelize);


Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

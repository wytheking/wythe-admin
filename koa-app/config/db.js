// 创建mysql的数据库链接

const Sequelize = require('sequelize')
/*
* dbname -> 数据库名
* dbusername -> 数据库用户名
* passoword -> 数据库密码
*/
const sequelize = new Sequelize('wythe_admin', 'root', '12345678', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,
  dialectOptions: {
    // 字符集
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
    supportBigNumbers: true,
    bigNumberStrings: true
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  timezone: '+08:00' // 东八时区
})

module.exports = {
  Sequelize,
  sequelize
}

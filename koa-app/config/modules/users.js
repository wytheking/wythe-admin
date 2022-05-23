// 引入mysql的配置文件
const db = require('../db')

// 引入sequelize对象
const Sequelize = require('sequelize')
const sequelize = db.sequelize

// 引入数据表模型
// const Article = Sequelize.import('../schema/article') // 旧方式已不能用
const Users = require('../schema/users')(sequelize, Sequelize.DataTypes) // 新版本写法
Users.sync({ force: false }) // 自动创建表

class UsersModel {
  /**
   * 创建用户
   * @param data
   * @returns {Promise<*>}
   */
  static async createUser (data) {
    return await Users.create({
      userName: data.userName, // 用户名
      password: data.password // 密码
    })
  }

  /**
   * 查询用户
   * @param userName 用户名
   * @returns {Promise<Model>}
   */
  static async getUser (userName) {
    return await Users.findOne({
      where: {
        userName
      }
    })
  }

  /**
   * 查询用户信息
   * @param userId 用户ID
   * @returns {Promise<Model>}
   */
  static async getUserInfo (userId) {
    return await Users.findOne({
      where: {
        userId
      }
    })
  }
}

module.exports = UsersModel

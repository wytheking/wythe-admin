import ArticleCreaterRouter from './modules/ArticleCreate'
import ArticleRouter from './modules/Article'
import PermissionListRouter from './modules/PermissionList'
import RoleListRouter from './modules/RoleList'
import UserManageRouter from './modules/UserManage'

/**
 * 私有路由表
 */
export const privateRoutes = [
  RoleListRouter,
  UserManageRouter,
  PermissionListRouter,
  ArticleCreaterRouter,
  ArticleRouter
]

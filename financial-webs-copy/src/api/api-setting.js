import xhr from './axiosConfig';
import {
  dialog
} from "../assets/js/dialog";

/**
 * 系统用户管理相关接口
 * @type {{getUserAll(): *}}
 */
export const user = {
  /**
   * 获取用户列表
   * @returns {Promise<T | never>}
   */
  getUserAll(params) {
    return xhr.request({
      url: 'user/selectUserAll',
      method: 'post',
      data: params
    }).catch(err => {
      dialog.error('获取用户列表失败')
    })
  },
  /**
   * 新增用户
   * @returns {Promise<T | never>}
   */
  addUser(params) {
    return xhr.request({
      url: 'user/saveUser',
      method: 'post',
      data: params
    }).catch(err => {
      dialog.error('新增用户失败')
    })
  },
  /**
   * 查看用户详情
   * @returns {Promise<T | never>}
   */
  selectUserById(params) {
    return xhr.request({
      url: 'user/selectUserById',
      method: 'post',
      data: params
    }).catch(err => {
      dialog.error('查看用户详情失败')
    })
  },
  /**
   * 更改用户信息
   * @returns {Promise<T | never>}
   */
  updateUser(params) {
    return xhr.request({
      url: 'user/updateUser',
      method: 'post',
      data: params
    }).catch(err => {
      dialog.error('更改用户信息失败')
    })
  },
  /**
   * 更改用户启用和禁用信息
   * @returns {Promise<T | never>}
   */
  updateUserStatus(params) {
    return xhr.request({
      url: 'user/updateUserStatus',
      method: 'post',
      data: params
    }).catch(err => {
      dialog.error('更改用户信息失败')
    })
  },
  /**
   * 删除用户
   * @returns {Promise<T | never>}
   */
  deleteUser(params) {
    return xhr.request({
      url: 'user/deleteUser',
      method: 'post',
      data: params
    }).catch(err => {
      dialog.error('删除用户失败')
    })
  },
  /**
   * 查询新增用户时角色下拉选择
   * @returns {Promise<T | never>}
   */
  selectDropDown(params) {
    return xhr.request({
      url: 'role/selectDropDown',
      method: 'post',
      data: params
    }).catch(err => {
      dialog.error('查询角色失败')
    })
  },
  /**
   * 重置用户密码
   * @returns {Promise<T | never>}
   */
  resetPassword(params) {
    return xhr.request({
      url: 'user/resetPassword',
      method: 'post',
      data: params
    }).catch(err => {
      dialog.error('重置用户密码失败')
    })
  }
}

/**
 * 系统角色管理相关接口
 * @type {{getRoleAll(): *}}
 */
export const role = {
  /**
   * 查询角色
   * @returns {Promise<T | never>}
   */
  selectRoleAll(params) {
    return xhr.request({
      url: 'role/selectRoleAll',
      method: 'post',
      data: params
    }).catch(err => {
      dialog.error('查询角色信息失败')
    })
  },
  /**
   * 保存角色
   * @returns {Promise<T | never>}
   */
  saveRole(params) {
    return xhr.request({
      url: 'role/saveRole',
      method: 'post',
      data: params
    }).catch(err => {
      dialog.error('保存角色失败')
    })
  },
  /**
   * 更改角色状态
   * @returns {Promise<T | never>}
   */
  updateRoleStatus(params) {
    return xhr.request({
      url: 'role/updateRoleStatus',
      method: 'post',
      data: params
    }).catch(err => {
      dialog.error('更改角色状态失败')
    })
  },
  /**
   * 删除角色
   * @returns {Promise<T | never>}
   */
  deleteRole(params) {
    return xhr.request({
      url: 'role/deleteRole',
      method: 'post',
      data: params
    }).catch(err => {
      dialog.error('删除角色失败')
    })
  },
  /**
   * 查询角色菜单
   * @returns {Promise<T | never>}
   */
  selectRoleMenuAll(params) {
    return xhr.request({
      url: 'menu/selectRoleMenuAll',
      method: 'post',
      data: params
    }).catch(err => {
      dialog.error('查询角色菜单失败')
    })
  },
}

/**
 * 系统日志相关接口
 * @type {{getRoleAll(): *}}
 */
export const log = {
  /**
   * 查询操作日志列表
   * @returns {Promise<T | never>}
   */
  selectLogAll(params) {
    return xhr.request({
      url: 'log/selectLogAll',
      method: 'post',
      data: params
    }).catch(err => {
      dialog.error('获取操作日志列表失败')
    })
  },
}

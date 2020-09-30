import xhr from './axiosConfig';
import {
  dialog
} from "../assets/js/dialog";

/**
 *  郫都区后台接口
 * 
 */


export const camera = {
  /**
   * 获取相机列表
   * @returns {Promise<T | never>}
   */
  findCameraList(params) {
    return xhr.request({
      url: 'pd/findCameraList',
      method: 'post',
      data: params
    }).catch(err => {
      dialog.error('获取相机列表失败')
    })
  },

// 重点人员管控模块请求
  // 获取重点人员布控列表
  emphasisList(params) {
    return xhr.request({
      url: `bk/member/pageList?pageIndex=${params.pageNum}&pageSize=${params.pageSize}`,
      // method: 'post',
      method: 'get',
      // data: params
    }).catch(err => {
      dialog.error('获取人员列表失败')
    })
  },
  // 标签请求
  emphasisLabel() {
    return xhr.request({
      url: 'bk/bkrepo/category/list',
      // method: 'post',
      method: 'get',
      // data: params
    }).catch(err => {
      dialog.error('获取标签列表失败')
    })
  },

// 新增人员请求
emphasisAdduser(params){
  return xhr.request({
    url: 'bk/member/create',
    method: 'post',
    data: params
  }).catch(err => {
    dialog.error('新增人员失败')
  })
  },
  
  // 修改用户
  emphasisUpdateUser(params){
    return xhr.request({
      url: 'bk/member/update',
      method: 'post',
      data: params
    }).catch(err => {
      dialog.error('修改信息失败')
    })
  },

  // 删除人员
  emphasisDeleteUser(params){
    return xhr.request({
      url: `bk/member/delete?id=${params.id}`,
      // method: 'post',
      method: 'get',
      // data: params
    }).catch(err => {
      dialog.error('删除人员失败')
    })
  },
  
  // 点击标签按id查找
  showList(params){
    return xhr.request({
      url: `bk/member/?id=${params.id}`,
      // method: 'post',
      method: 'get',
      // data: params
    }).catch(err => {
      dialog.error('搜寻人员失败')
    })
  },

}

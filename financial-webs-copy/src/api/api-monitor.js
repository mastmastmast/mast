import xhr from './axiosConfig';
import {
  dialog
} from "../assets/js/dialog";

/**
 *  郫都区后台接口
 *   布控库
 */
export const camera = {
      // 布控库列表 请求
  monitorList(params) {
    return xhr.request({
      url: `bk/bkrepo/pageList?pageIndex=${params.pageNum}&pageSize=${params.pageSize}`,
      // method: 'post',
      method: 'get',
      // data: params
    }).catch(err => {
      dialog.error('获取布控库列表失败')
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
  // 创建布控库
   monitorAdduser(params){
    return xhr.request({
      url: 'bk/bkrepo/create',
      method: 'post',
      // method: 'get',
      data: params
    }).catch(err => {
      dialog.error('创建布控库失败')
    })
  },

   // 布控库修改请求
   monitorUpdateUser(params){
    return xhr.request({
      url: "bk/bkrepo/update",
      method: 'post',
      // method: 'get',
      data: params
    }).catch(err => {
      dialog.error('修改失败')
    })
  },

  // 布控库删除请求
  monitorDeleteUser(params){
    return xhr.request({
      url: `bk/bkrepo/delete?id=${params.id}`,
      // method: 'post',
      method: 'get',
      // data: params
    }).catch(err => {
      dialog.error('删除失败')
    })
  },

  // 详情操作的搜索 失去焦点
  xqSearch(params){
    return xhr.request({
      url: "",
      method: 'post',
      // method: 'get',
      data: params
    }).catch(err => {
      dialog.error('搜索失败')
    })
  },

  // 详情操作 获取对应库下面的人员列表
  xqList(params){
    return xhr.request({
      url: "",
      method: 'post',
      // method: 'get',
      data: params
    }).catch(err => {
      dialog.error('搜索失败')
    })
  },




}
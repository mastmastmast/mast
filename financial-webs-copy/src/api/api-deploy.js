import xhr from './axiosConfig';
import {
  dialog
} from "../assets/js/dialog";

/**
 *  郫都区后台接口
 * 
 */

export const camera = {
     // 布控任务列表 请求
     deployList(params) {
        return xhr.request({
          url: `bk/bktask/pageList?pageIndex=${params.pageNum}&pageSize=${params.pageSize}`,
          // method: 'post',
          method: 'get',
          // data: params
        }).catch(err => {
          dialog.error('获取布控任务列表失败')
        })
      },
      // 布控库名称列表请求
      deployListAll() {
        return xhr.request({
          url: 'bk/bkrepo/listAll',
          // method: 'post',
          method: 'get',
          // data: params
        }).catch(err => {
          dialog.error('获取布控库名称列表失败')
        })
      },
      // 新建布控任务请求
      deployAdd(params) {
        return xhr.request({
          url: 'bk/bktask/create',
          method: 'post',
          // method: 'get',
          data: params
        }).catch(err => {
          dialog.error('添加任务失败')
        })
      },
    //   修改
      deployUpdate(params){
        return xhr.request({
            url: 'bk/bktask/create',
            method: 'post',
            // method: 'get',
            data: params
          }).catch(err => {
            dialog.error('修改任务失败')
          })
      },
      // 删除布控库请求
      deleteUser(params) {
        return xhr.request({
          url: `bk/bktask/delete?id=${params.id}`,
        //   method: 'post',
          method: 'get',
          // data: params
        }).catch(err => {
          dialog.error('删除任务失败')
        })
      },

      // 获取所有相机列表
      cameraAll(params){
        return xhr.request({
          url: `bk/bktask/selectCamera?fun=1&pageIndex=${params.pageNum}&pageSize=${params.pageSize}`,
        //   method: 'post',
          method: 'get',
          // data: params
        }).catch(err => {
          dialog.error('获取相机列表失败')
        })
      },

      // 开启布控状态请求
      updateUserStatus(params){
        return xhr.request({
          url: `bk/bktask/start?id=${params.id}`,
        //   method: 'post',
          method: 'get',
          // data: params
        }).catch(err => {
          dialog.error('更改状态失败')
        })
      },

      // 关闭布控状态请求
      updateUserStop(params){
        return xhr.request({
          url: `bk/bktask/stop?id=${params.id}`,
        //   method: 'post',
          method: 'get',
          // data: params
        }).catch(err => {
          dialog.error('更改状态失败')
        })
      },
}
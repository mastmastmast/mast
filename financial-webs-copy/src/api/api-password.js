import xhr from './axiosConfig';
import {dialog} from "../assets/js/dialog";

/**
 *登录人员密码操作接口
 * @type
 * */
export const handlePassword = {
  // 修改密码
  updatePwd(params) {
    return xhr.request({
      url: 'updatePwd',
      method: 'post',
      data: params
    }).catch(err => {
      dialog.error('密码修改失败')
    });
  }

};
/**
 * 对话框相关方法
 * @author 唐明芳
 */
import {Message} from 'element-ui';

export const dialog = {
    /**
     * 错误提示
     * @param msg 提示信息
     * @author 唐明芳
     */
    error: function (msg) {

        Message.error({
            showClose: true,
            message: msg || '出错了！',
            type: 'error',
            closeOnClickModal: false
        });

    },
    /**
     * 错误提示
     * @param vm vue实例
     * @param msg 提示信息
     * @param confirmCallback 确认回调
     * @param cancelCallback 取消回调
     * @author 唐明芳
     */
    error2: function (vm, msg, confirmCallback, cancelCallback) {
        vm.$confirm(msg, '系统提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'error',
            closeOnClickModal: false,
            cancelButtonClass: 'btn cancel',
            confirmButtonClass: 'btn submit'
        }).then(function () {
            if (confirmCallback) {
                confirmCallback();
            }
        }).catch(function () {
            if (cancelCallback) {
                cancelCallback();
            }
        });
    },
    /**
     *操作成功提示
     * @param msg 提示信息
     * @author 唐明芳
     */
    success: function (msg) {

        Message.success({
            showClose: true,
            message: msg || '操作成功',
            type: 'success',
            closeOnClickModal: false
        });
    },
    /**
     * 成功提示框
     * @param vm vue实例
     * @param msg 提示信息
     * @param confirmCallback 确认回调
     * @param cancelCallback 取消回调
     * @author 唐明芳
     */
    success2: function (vm, msg, confirmCallback, cancelCallback) {
        vm.$confirm(msg, '系统提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'success',
            closeOnClickModal: false,
            cancelButtonClass: 'btn cancel',
            confirmButtonClass: 'btn submit'
        }).then(function () {
            if (confirmCallback) {
                confirmCallback();
            }
        }).catch(function () {
            if (cancelCallback) {
                cancelCallback();
            }
        });
    },
    /**
     *警告提示
     * @param msg 提示信息
     * @author 唐明芳
     */
    warning: function (msg) {

        Message.warning({
            showClose: true,
            message: msg || '系统警告',
            type: 'warning',
            closeOnClickModal: false
        });
    },
    /**
     * 警告提示框
     * @param vm vue实例
     * @param msg 提示信息
     * @param confirmCallback 确认回调
     * @param cancelCallback 取消回调
     * @author 唐明芳
     */
    warning2: function (vm, msg, confirmCallback, cancelCallback) {
        vm.$confirm(msg, '系统提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            closeOnClickModal: false,
            cancelButtonClass: 'btn cancel',
            confirmButtonClass: 'btn submit'
        }).then(function () {
            if (confirmCallback) {
                confirmCallback();
            }
        }).catch(function () {
            if (cancelCallback) {
                cancelCallback();
            }
        });
    },
    /**
     *提示
     * @param msg 提示信息
     * @author 唐明芳
     */
    info: function (msg) {

        Message({
            showClose: true,
            message: msg || '系统提示',
            closeOnClickModal: false
        });
    },
    /**
     * 提示信息框
     * @param vm vue实例
     * @param msg 提示信息
     * @param confirmCallback 确认回调
     * @param cancelCallback 取消回调
     * @author 唐明芳
     */
    info2: function (vm, msg, confirmCallback, cancelCallback) {
        vm.$confirm(msg, '系统提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'info',
            closeOnClickModal: false,
            cancelButtonClass: 'btn cancel',
            confirmButtonClass: 'btn submit'
        }).then(function () {
            if (confirmCallback) {
                confirmCallback();
            }
        }).catch(function () {
            if (cancelCallback) {
                cancelCallback();
            }
        });
    },
    /**
     * 确认提示框
     * @param vm vue实例
     * @param msg 提示信息
     * @param confirmCallback 确认回调
     * @param cancelCallback 取消回调
     * @author 唐明芳
     */
    confirm2: function (vm, msg, confirmCallback, cancelCallback) {
        vm.$confirm(msg, '系统提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            closeOnClickModal: false,
            cancelButtonClass: 'btn cancel',
            confirmButtonClass: 'btn submit'
        }).then(function () {
            confirmCallback();
        }).catch(function () {
            if (cancelCallback) {
                cancelCallback();
            }
        });
    },
    /**
     * 确认提示框
     * @param vm vue实例
     * @param msg 提示信息
     * @param confirmCallback 确认回调
     * @param cancelCallback 取消回调
     * @author 唐明芳
     */
    confirm: function (vm, msg, confirmCallback, cancelCallback) {
        let msgEl = '<div style="line-height:28px"><i class="yc-icon yc-icon-question" style="color:#50c592;font-size:24px;vertical-align: middle"></i><span class="ml25">' + msg + '</span></div>';
        vm.$alert(msgEl, '系统提示', {
            dangerouslyUseHTMLString: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            showCancelButton: true,
            closeOnClickModal: false,
            cancelButtonClass: 'btn cancel',
            confirmButtonClass: 'btn submit'
        }).then(function () {
            confirmCallback();
        }).catch(function () {
            if (cancelCallback) {
                cancelCallback();
            }
        });
    }
};

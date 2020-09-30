import Vue from 'vue';

export const arrayFunc = {
  /**
   *判断一个数组是否为空
   * @returns {boolean}
   */
  isEmpty(arr) {
    return !(arr !== undefined && arr !== null && arr.length > 0);
  },
  /**
   * 判断一个数组中是否包含指定的对象的唯一标识属性
   * @param array 数组
   * @param target 目标对象
   * @param id 唯一标识
   */
  contains(array, target, id) {
    if (!array || !target) {
      console.error('数组和目标对象不能为空或者underfined');
    } else {
      return array.filter((item) => {
        return item[id] === target[id]
      }).length > 0;
    }
  }

};

/**
 * 验证密码
 * @param rule
 * @param value
 * @param callback
 * @returns {*}
 */
export function checkPwd(rule, value, callback) {
  if ($.trim(value) === '') {
    return callback(new Error('新密码不能为空'));
  } else {
    let reg = /^[a-zA-Z0-9]{6,12}$/;
    if (reg.test(value)) {
      callback();
    } else {
      callback(new Error('密码为6-12位数字与英文组合'));
    }
  }
}

/**
 * 获取一个数组的最大值与最小值(用于雷达图的展示)
 * @param arr
 * @returns {*}
 */
export function getMinAndMax(arr) {
  let tempArr = [...arr];
  if (tempArr !== null && tempArr.length > 0) {
    let length = tempArr.length;
    tempArr = tempArr.sort((a, b) => {
      a = a === '' ? 0 : a;
      b = b === '' ? 0 : b;
      return parseFloat(a) - parseFloat(b);
    });
    let max = parseFloat(tempArr[length - 1]);
    let min = parseFloat(tempArr[0]);
    max += max * 0.1;
    if (max === 0 && min === 0) {
      max = 100;
    }
    return {min: min, max: max};
  } else {
    return {min: 0, max: 10};
  }
}

export function redirectToLogin() {
  setTimeout(() => {
    let location = window.location;
    let protocol = location.protocol;
    let host = location.host;
    window.location.href = protocol + '//' + host + '/login.html#/login'
  }, 2000);
}

/**
 * loading效果相关操作
 * @type {{addLoading(*=): *, removeLoading(*): void}}
 */
export const loading = {
  /**
   * 给dom元素添加loading效果
   * @param el
   */
  addLoading(el) {
    let id = 'loading_' + new Date().getTime();
    let child = $('<div class="loading" id="' + id + '"><i class="yc-icon yc-icon-loading"></i></div>');
    $(el).append(child);
    return id;
  },
  /**
   * 移除loading效果
   * @param loadingId
   */
  removeLoading(loadingId) {
    $('#' + loadingId).remove();
  },
  /**
   * 显示loading效果
   * @param loadingId
   */
  showLoading(loadingId) {
    $('#' + loadingId).show();
  },
  /**
   * 隐藏loading效果
   * @param loadingId
   */
  hideLoading(loadingId) {
    $('#' + loadingId).hide();
  }
};

export default {
  install(vm, options) {
    Vue.prototype.gutter = 20;
    /**
     * 是否有指定的权限
     * @param code 权限对应的编码
     * @returns {*|*|void}
     */
    Vue.prototype.hasAuthority = function (code) {
      let authorities = JSON.parse(sessionStorage.getItem('authorities'));
      return arrayFunc.contains(authorities, {code: code}, 'code');
    }
  }
};

/**
 * 指指定jquery对象添加水印
 * @param $elementArr
 */
export function addWaterMark($elementArr) {
  $elementArr.each((index, item) => {
    let x = Math.random() * 100 + '%';
    let y = Math.random() * 100 + '%';
    $(item).css({backgroundPosition: x + '   ' + y});
  });
}


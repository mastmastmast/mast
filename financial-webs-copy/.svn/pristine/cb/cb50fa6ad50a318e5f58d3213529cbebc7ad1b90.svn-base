define(function(require, exports, module) {
  var pdf = require("pdf");
  var token = pdf.getQueryString('token');
  $.ajaxSetup({
    timeout: 30000,
    dataType: 'json',
    method: 'post',
    headers: {
      'token': token
    },
    contentType: 'application/json'
  });
  module.exports=function (options) {
    this.success = function (data) {
    };
    this.done=false;
    this.ajax = function () {
      var params = options.data;
      var url = options.url;
      this.success = options.success;
      var _this = this;
      $.ajax({
        url: '/financial/' + url,
        data: JSON.stringify(params),
        method:options.method || 'post' ,
        success: function (res) {
          var code = res.code;
          if (res.code === '300005' || res.code === '300006') {
            console.log('登录失效，请重新登录下载报告');
          } else if (code === '200') {
            _this.success(res);
            _this.done=true;
          } else {
            console.log('接口出错',url);
            console.error(res.message);
            _this.done=true;
          }
        }
      });
    };
    this.ajax();
  };
});




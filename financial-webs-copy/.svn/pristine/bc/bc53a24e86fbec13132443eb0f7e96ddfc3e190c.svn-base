define(function (require, exports, module) {
  var pdf = require("pdf");
  var token = pdf.getQueryString('token');
  var api = require('api');
  $.ajaxSetup({
    timeout: 30000,
    dataType: 'json',
    method: 'post',
    headers: {
      'token': token
    },
    contentType: 'application/json'
  });
  module.exports = function (optionsArr,done) {
    this.done = done;
    var _this = this;
    var apis = [];
    if (optionsArr !== null && optionsArr.length > 0) {
      optionsArr.forEach(function (item, index) {
        apis.push(new api({
          url: item.url,
          data: item.data,
          success: function (res) {
            item.success(res);
          }
        }));
      });
      var count = 0;
      var timeOut=3000;
      setTimeout(function(){getStatus()},100);
      function getStatus() {
        var flag = true;
        apis.forEach(function (item, index) {
          if (!item.done) {
            flag = false;
          }
        });
        count++;
        if (!flag) {
          if (count < timeOut) {
            setTimeout(function () {
              getStatus()
            }, 10);

          }
        } else {
          _this.done();
        }
      }
    }
  };
});




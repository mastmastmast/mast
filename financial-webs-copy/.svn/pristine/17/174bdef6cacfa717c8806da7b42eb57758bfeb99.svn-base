define(function (require, exports, module) {
  var template = require("art-template");
  var api = require("api");
  var $ = require("jquery");
  var pdf = require("pdf");
  //导出模块内容
  module.exports = {
    load: function () {
      this.getData();
    },
    getData(){
      var list = {
        name: "July",
        gender: 18,
        sex: 'female'
      };
      document.getElementById("exerList").innerHTML = template("list",list);
    }
  }
})
/**
 * 该模块被废弃，数据放到经营行为中展示
 */
define(function (require, exports, module) {
  var api2 = require('api2');
  var $ = require('jquery');
  var pdf = require('pdf');
  var template = require('art-template');
  var data = {
    //融资信息
    financingList: [],
    //公开招聘信息
    recruitmentList: []
  };
  module.exports = {
    load: function () {
      this.getInfo(pdf.companyName)
    },
    /**
     * 融资信息
     * @param companyName 公司名称
     */
    getInfo: function (companyName) {
      new api2([
        {
          url: 'financingInfo',
          data: {
            enName: companyName,
            pageSize: pdf.pageSize,
            pageNum: 1
          },
          success: function (res) {
            data.financingList = res.data.listData;
          }
        },
        {
          url: 'enterpriseRecruitmentInfo',
          data: {
            enName: companyName,
            pageSize: pdf.pageSize,
            pageNum: 1
          },
          success: function (res) {
            data.recruitmentList = res.data.listData;
          }
        }
      ], function () {
        $('#internet-behavior-info').html(template('internet-behavior-info-tp', data));
        pdf.addWaterMark($('.watermark'));
      });
    }
  }
});
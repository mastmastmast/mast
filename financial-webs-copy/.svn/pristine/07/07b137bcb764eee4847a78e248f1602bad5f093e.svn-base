define(function (require, exports, module) {
  var template = require('art-template');
  var api = require('api')
  var api2 = require('api2')
  var $ = require('jquery')
  var pdf = require('pdf');
  var data = {
    markBaseInfo: {},
    shareholderInfo: [],
    keyPerson: [],
    branchInfo: [],
    changeRecord: []
  };
  //  导出模块内容
  module.exports = {
    load: function () {
      this.getBaseInfo(pdf.companyName)
    },
    getBaseInfo: function (companyName) {
      var that = this
      new api2([{
        url: 'enterpriseInfo/selectMarketBaseInfo',
        data: {
          companyName: companyName
        },
        success: function (res) {
          data.markBaseInfo = res.data;
          // console.log(data.markBaseInfo);
        }
      }, {
        url: 'enterpriseInfo/selectShareholderInformation',
        data: {
          companyName: companyName,
          pageNum: 1,
          pageSize: pdf.pageSize
        },
        success: function (res) {
          data.shareholderInfo = res.data.listData;
          // console.log(data.shareholderInfo)
        }
      }, {
        url: 'enterpriseInfo/selectEntEmployees',
        data: {
          companyName: companyName,
          pageNum: 1,
          pageSize: pdf.pageSize
        },
        success: function (res) {
          data.keyPerson = res.data.listData;
        }
      }, {
        url: 'enterpriseInfo/selectAffiliates',
        data: {
          companyName: companyName,
          pageNum: 1,
          pageSize: pdf.pageSize
        },
        success: function (res) {
          data.branchInfo = res.data.listData;
        }
      }, {
        url: 'enterpriseInfo/selectChangeRecord',
        data: {
          companyName: companyName,
          pageNum: 1,
          pageSize: pdf.pageSize
        },
        success: function (res) {
          data.changeRecord = pdf.processTableData(res.data.listData);
        }
      }], function () {
        $('#report-base-info-tp').html(template('report-base-info-tp2', data));
        that.compare();
        pdf.addWaterMark($('.watermark'));
      });
    },
    compare: function () {
      $.each($('#change-info-table tbody tr'), function (index, item) {
        var tr = $(item);
        // console.log(tr)
        pdf.MyCompare(tr.find('.change-before')[0], tr.find('.change-after')[0]);
      })
    }
  }
});

define(function (require, exports, module) {
  var template = require('art-template');
  var api = require('api')
  var api2 = require('api2')
  var $ = require('jquery')
  var pdf = require('pdf');
  var data = {
    baseInfo: {},
    titleClass: ''
  };
  var titleConfig = [
    {
      name: '成长贷',
      class: 'czd'
    },
    {
      name: '期权贷',
      class: 'qqd'
    },
    {
      name: '新创贷',
      class: 'xcd'
    },
    {
      name: '壮大贷',
      class: 'zdd'
    },
    {
      name: '园保贷',
      class: 'ybd'
    }
  ];
  //  导出模块内容
  module.exports = {
    load: function () {
      this.getBaseInfo(pdf.companyName);
      var loanName = pdf.loanName;
      if (loanName) {
        var target = titleConfig.filter(function (item) {
          return item.name === loanName;
        })[0];
        if (target) {
          data.titleClass = target.class;
        }
      }

    },
    getBaseInfo: function (companyName) {
      new api2([{
        url: 'fcPdfInfo/fcProductPdfNumInfo',
        data: {
          companyName: companyName,
          productName: pdf.loanName
        },
        success: function (res) {
          data.baseInfo = res.data;
        }
      }], function () {
        document.getElementById('report-header-tp').innerHTML = template('header-tp', data);
      });

    },
  }
});


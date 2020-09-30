define(function(require, exports, module) {
  var template=require('art-template');
  var pdf = require('pdf');
  var $ = require('jquery');
  var api2 = require('api2');
  var data = {
    administrativeInfo: {},
    overdueInfo: {},
    abnormalInfo: {},
    illegalInfo: {},
    executedPersonInfo: {},
    executedInfo: {},
    majorTaxInfo: {},
    chattelMortgageInfo: {},
    equityPledgedInfo: {},
    equityFreezeInfo: {},
  };
  //  导出模块内容
  module.exports ={
    load: function () {
      this.getBaseInfo(pdf);
    },
    getBaseInfo: function (pdf) {
      new api2([{
        url: 'administrative',   //  经营风险--行政处罚
        data: {
          enName: pdf.companyName,
          pageNum: 1,
          pageSize: pdf.pageSize,
        },
        success: function (res) {
          data.administrativeInfo = res.data.listData;
        }
      },
      {
        url: 'abnormalInfo',   //  经营风险--经营异常
        data: {
          enName: pdf.companyName,
          pageNum: 1,
          pageSize: pdf.pageSize,
        },
        success: function (res) {
          data.abnormalInfo = res.data.listData;
        }
      },
      {
        url: 'executedPersonInfo',   //  经营风险--被执行人
        data: {
          enName: pdf.companyName,
          pageNum: 1,
          pageSize: pdf.pageSize,
        },
        success: function (res) {
          data.executedPersonInfo = res.data.listData;
        }
      },
      {
        url: 'executedInfo',   //  经营风险--失信被执行人
        data: {
          enName: pdf.companyName,
          pageNum: 1,
          pageSize: pdf.pageSize,
        },
        success: function (res) {
          data.executedInfo = res.data.listData;
        }
      },
      {
        url: 'chattelMortgageInfo',   //  经营风险--动产抵押
        data: {
          enName: pdf.companyName,
          pageNum: 1,
          pageSize: pdf.pageSize,
        },
        success: function (res) {
          data.chattelMortgageInfo = res.data.listData;
        }
      },
      {
        url: 'equityPledgedInfo',   //  经营风险--股权出质
        data: {
          enName: pdf.companyName,
          pageNum: 1,
          pageSize: pdf.pageSize,
        },
        success: function (res) {
          data.equityPledgedInfo = res.data.listData;
        }
      }
      ],function(){
        document.getElementById('operation-risk-tp').innerHTML = template('administrative-tp', data);
        pdf.addWaterMark($('.watermark'));
      });

    },
  }
});

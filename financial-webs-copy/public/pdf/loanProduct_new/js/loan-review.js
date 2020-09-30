define(function (require, exports, module) {
  var template = require('art-template');
  var api = require('api');
  var api2 = require('api2');
  var $ = require('jquery');
  var pdf = require('pdf');
  var verticalTable = require('verticalTable');
  var data = {
    technical: {},
    market: {},
    party: {},
  };
  //  导出模块内容
  module.exports = {
    load: function () {
      this.getInfo(pdf.companyName,pdf.rzid)

    },
    getInfo: function (companyName,rzid) {
      new api2(
          [
            {
              url: 'financialPdfDownloadNew/techIndicator',
              data: {
                companyName: companyName,
                rzid:rzid
              },
              success: function (res) {
                if (res.data !== null) {
                  data.technical = res.data;
                }
              }
            },
            {
              url: 'financialPdfDownloadNew/marketIndicator',
              data: {
                companyName: companyName,
                rzid:rzid
              },
              success: function (res) {
                if (res.data !== null) {
                  data.market = res.data;
                }
              }
            },
            {
              url: 'financialPdfDownloadNew/partyBuildingInfo',
              data: {
                companyName: companyName,
                rzid:rzid
              },
              success: function (res) {
                if (res.data !== null) {
                  data.party = res.data;
                }
              }
            }
          ],function () {
            $('#loan-review').html(template('loan-review-tp', data));
          }
      )
    },
  }
});

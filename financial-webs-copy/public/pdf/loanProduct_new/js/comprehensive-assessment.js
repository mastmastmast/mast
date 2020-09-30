define(function (require, exports, module) {
  var template = require('art-template');
  var api = require('api');
  var api2 = require('api2');
  var $ = require('jquery');
  var pdf = require('pdf');
  var verticalTable = require('verticalTable');
  var data = {
    radar: {},
    summary: {},
    loanName: '',
    content: '',
    group: ['较差', '中等', '良好', '优秀', '极好']
  };
  //  导出模块内容
  module.exports = {
    load: function () {
      this.getInfo(pdf.companyName, pdf.loanName,pdf.id,pdf.rzid);
      data.loanName = pdf.loanName;
    },
    getInfo: function (companyName, loanName, id,rzid) {
      var that = this;
      new api2([
        {
          url: 'financialPdfDownloadNew/queryOverallMerit',
          data: {
            companyName: companyName,
            productName: loanName,
            id : id,
            rzid:rzid
          },
          success: function (res) {
            data.summary = res.data;
            var radarData = res.data;
            if (radarData.credit_name !== undefined && radarData.credit_value !== undefined) {
              var indicator = [];
              radarData.credit_name.forEach(function (item, index) {
                indicator.push({name: item});
              })
              var minAndMax = pdf.getMinAndMax(radarData.credit_value);
              var max = minAndMax.max;
              var min = minAndMax.min;
              min = min >= 0 ? 0 : min;
              indicator.forEach(function (item, index) {
                item.max = max;
                item.min = min;
              });
              data.radar.indicator = indicator;
              data.radar.value = radarData.credit_value;
            } else {
              data.noData = true;
            }
          }
        }
      ], function () {
        $('#comprehensive-assessment').html(template('comprehensive-assessment-tp', data));
        that.drawRadar(document.getElementById('radar-chart'), data.radar.indicator, data.radar.value);
      })
    },
    drawRadar: function (el, indicator, value) {
      pdf.renderRadarForLoanPdf(el, indicator, value, '企业信用评价')
    }
  }
});

define(function (require, exports, module) {
  var template = require('art-template');
  var api = require('api')
  var api2 = require('api2')
  var $ = require('jquery')
  var pdf = require('pdf');
  var data = {
    baseInfo: {},
    rander: {},
    conclusion: '',
    content: '',
    summary: [],
  };
  //  导出模块内容
  module.exports = {
    load: function () {
      this.getBaseInfo(pdf.companyName);
    },
    getBaseInfo: function (companyName) {
      var that = this;
      new api2([
        {
          //企业基本信息
          url: 'fcPdfInfo/productReportSummary',
          data: {
            enName: companyName,
            productName: pdf.loanName
          },
          success: function (res) {
            data.baseInfo = res.data;
            // console.log(1)
            if (res.data.describe) {
              data.summary = res.data.describe.split('&');
            }
          }
        },
        {
          //雷达图评分
          url: 'creditReport/selectCreditScore',
          data: {
            companyName: companyName,
          },
          success: function (res) {
            var randerData = res.data;
            if (res.data.name !== undefined && res.data.value !== undefined) {
              var indicator = [];
              randerData.name.forEach(function (item, index) {
                indicator.push({
                  name: item
                });
              });
              var minAndMax = pdf.getMinAndMax(randerData.value);
              var max = minAndMax.max;
              var min = minAndMax.min;
              min = min >= 0 ? 0 : min;
              indicator.forEach(function (item, index) {
                item.max = max;
                item.min = min;
              });
              data.rander.indicator = indicator;
              data.rander.value = randerData.value;
            } else {
              data.noData = true;
              data.content = randerData.content;
            }
          }
        },

        {
          url: 'fcPdfInfo/financingCreditListInfo',
          data: {
            enName: pdf.companyName
          },
          success: function (res) {
            data.conclusion = res.data.conclusion;
          }
        },
      ], function () {
        $('#report-summary-tp').html(template('report-summary-tp2', data));
        if (!data.noData) {
          that.drawRadar(document.getElementById('radar-chart'), data.rander.indicator, data.rander.value);
        } else {
          $('#radar-chart').html('<p>'+data.content+'</p>').css(
              {
                'text-align': 'center',
                'font-size': '32px',
                "font-weight": "bold",
                'color': '#ff6c1c',
                "word-wrap": "break-word",
                "display": "table",
              })
          $('#radar-chart > p').css(
              {
                "display": "table-cell",
                "vertical-align": 'middle'
              }
          )
        }

        pdf.addWaterMark($('.watermark'));
      });
    },
    drawRadar: function (el, indicator, value) {
      pdf.renderRadarForPdf(el, indicator, value, '企业信用评价')
    }
  }
});

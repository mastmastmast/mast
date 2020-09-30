define(function (require, exports, module) {
  var template = require('art-template');
  var api = require('api')
  var api2 = require('api2')
  var $ = require('jquery')
  var pdf = require('pdf');
  var data = {
    baseInfo: {},
    rander: {},
    advantage: [],
    disAdvantage: [],
    policyInfo: {
      pdfPolicyInfo: [],
      countContent: '暂无数据'
    },
    policyLoanInfo: {
      pdfPolicyInfo: [],
      countContent: '暂无数据'
    },
    conclusion: '',
    content: '',
    //数据分析
    dataAnalysis: [],
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
          url: 'fcPdfInfo/reportSummary',
          data: {
            enName: companyName
          },
          success: function (res) {
            data.baseInfo = res.data;
            // console.log(1)
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
          //政策申报记录
          url: 'pdfInfo/declarationRecords',
          data: {
            enName: companyName
          },
          success: function (res) {
            // console.log(3)
            data.policyInfo = res.data;
          }
        },
        {
          //政策贷款记录
          url: 'pdfInfo/recordofPolicyLoan',
          data: {
            enName: companyName
          },
          success: function (res) {
            // console.log(4)
            data.policyLoanInfo = res.data;
          }
        },
        {
          // 企业优缺点
          url: 'advantagesAndDisadvantages',
          data: {
            enName: companyName,
            appNum: '2'
          },
          success: function (res) {
            data.advantage = res.data.Y;
            data.disAdvantage = res.data.N;
            var summary = res.data.RZ;
            if (summary !== null && summary.length > 0) {
              data.baseInfo.summary = summary[0].evaluation;
            } else {
              data.baseInfo.summary = '';
            }
          }
        },
        {
          //数据分析
          url: 'financingCreditReport/dataAnalysisAndConclusion',
          data: {
            companyName: companyName,
          },
          success: function (res) {
            var arr1 = [];
            var arr2 = [];
            if (res.data && res.data.length>0) {
              for (var i = 0; i< res.data.length;i++) {
                if (i % 2 == 0) {
                  arr1.push(res.data[i])
                } else {
                  arr2.push(res.data[i])
                }
              }
              data.dataAnalysis = arr1.concat(arr2);
            }
          }
        }
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

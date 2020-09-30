define(function(require, exports, module) {
  var template=require('art-template');
  var api=require('api')
  var api2=require('api2')
  var $=require('jquery')
  var pdf=require('pdf');
  var data = {
    baseInfo: {},
    rander: {},
    advantage: [],
    disAdvantage: [],
    policyInfo: {
      pdfPolicyInfo:[],
      countContent: '暂无数据'
    },
    policyLoanInfo: {
      pdfPolicyInfo:[],
      countContent: '暂无数据'
    },
    //企业评价
    evaluation: [],
  };
  //  导出模块内容
  module.exports ={
    load: function () {
      this.getBaseInfo(pdf.companyName);
    },
    getBaseInfo: function (companyName) {
      var that = this;
      new api2([{
        url: 'pdfInfo/reportSummary',
        data: {
          enName: companyName
        },
        success: function (res) {
          data.baseInfo = res.data;
          // console.log(data.baseInfo)
        }
      },
        {
          url: 'credit/selectEnterpriseInfoScore',
          data: {
            companyName: companyName,
          },
          success: function (res) {
            var randerData = res.data;
            if ( res.data.name !== undefined && res.data.value !== undefined ) {
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
            }
          }
        },
        {
          url: 'pdfInfo/declarationRecords',
          data: {
            enName: companyName
          },
          success: function (res) {
            data.policyInfo = res.data;
          }
        },
        {
          url: 'pdfInfo/recordofPolicyLoan',
          data: {
            enName: companyName
          },
          success: function (res) {
            data.policyLoanInfo = res.data;
          }
        },
        {
          url: 'fcPdfInfo/publishConclusion',
          data: {
            companyName: companyName
          },
          success: function (res) {
            if (res.data) {
              data.evaluation = res.data
            }
          }
        },
      ],function(){
        $('#report-summary-tp').html (template('report-summary-tp2', data));
        if (!data.noData ) {
          that.drawRadar(document.getElementById('radar-chart'),data.rander.indicator,data.rander.value);
        } else {
          $('#radar-chart').
          html('暂无数据').
          css(
              {'text-align':'center',
                'font-size':'58px',
                "font-weight":"bold",
                'color':'#ff6c1c',
                'line-height':'800px'})
        }
        pdf.addWaterMark($('.watermark'));
        $('#report-summary-tp').find('#score-star').html(pdf.getStarHtml(data.baseInfo.creditRating))
      });
    },
    drawRadar: function (el,indicator,value) {
      pdf.renderRadarForPdf(el,indicator,value,'企业信用评价')
    }
  }
});

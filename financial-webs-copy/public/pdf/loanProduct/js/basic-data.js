define(function (require, exports, module) {
  var template = require('art-template');
  var api = require('api')
  var api2 = require('api2')
  var $ = require('jquery')
  var pdf = require('pdf');
  var verticalTable = require('verticalTable')
  var data = {
    data: [
      {
        title: '基础势能',
        order: '（一）',
        score: '',
        content: [
          {
            externalTitle: '',
            commonObject: [
              {
                label: '',
                value: '',
              },
            ],
          },
        ]
      },
      {
        title: '资产信用',
        order: '（二）',
        score: '',
        content: [
          {
            externalTitle: '',
            commonObject: [
              {
                label: '',
                value: '',
              },
            ],
          },
        ]
      },
      {
        title: '创新发展',
        order: '（三）',
        score: '',
        content: [
          {
            externalTitle: '',
            commonObject: [
              {
                label: '',
                value: '',
              },
            ],
          },
        ]
      },
      {
        title: '财务信用',
        order: '（四）',
        score: '',
        content: [
          {
            externalTitle: '',
            commonObject: [
              {
                label: '',
                value: '',
              },
            ],
          },
        ]
      },
      {
        title: '公共信用',
        order: '（五）',
        score: '',
        content: [
          {
            externalTitle: '',
            commonObject: [
              {
                label: '',
                value: '',
              },
            ],
          },
        ]
      },
    ],
  };
  //  导出模块内容
  module.exports = {
    load: function () {
      this.getBaseInfo(pdf.companyName);
    },
    getBaseInfo: function (companyName) {
      var that = this;
      new api2([{
        //基础势能
        url: 'creditEvaluation/selectFundamentalPotentialEnergy',
        data: {
          companyName: companyName
        },
        success: function (res) {
          // var content = res.data.content
          // for (var i = 0; i < content.length; i++) {
          //   var commonObject = [];
          //   for (var j = 0; j < content[i].commonObject.length; j+=2) {
          //     commonObject.push(content[i].commonObject.slice(j,j+2));
          //   }
          //   res.data.content[i].commonObject = commonObject
          // }
          data.data[0] = res.data;
          data.data[0].order = "（一）";
          for (var i = 0; i < data.data[0].content.length; i++) {
            data.data[0].content[i].sign = 'PotentialEnergy';
          }
        }
      },
        {
          //资产信用
          url: 'creditEvaluation/selectAssetsCredit',
          data: {
            companyName: companyName
          },
          success: function (res) {
            data.data[1] = res.data;
            data.data[1].order = "（二）";
            for (var i = 0; i < data.data[1].content.length; i++) {
              data.data[1].content[i].sign = 'AssetsCredit';
            }
          }
        },
        {
          //财务信用
          url: 'creditEvaluation/selectFinancialCredit',
          data: {
            companyName: companyName
          },
          success: function (res) {
            data.data[2] = res.data;
            data.data[2].order = "（三）";
            for (var i = 0; i < data.data[2].content.length; i++) {
              data.data[2].content[i].sign = 'FinancialCredit';
            }
          }
        },
        {
          //创新发展
          url: 'creditEvaluation/selectInnovationDevelop',
          data: {
            companyName: companyName
          },
          success: function (res) {
            data.data[3] = res.data;
            data.data[3].order = "（四）";
            for (var i = 0; i < data.data[3].content.length; i++) {
              data.data[3].content[i].sign = 'InnovationDevelop';
            }
          }
        },
        {
          //公告信用
          url: 'creditEvaluation/selectPublicCredit',
          data: {
            companyName: companyName
          },
          success: function (res) {
            data.data[4] = res.data;
            data.data[4].order = "（五）";
            for (var i = 0; i < data.data[4].content.length; i++) {
              data.data[4].content[i].sign = 'PublicCredit';
            }
          }
        },
      ], function () {
        $('#financing-basic-data-tp').html(template('financing-basic-data-tp2', data));
        pdf.addWaterMark($('.watermark'));
        for (var i = 0; i < data.data.length; i++) {
          for (var j = 0; j < data.data[i].content.length; j++) {
            if (data.data[i].content[j].commonObject.length < 2) {
              var child = new verticalTable({
                dataItemCountPerRow: 1,
                data: data.data[i].content[j].commonObject
              }).getHtml();
              $('#' + data.data[i].content[j].sign + j).append(child);
            } else {
              var child = new verticalTable({
                dataItemCountPerRow: 2,
                data: data.data[i].content[j].commonObject
              }).getHtml();
              $('#' + data.data[i].content[j].sign + j).append(child);
            }

          }
        }
      });
    },
  }
});

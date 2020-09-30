define(function (require, exports, module) {
  var template = require('art-template');
  var api = require('api')
  var api2 = require('api2')
  var $ = require('jquery')
  var pdf = require('pdf');
  var data = {
    loanCorrection: {
      valid_item: [

      ],
      invalid_items: [

      ],
      ent_future_judge: {
        value: '3',
        updateDate: null,
        updater: null
      },
    },
  };

  //  导出模块内容
  module.exports = {
    load: function () {
      this.getLoanInfo(pdf.companyName,pdf.loanName);
      // document.getElementById('loan-evaluate-tp').innerHTML = template('loan-evaluate-tp2', data);
    },
    getLoanInfo: function (companyName,loanName) {
      var that = this;
      new api2([
        {
          url: 'fcPdfInfo/accessConditionsReport',
          data: {
            enName: companyName
          },
          success: function (res) {
            var res2 = res.data;
            if (res2 && JSON.stringify(res2) != "{}") {
              var loan = that.loanFun(loanName)
              data.loanCorrection.valid_item = res2[loan].valid_item;
              data.loanCorrection.invalid_items = res2[loan].invalid_items;
              data.loanCorrection.ent_future_judge = res2[loan].ent_future_judge;
            }
          }
        }
      ], function () {
        document.getElementById('loan-evaluate-tp').innerHTML = template('loan-evaluate-tp2', data);
      });
    },
    loanFun: function (loanName) {
      switch (loanName) {
        case '新创贷':
          return 'XC'
          break
        case '园保贷':
          return 'YB'
          break
        case '壮大贷':
          return 'ZD'
          break
        case '成长贷':
          return 'CZ'
          break
        case '期权贷':
          return 'QIQ'
          break
      }
    }
  }
});


define(function (require, exports, module) {
  var template = require('art-template');
  var pdf = require('pdf');
  var $ = require('jquery');
  var api = require('api');
  module.exports = {
    load: function () {
      new api({
        url: 'fcPdfInfo/financingCreditListInfo',
        data: {
          enName: pdf.companyName
        },
        success: function (res) {
          var evaluateList = res.data.evaluateList;
          var data = {};
          var list = [];
          evaluateList.forEach(function (item, index) {
            var financingCreditDetailsInfo = item.financingCreditDetailsInfo;
            var name = financingCreditDetailsInfo.applyName;
            var evaluation = financingCreditDetailsInfo.evaluateContent;
            //有效修改项
            var validCorrectionItems = [];
            //无效修正项
            var invalidCorrectionItems = [];
            var accessCondition = item.accessCondition;
            if (accessCondition !== null) {
              validCorrectionItems=accessCondition.valid_item;
              invalidCorrectionItems=accessCondition.invalid_items;
              if(validCorrectionItems && validCorrectionItems.length>0){
                validCorrectionItems.forEach(function(subItem,subIndex){
                  var status = subItem.accessStatus;
                  subItem.icon = status === '1' ? 'yc-icon-check-fill' : status === '2' ? 'yc-icon-forbidden' : 'yc-icon-loading-2';
                });
              }
            }
            list.push({
              name: name,
              evaluation: evaluation,
              validCorrectionItems: validCorrectionItems,
              invalidCorrectionItems: invalidCorrectionItems,
              prediction:accessCondition.ent_future_judge
            });
          });
          data.list = list;
          // console.log('data',data);
          $('#loan-evaluate').html(template('loan-evaluate-tp', data));
        }
      });

    }
  };
});

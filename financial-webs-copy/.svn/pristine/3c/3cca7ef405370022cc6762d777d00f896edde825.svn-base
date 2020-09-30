define(function(require, exports, module) {
  var template=require('art-template');
  var api=require('api')
  var api2=require('api2')
  var $=require('jquery')
  var pdf=require('pdf');
  var data = {
    baseInfo: {},
  };
  //  导出模块内容
  module.exports ={
    load: function () {
      this.getBaseInfo(pdf.companyName);

    },
    getBaseInfo: function (companyName) {
      new api2([{
        url: 'pdfInfo/pdfNumInfo',
        data: {
          enName: companyName,
          type: "1"
        },
        success: function (res) {
          data.baseInfo = res.data;
          // console.log(data.baseInfo);
        }
      }],function(){
        document.getElementById('report-header-tp').innerHTML = template('header-tp', data);
      });

    },
  }
});


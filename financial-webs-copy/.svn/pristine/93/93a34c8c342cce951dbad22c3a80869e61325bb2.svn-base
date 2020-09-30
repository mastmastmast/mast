define(function(require, exports, module) {
  var template=require('art-template');
  var pdf=require('pdf');
  var data = {
    title: 'CZDXYBG',
    desc: '“成长贷信用报告”',
  };
  //  导出模块内容
  module.exports ={
    load: function () {
      var loanName = pdf.loanName;
      if (loanName === '成长贷') {
        data.title = 'CZDXYBG';
        data.desc = '“成长贷信用报告”';
      } else if (loanName === '期权贷') {
        data.title = 'QQDXYBG';
        data.desc = '“期权贷信用报告”';
      } else if (loanName === '新创贷') {
        data.title = 'XCDXYBG';
        data.desc = '“新创贷信用报告”';
      } else if (loanName === '壮大贷') {
        data.title = 'ZDDXYBG';
        data.desc = '“壮大贷信用报告”';
      } else {
        data.title = 'YBDXYBG';
        data.desc = '“园保贷信用报告”';
      }
      document.getElementById('note-info-tp').innerHTML = template('note-info-tp2', data);
      pdf.addWaterMark($('.watermark'));
    },
  }
});

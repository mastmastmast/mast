define(function(require, exports, module) {
  var template=require('art-template');
  var pdf=require('pdf');
  var data = {
    noteInfo: [
      {level: pdf.getStarHtml(5), explain: "信用优良"},
      {level: pdf.getStarHtml(4.5), explain: "信用良好"},
      {level: pdf.getStarHtml(4), explain: "信用较好"},
      {level: pdf.getStarHtml(3.5), explain: "重视商誉，立信积累中"},
      {level: pdf.getStarHtml(3), explain: "有较好的履约动力"},
      {level: pdf.getStarHtml(2.5), explain: "有履约动力"},
      {level: pdf.getStarHtml(2), explain: "履约动力欠足"},
      {level: pdf.getStarHtml(1.5), explain: "维护商誉的信心已弱化"},
      {level: pdf.getStarHtml(1), explain: "违约风险较大"},
      {level: pdf.getStarHtml(0.5), explain: "违约风险极大"},
      {level: pdf.getStarHtml(0), explain: "在工商管理机关已注销、吊销、破产状态，法律意义上消亡"},
    ]
  };
  //  导出模块内容
  module.exports ={
    load: function () {
      document.getElementById('note-info-tp').innerHTML = template('noteinfo-tp', data);
      pdf.addWaterMark($('.watermark'));
    },
  }
});

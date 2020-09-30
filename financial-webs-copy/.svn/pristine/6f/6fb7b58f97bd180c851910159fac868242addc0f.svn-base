define(function(require, exports, module) {
  var template=require('art-template');
  var api=require('api')
  var $=require('jquery')
  var pdf=require('pdf');
  var data = {
    // 开庭公告
    hearingAnnouncement: [],
    // 法院公告
    courtAnnouncement: [],
    // 裁决文书
    rulingClerical: [],
  };
  //  导出模块内容
  module.exports = {
    load: function () {
      this.courtAnnouncementData();
      this.judgmentInfoData();
    },
    courtAnnouncementData: function () {
      // 法院公告
      new api({
        url: 'announcementInfo',
        data: {
          enName: pdf.companyName,
          pageNum: 1,
          pageSize: pdf.pageSize
        },
        success: function (res) {
          data.courtAnnouncement = res.data.listData;
          $('#lawsuits-info').html(template('lawsuits-info-tp', data));
          pdf.addWaterMark($('.watermark'));
        }
      });
    },
    judgmentInfoData: function () {
      // 裁决文书
      new api({
        url: 'judgmentInfo',
        data: {
          enName: pdf.companyName,
          pageNum: 1,
          pageSize: pdf.pageSize
        },
        success: function (res) {
          data.rulingClerical = res.data.listData;
          $('#lawsuits-info').html(template('lawsuits-info-tp', data));
          pdf.addWaterMark($('.watermark'));
        }
      });
    }
  }
});

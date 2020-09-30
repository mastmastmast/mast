define(function (require, exports, module) {
  var template = require('art-template');
  var api = require('api')
  var $ = require('jquery')
  var pdf = require('pdf');
  var data = {
    //融资信息
    financingList: [],
    // 软件著作权
    propertyRights: [],
    // 著作权
    propertyRights1: [],
    // 专利信息
    patentInfo: [],
    // 资质证书
    qualificationCertificate: [],
    // 税务评级
    taxEvaluationLevelInfo: [],
    //公开招聘信息
    recruitmentList: []
  };
  //  导出模块内容
  module.exports = {
    load: function () {
      this.getFinancingInfo();
      this.propertyRightsData();
      this.propertyRightsData1();
      this.patentInfoData();
      this.qualificationCertificateData();
      this.qtaxEvaluationLevelInfoData();
      this.getRecruitmentInfo();
    },
    /**
     * 融资信息
     */
    getFinancingInfo: function () {
      new api({
        url: 'financingInfo',
        data: {
          enName: pdf.companyName,
          pageSize: pdf.pageSize,
          pageNum: 1
        },
        success: function (res) {
          data.financingList = res.data.listData;
          $('#operation-info').html(template('operation-info-tp', data));
          pdf.addWaterMark($('.watermark'));
        }
      });
    },
    /**
     * 公开招聘信息
     */
    getRecruitmentInfo: function () {
      new api({
        url: 'enterpriseRecruitmentInfo',
        data: {
          enName: pdf.companyName,
          pageSize: pdf.pageSize,
          pageNum: 1
        },
        success: function (res) {
          data.recruitmentList = res.data.listData;
          $('#operation-info').html(template('operation-info-tp', data));
          pdf.addWaterMark($('.watermark'));
        }
      });
    },
    propertyRightsData: function () {
      // 软件著作权
      new api({
        url: 'softwareInfo',
        data: {
          enName: pdf.companyName,
          pageNum: 1,
          pageSize: pdf.pageSize
        },
        success: function (res) {
          data.propertyRights = res.data.listData;
          $('#operation-info').html(template('operation-info-tp', data));
          pdf.addWaterMark($('.watermark'));
        }
      });
    },
    propertyRightsData1: function () {
      // 著作权
      new api({
        url: 'workscopyrightInfo',
        data: {
          enName: pdf.companyName,
          pageNum: 1,
          pageSize: pdf.pageSize
        },
        success: function (res) {
          data.propertyRights1 = res.data.listData;
          $('#operation-info').html(template('operation-info-tp', data));
          pdf.addWaterMark($('.watermark'));
        }
      });
    },
    patentInfoData: function () {
      // 著作权
      new api({
        url: 'patentInformationInfo',
        data: {
          enName: pdf.companyName,
          pageNum: 1,
          pageSize: pdf.pageSize
        },
        success: function (res) {
          data.patentInfo = pdf.processTableData(res.data.listData);
          $('#operation-info').html(template('operation-info-tp', data));
          pdf.addWaterMark($('.watermark'));
        }
      });
    },
    qualificationCertificateData: function () {
      // 著作权
      new api({
        url: 'certificatesInfo',
        data: {
          enName: pdf.companyName,
          pageNum: 1,
          pageSize: pdf.pageSize
        },
        success: function (res) {
          data.qualificationCertificate = res.data.listData;
          $('#operation-info').html(template('operation-info-tp', data));
          pdf.addWaterMark($('.watermark'));
        }
      });
    },
    qtaxEvaluationLevelInfoData: function () {
      // 著作权
      new api({
        url: 'taxEvaluationLevelInfo',
        data: {
          enName: pdf.companyName,
          pageNum: 1,
          pageSize: pdf.pageSize
        },
        success: function (res) {
          data.taxEvaluationLevelInfo = res.data.listData;
          $('#operation-info').html(template('operation-info-tp', data));
          pdf.addWaterMark($('.watermark'));
        }
      });
    }
  }
});

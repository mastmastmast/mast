define(function (require, exports, module) {
  var template = require('art-template');
  var api = require('api');
  var api2 = require('api2');
  var $ = require('jquery');
  var pdf = require('pdf');
  var verticalTable = require('verticalTable');
  var data = {
    baseInfo: {},
    shareholder:[],
    executive: [],
    finance: {},
    product: [],
    supplier: [],
    supplierMarket: [],
    client:[],
    clientMarket:[],
    bankLoan: {},
    periodLoan: {},
    guarantee: [],
    counterGuarantee: [],
  };
  //  导出模块内容
  module.exports = {
    load: function () {
      this.getInfo(pdf.companyName,pdf.rzid);
    },
    getInfo: function (companyName,rzid) {
      new api2(
          [
            {
              url: 'financialPdfDownloadNew/queryEnterpriseBaseInfo',
              data: {
                companyName: companyName,
                rzid:rzid
              },
              success: function (res) {
                if (res.data !== null) {
                  data.baseInfo = res.data;
                }
              }
            },
            {
              url: 'financialPdfDownloadNew/queryChiefPartnerInfo',
              data: {
                companyName: companyName,
                rzid:rzid
              },
              success: function (res) {
                if (res.data !== null) {
                  data.shareholder = res.data;
                }
              }
            },
            {
              url: 'financialPdfDownloadNew/queryManagerPersonalInfo',
              data: {
                companyName: companyName,
                rzid:rzid
              },
              success: function (res) {
                if (res.data !== null) {
                  data.executive = res.data;
                }
              }
            },
            {
              url: 'financialPdfDownloadNew/queryFinacialTarget',
              data: {
                companyName: companyName,
                year: 2015,
                rzid:rzid
              },
              success: function (res) {
                if (res.data !== null) {
                  data.finance = res.data;
                }
              }
            },
            {
              url: 'financialPdfDownloadNew/queryEnterpriseChiefProduct',
              data: {
                companyName: companyName,
                rzid:rzid
              },
              success: function (res) {
                if (res.data !== null) {
                  data.product = res.data;
                }
              }
            },
            {
              url: 'financialPdfDownloadNew/queryChiefSupplier',
              data: {
                companyName: companyName,
                rzid:rzid
              },
              success: function (res) {
                // console.log('res',res)
                var myData = res.data;
                var supplierMarket2 = [
                  {codeName: '本地', exist: false},
                  {codeName: '国内', exist: false},
                  {codeName: '国外', exist: false},
                ];
                var clientMarket2 = [
                  {codeName: '本地', exist: false},
                  {codeName: '国内', exist: false},
                  {codeName: '国外', exist: false},
                ];
                if (myData && myData.length>0) {
                  for (var i = 0; i < myData.length; i++) {
                    if (myData[i].custype == '供应商') {
                      var supplierInfo = {};
                      supplierInfo.company_name = myData[i].company_name;
                      supplierInfo.shangpinmingcheng = myData[i].shangpinmingcheng;
                      supplierInfo.jine = myData[i].jine;
                      data.supplier.push(supplierInfo);
                      for (var j = 0; j < myData[i].shichangquyu.length; j++) {
                        if (myData[i].shichangquyu[j].exist) {
                          for (var k = 0; k < supplierMarket2.length; k++) {
                            if (supplierMarket2[k].codeName == myData[i].shichangquyu[j].codeName) {
                              supplierMarket2[k].exist = true;
                            }
                          }
                        }
                      }
                    }
                    if (myData[i].custype == '主要客户') {
                      var clientInfo = {};
                      clientInfo.company_name = myData[i].company_name;
                      clientInfo.shangpinmingcheng = myData[i].shangpinmingcheng;
                      clientInfo.jine = myData[i].jine;
                      data.client.push(clientInfo);
                      for (var x = 0; x < myData[i].shichangquyu.length; x++) {
                        if (myData[i].shichangquyu[x].exist) {
                          for (var y = 0; y < clientMarket2.length; y++) {
                            if (clientMarket2[y].codeName == myData[i].shichangquyu[x].codeName) {
                              clientMarket2[y].exist = true;
                            }
                          }
                        }
                      }
                    }
                  }
                  data.supplierMarket =  supplierMarket2;
                  data.clientMarket = clientMarket2;
                  // console.log('supplier',data.supplier)
                  // console.log('supplierMarket',data.supplierMarket)
                  // console.log('client',data.client)
                  // console.log('clientMarket',data.clientMarket)
                }
              }
            },
            {
              url: 'financialPdfDownloadNew/queryBeforeBankLoan',
              data: {
                companyName: companyName,
                rzid:rzid
              },
              success: function (res) {
                if (res.data !== null) {
                  data.bankLoan = res.data;
                }
              }
            },
            {
              url: 'financialPdfDownloadNew/queryCurrentPeriodLoan',
              data: {
                companyName: companyName,
                rzid:rzid
              },
              success: function (res) {
                if (res.data !== null) {
                  data.periodLoan = res.data;
                }
              }
            },
            {
              url: 'financialPdfDownloadNew/queryExternalGuarantee',
              data: {
                companyName: companyName,
                rzid:rzid
              },
              success: function (res) {
                if (res.data !== null) {
                  data.guarantee = res.data;
                }
              }
            },
            {
              url: 'financialPdfDownloadNew/queryCounterGuarantee',
              data: {
                companyName: companyName,
                rzid:rzid
              },
              success: function (res) {
                if (res.data !== null) {
                  data.counterGuarantee = res.data;
                }
              }
            },
          ],function () {
            $('#company-profile').html(template('company-profile-tp', data));
          }
      )
    },
  }
});

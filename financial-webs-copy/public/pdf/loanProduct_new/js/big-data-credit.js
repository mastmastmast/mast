define(function (require, exports, module) {
    var template = require('art-template');
    var api = require('api');
    var api2 = require('api2');
    var $ = require('jquery');
    var pdf = require('pdf');
    var verticalTable = require('verticalTable');
    var data = {
        declarationRecords:[],
        recordofPolicyLoan:[],
        selectPublicCredit:{},
        selectAssetsCredit:{}, // 资产信用（人力资源）
        financialManagement:{}, // 数据分析（财务管理）
        innovationDevelop:{}, // 创新发展（企业创新研发管理）
        tableData1: [
            {
                label: '员工总数',
                value: '108人'
            },
            {
                label: '管理人员人数占比',
                value: '7.12%'
            },
            {
                label: '社保参保人数占比',
                value: '95.33%'
            },
            {
                label: '管理人员硕士学历以上人数占比',
                value: '30%'
            }
        ],
        tableData2: [
            {
                label: '财务基础',
                value: '该企业处于未亏损状态'
            },
            {
                label: '盈利能力',
                value: '该企业总资产报酬率10.23%，高于同行业90%；该企业净资产收益率10.57%，高于同行业39.27%'
            },
            {
                label: '收益质量',
                value: '该企业利润率26%，高于同行业70%；该企业毛利率18%，高于同行业80%'
            },
            {
                label: '资产结构',
                value: '该企业资产负债率15%，资产结构优于同行业78%'
            },
            {
                label: '偿债能力',
                value: '该企业偿债能力高于同行业平均水平'
            }, {
                label: '营运能力',
                value: '该企业总资产周转率5.89%，营运能力高于同行业67.12%'
            }, {
                label: '成长能力',
                value: '该企业利润平均增长率26%，成长能力高于同行业67%'
            }
        ],
        tableData3: [
            {
                label: '研发费用比例',
                value: '30%'
            },
            {
                label: '权威认证-GMP',
                value: '是'
            },
            {
                label: '研发人员比例',
                value: '25%'
            },
            {
                label: '权威认证-ISO1400',
                value: '是'
            },
            {
                label: '行业标准数量',
                value: '5项'
            }, {
                label: '权威认证-ISO22000',
                value: '否'
            }, {
                label: '专利数量',
                value: '3项'
            }
        ],
        breakPromise: '',
    };
    //  导出模块内容
    module.exports = {
        load: function () {
            this.getInfo(pdf.companyName,pdf.rzid)
        },
        getInfo: function (companyName,rzid) {
            var that = this;
            new api2([{ // 政策申报记录
                url: 'financialPdfDownloadNew/declarationRecords',
                data: {
                    companyName: companyName,
                    rzid:rzid
                },
                success: function (res) {
                    data.declarationRecords = res.data.policyReportList
                    data.breakPromise = res.data.qyBankDefault
                    // console.log(data.declarationRecords)
                }
            },{ // 政策性贷款记录
                url: 'financialPdfDownloadNew/recordofPolicyLoan',
                data: {
                    companyName: companyName,
                    rzid:rzid
                },
                success: function (res) {
                    data.recordofPolicyLoan = res.data
                    // console.log(data.recordofPolicyLoan)
                }
            },{ // 公共信用（信用加分，信用减分）
                url: 'financialPdfDownloadNew/selectPublicCredit',
                data: {
                    companyName: companyName,
                    rzid:rzid
                },
                success: function (res) {
                    data.selectPublicCredit = res.data
                    if (data.selectPublicCredit.content[1].commonObject.length % 2 !== 0) {
                        var obj = {
                            label: ' ',
                            value: ' '
                        };
                        data.selectPublicCredit.content[1].commonObject.push(obj);
                    }

                }
            },{ // 资产信用（人力资源）
                url: 'financialPdfDownloadNew/selectAssetsCredit',
                data: {
                    companyName: companyName,
                    rzid:rzid
                },
                success: function (res) {
                    data.selectAssetsCredit = res.data
                }
            },{ // 数据分析（财务管理）
                url: 'financialPdfDownloadNew/queryInformationConclusion',
                data: {
                    companyName: companyName,
                    rzid:rzid
                },
                success: function (res) {
                    data.financialManagement = res.data
                }
            },{ // 创新发展（企业创新研发管理）
                url: 'financialPdfDownloadNew/selectInnovationDevelop',
                data: {
                    companyName: companyName,
                    rzid:rzid
                },
                success: function (res) {
                    data.innovationDevelop = res.data
                }
            }],function() {
                $('#big-data-credit').html(template('big-data-credit-tp', data));
                // 信用加分
                var html1 = new verticalTable({
                    dataItemCountPerRow: 2,
                    labelWidth: '68%',
                    data: data.selectPublicCredit.content[0].commonObject,
                    title: data.selectPublicCredit.content[0].title || '信用加分'
                }).getHtml();
                $('#content-box-add').html(html1);
                // 信用减分
                var html2 = new verticalTable({
                    dataItemCountPerRow: 2,
                    labelWidth: '68%',
                    data: data.selectPublicCredit.content[1].commonObject,
                    title: data.selectPublicCredit.content[1].title || '信用减分'
                }).getHtml();
                $('#content-box-sub').html(html2);
                // 人力资源
                var html3 = new verticalTable({
                    dataItemCountPerRow: 2,
                    labelWidth: '68%',
                    data: data.selectAssetsCredit.content[0].commonObject,
                }).getHtml();
                $('#table1').html(html3);
                // 财务管理
                var financialManagement = [];
                for(var i in data.financialManagement){
                    var item = data.financialManagement[i];
                    var obj = {};
                    obj.label = item.name;
                    obj.value = item.evaluation;
                    financialManagement.push(obj)
                }
                var html4 = new verticalTable({
                    dataItemCountPerRow: 1,
                    labelWidth: '30%',
                    data: financialManagement,
                }).getHtml();
                $('#table2').html(html4);
                // 企业创新研发管理
                var html5 = new verticalTable({
                    dataItemCountPerRow: 2,
                    labelWidth: '68%',
                    data: data.innovationDevelop.content[0].commonObject,
                }).getHtml();
                $('#table3').html(html5);
            })
        },
    }
});

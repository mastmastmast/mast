define(function (require, exports, module) {
  var pdf = require('pdf');
  var $ = require('jquery');
  var template = require('art-template');
  module.exports = {
    load: function () {
      var data = {
        list: [
          {
            name: '报告概述',
            children: []
          },
          {
            name: '融资信用基础数据',
            children: [
              {
                name: '基础势能'
              },
              {
                name: '资产信用'
              },
              {
                name: '财务信用'
              },
              {
                name: '创新发展'
              },
              {
                name: '公共信用'
              }
            ]
          },
          // {
          //   name: '政策性贷款专项评价',
          //   children: [
          //     {
          //       name: '成长贷'
          //     },
          //     {
          //       name: '园保贷'
          //     },
          //     {
          //       name: '园保贷区-高新'
          //     },
          //     {
          //       name: '壮大贷'
          //     },
          //     {
          //       name: '新创贷'
          //     },
          //     {
          //       name: '期权贷'
          //     },
          //     {
          //       name: '双创信贷'
          //     },
          //     {
          //       name: '科创贷'
          //     },
          //     {
          //       name: '易采贷'
          //     },
          //     {
          //       name: '小企业高新贷'
          //     }
          //   ]
          // },
          {
            name: '附注',
            children: []
          }
        ]
      };
      $('#report-catalog-info').html(template('catalog-tp', data));
    }
  };
});
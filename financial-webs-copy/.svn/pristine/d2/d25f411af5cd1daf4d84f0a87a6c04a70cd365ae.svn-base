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
          {
            name: '贷款准入基础数据',
            children: []
          },
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
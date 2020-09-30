/**
 * 纵向表格：标题在左边，字段内容在右边
 */
define(function (require, exports, module) {
  var $ = require('jquery');
  var template = require('art-template');
  var tableTp = require('text!tableTp');
  var defaults = {
    //表格样式
    tableClass: {
      //文字过多是否截断显示省略号
      ellipsis: false,
      //标题是否填充背景
      fillLabel: true
    },
    //标题的宽度(相对于一组数据所占的宽度，可以是百分比，也可以是像素)
    labelWidth: '50%',
    //一行显示几个字段
    dataItemCountPerRow: 1,
    //表格数据，为键值对数组
    data: [],
    //表格标题（默认无标题）
    title:''
  };
  module.exports = function (options) {
    var settings = $.extend(true, {}, defaults, options);
    var dataItemCountPerRow = settings.dataItemCountPerRow;
    var data = settings.data;
    var labelWidth = settings.labelWidth;
    var reg = /^\d+%$/;
    //如果标题的宽度是百分比，将标题的宽度百分比转换成相对于一行的百分比
    if (reg.test(labelWidth)) {
      labelWidth = parseFloat(labelWidth) / dataItemCountPerRow + '%';
    }
    var tempData = data.concat([]);
    //分组后的数据
    var dataGroup = [];
    if (data!==null && data.length>0) {
      var dataLength = data.length;
      //将一行显示的数据项放到一个数组中
      for (var i = 0; i < dataLength; i += dataItemCountPerRow) {
        dataGroup.push(tempData.slice(i, i + dataItemCountPerRow));
      }
      //一行的td数
      var tdCountPerRow = 2 * dataItemCountPerRow;
      //最后一行的td数
      var tdCountLastRow = 2 * dataGroup[dataGroup.length - 1].length;
      dataGroup.forEach(function (item, index) {
        item.forEach(function (subItem, subIndex) {
          subItem.labelWidth = labelWidth;
          //如果是最后一个键值对
          if (index * dataItemCountPerRow + subIndex === dataLength - 1) {
            subItem.colpsan = tdCountPerRow - tdCountLastRow + 1;
          } else {
            subItem.colpsan = 1;
          }
        });

      });
    }
    settings.dataGroup = dataGroup;
    var render = template.compile(tableTp);
    var html = render(settings);
    /**
     * 获取渲染后的html字符串
     * @returns {*}
     */
    this.getHtml = function () {
      return html;
    };
    this.logData = function () {
      console.log('dataGroup', settings.dataGroup);
    }

  }
});

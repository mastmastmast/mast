define(function (require, exports, module) {
  var echarts = require('echarts');
  var template = require('art-template');
  /**
   * 将阿拉拍数字转化为汉字（1-10）
   * @param number
   */
  template.defaults.imports.toChineseCharacter = function (number) {
    var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    var characters = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
    var result = '';
    if (number > 10) {
      // console.error('只能转化数字1-10');
    } else {
      var index = numbers.indexOf(number);
      result = characters[index];
    }
    return result;
  };
  var pdf = {};
  //token
  pdf.token = '';
  //公司名称
  pdf.companyName = '';
  //分页查询每页展示的条数
  pdf.pageSize = 10;
  //贷款名字
  pdf.loanName = '';
  // 贷款id
  pdf.id = '';
  //  融资id
  pdf.rzid = '';
  /**
   * 获取一个数组的最大值与最小值(用于雷达图的展示)
   * @param arr
   * @returns {*}
   */
  pdf.getMinAndMax = function (arr) {
    // var tempArr = Object.assign([],arr);
    var tempArr = arr.concat([]);
    if (tempArr !== null && tempArr.length > 0) {
      var length = tempArr.length;
      tempArr = tempArr.sort(function (a, b) {
        a = a === '' ? 0 : a;
        b = b === '' ? 0 : b;
        return parseFloat(a) - parseFloat(b);
      });
      var max = parseFloat(tempArr[length - 1]);
      var min = parseFloat(tempArr[0]);
      max += max * 0.1;
      if (max === 0 && min === 0) {
        max = 100;
      }
      return {min: min, max: max};
    } else {
      return {min: 0, max: 10};
    }
  };
  /**
   * 雷达图（用于pdf报告页面）
   * @param element
   * @param indicator
   * @param value
   * @param name
   * @returns {*}
   */
  pdf.renderRadarForPdf = function (element, indicator, value, name) {
    var myChart = echarts.init(element);
    var option = {
      tooltip: {
        trigger: 'item',
        enterable: true,
        confine: true,
        formatter: function (params) {
          var str = params.name + '<br/>';
          indicator.forEach(function (item, index) {
            var val = value[index];
            val = val === '' ? '暂无数据' : val;
            str += item.name + '：' + val + '<br/>';
          });
          return str;

        }
      },
      radar: {
        splitNumber: 4,
        radius: '58%',
        name: {
          textStyle: {
            color: '#333',
            fontSize: 27
            // padding: [3, 5]
          }
        },
        splitArea: {
          show: false,
          areaStyle: {
            // 图表背景的颜色
            color: '#fff'
          }
        },
        axisLine: {
          show: false
        },
        splitLine: {
          show: true,
          lineStyle: {
            width: 1,
            // 设置网格的颜色
            color: '#878787'
          }
        },
        indicator: indicator
      },
      series: [{
        name: name,
        type: 'radar',
        symbolSize: 6,
        label: {
          show: true,
          position: 'top',
          color: '#ff8746',
          fontSize: 24,
          offset: [-15, 0]
        },
        data: [{
          value: value,
          name: name,
          areaStyle: {
            normal: {
              color: 'rgba( 255, 100, 15, 0.5 )'
            }
          },
          itemStyle: {
            normal: {
              color: '#FF640F',
              borderWidth: 4,
              borderColor: '#FF640F'
            }
          },
          lineStyle: {
            normal: {
              color: '#FF640F',
              type: 'solid'
              // width: 1
            }
          }
        }]
      }]
    };
    myChart.setOption(option);
    return myChart;
  };
  pdf.renderRadarForLoanPdf = function (element, indicator, value, name) {
    var myChart = echarts.init(element);
    var option = {
      tooltip: {
        trigger: 'item',
        enterable: true,
        confine: true,
        formatter: function (params) {
          var str = params.name + '<br/>';
          indicator.forEach(function (item, index) {
            var val = value[index];
            val = val === '' ? '暂无数据' : val;
            str += item.name + '：' + val + '<br/>';
          });
          return str;

        }
      },
      radar: {
        splitNumber: 4,
        radius: '58%',
        name: {
          textStyle: {
            color: 'rgb(51,51,51)',
            fontSize: 22
            // padding: [3, 5]
          }
        },
        splitArea: {
          show: false,
          areaStyle: {
            // 图表背景的颜色
            color: '#fff'
          }
        },
        axisLine: {
          show: false
        },
        splitLine: {
          show: true,
          lineStyle: {
            width: 1,
            // 设置网格的颜色
            color: 'rgb(102, 102, 102)',
          }
        },
        indicator: indicator
      },
      series: [{
        name: name,
        type: 'radar',
        symbolSize: 6,
        label: {
          show: true,
          position: 'top',
          color: 'rgb(51,51,51)',
          fontSize: 18,
          offset: [0, 0]
        },
        data: [{
          value: value,
          name: name,
          areaStyle: {
            normal: {
              color: 'rgba( 255, 100, 15, 0.0 )'
            }
          },
          itemStyle: {
            normal: {
              borderWidth: 6,
              borderColor: 'rgb(64, 125, 221)'
            }
          },
          lineStyle: {
            normal: {
              color: 'rgba(255, 100, 15,0.3)',
              type: 'solid',
              width: 3
            }
          }
        }]
      }]
    };
    myChart.setOption(option);
    return myChart;
  };
  /**
   * 柱状图
   */
  pdf.renderBarForPdf = function(element,xData,section) {
    var colorList = [
      ['#37BBF8','#ff00ff'],
      ['#BCEE68','#B2DFEE'],
      ['#8B8B00','#8B7765'],
      ['#7B68EE','#7FFF00'],
      ['#0000EE','#FFA500'],
    ];
    var sectionList = ['较差','中等','良好','优秀','极好'];
    var myChart = echarts.init(element);
    var option = {
      xAxis: {
        type: 'category',
        show: true,
        data: xData,
        axisTick: {
          show: false
        },
        axisLine: {
          show: false,
        },
        boundaryGap: true,
        axisLabel: {
          color: '#666',
          interval: 0,
          fontSize: 18,
          padding:[0,0,0,0],
        },
      },
      yAxis: {
        type: 'value',
        max: 40,
        show: false,
      },
      series: [
        {
          data: [20,20,20,20,20],
          type: 'bar',
          barWidth: '100%',
          itemStyle: {
            normal: {
              color: function (params) {
                return new echarts.graphic.LinearGradient(
                    0, 0, 1, 0,
                    [
                      {offset: 0, color: colorList[params.dataIndex][0]},
                      {offset: 1, color: colorList[params.dataIndex][1]}
                    ]
                )
              },
            }
          },
          label: {
            show: true,
            position: 'top',
            distance: 10,
            color: '#666666',
            fontSize: 16,
            formatter: function (params) {
              if (params.name == section) {
                return sectionList[params.dataIndex]+'ok';
              } else {
                return sectionList[params.dataIndex]
              }
            },
            rich: {

            }
          }
        }
      ]
    };
    myChart.setOption(option);
    return myChart;
  };
  /**
   * 获取url中的参数
   * @param name 参数名
   * @returns {*}
   */
  pdf.getQueryString = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); //定义正则表达式
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
  }
  /**
   * 【文本比较插件】
   * 传递两个参数dom1、dom2，以dom1为基准进行比较。
   * 0）dom1和dom2不能都为空；
   * 1）如果dom1不存在，则dom2为新增效果
   * 2）如果dom2不存在，则dom1为删除效果
   * 3）如果dom1和dom2存在，则进行文本差异比较
   *
   */
  pdf.MyCompare = function (dom1, dom2) {
    if (!dom1 && !dom2) {
      // console.log('参数错误：dom1、dom2不能为空。');
      return;
    }
    else if (!dom1) {
      //dom1为空：新增
      dom2.style.color = '#90EE90';
    } else if (!dom2) {
      //dom2为空：删除
      dom1.style.color = '#FF6347';
      dom1.style.textDecoration = 'line-through';
    } else {
      //进行差异比较
      var result = _eq({value1: dom1.innerText || dom1.innerHTML, value2: dom2.innerText || dom2.innerHTML});
      dom1.innerHTML = result.value1;
      dom2.innerHTML = result.value2;
    }
  }

  function _eq(op) {
    if (!op) {
      return op;
    }
    if (!op.value1_style) {
      op.value1_style = "color:#6bd5fc;";
    }
    if (!op.value2_style) {
      op.value2_style = "color:#6bd5fc;";
    }
    if (!op.eq_min) {
      op.eq_min = 3;
    }
    if (!op.eq_index) {
      op.eq_index = 5;
    }
    if (!op.value1 || !op.value2) {
      return op;
    }
    var ps = {
      v1_i: 0,
      v1_new_value: "",
      v2_i: 0,
      v2_new_value: ""
    };
    while (ps.v1_i < op.value1.length && ps.v2_i < op.value2.length) {
      if (op.value1[ps.v1_i] == op.value2[ps.v2_i]) {
        ps.v1_new_value += op.value1[ps.v1_i].replace(/</g, "<").replace(">", ">");
        ps.v2_new_value += op.value2[ps.v2_i].replace(/</g, "<").replace(">", ">");
        ps.v1_i += 1;
        ps.v2_i += 1;
        if (ps.v1_i >= op.value1.length) {
          ps.v2_new_value += "<span style='" + op.value2_style + "'>" + op.value2.substr(ps.v2_i).replace(/</g, "<").replace(">", ">") + "</span>";
          break;
        }
        if (ps.v2_i >= op.value2.length) {
          ps.v1_new_value += "<span style='" + op.value1_style + "'>" + op.value1.substr(ps.v1_i).replace(/</g, "<").replace(">", ">") + "</span>";
          break;
        }
      } else {
        ps.v1_index = ps.v1_i + 1;
        ps.v1_eq_length = 0;
        ps.v1_eq_max = 0;
        ps.v1_start = ps.v1_i + 1;
        while (ps.v1_index < op.value1.length) {
          if (op.value1[ps.v1_index] == op.value2[ps.v2_i + ps.v1_eq_length]) {
            ps.v1_eq_length += 1;
          } else if (ps.v1_eq_length > 0) {
            if (ps.v1_eq_max < ps.v1_eq_length) {
              ps.v1_eq_max = ps.v1_eq_length;
              ps.v1_start = ps.v1_index - ps.v1_eq_length;
            }
            ps.v1_eq_length = 0;
            break;//只寻找最近的
          }
          ps.v1_index += 1;
        }
        if (ps.v1_eq_max < ps.v1_eq_length) {
          ps.v1_eq_max = ps.v1_eq_length;
          ps.v1_start = ps.v1_index - ps.v1_eq_length;
        }

        ps.v2_index = ps.v2_i + 1;
        ps.v2_eq_length = 0;
        ps.v2_eq_max = 0;
        ps.v2_start = ps.v2_i + 1;
        while (ps.v2_index < op.value2.length) {
          if (op.value2[ps.v2_index] == op.value1[ps.v1_i + ps.v2_eq_length]) {
            ps.v2_eq_length += 1;
          } else if (ps.v2_eq_length > 0) {
            if (ps.v2_eq_max < ps.v2_eq_length) {
              ps.v2_eq_max = ps.v2_eq_length;
              ps.v2_start = ps.v2_index - ps.v2_eq_length;
            }
            ps.v1_eq_length = 0;
            break;//只寻找最近的
          }
          ps.v2_index += 1;
        }
        if (ps.v2_eq_max < ps.v2_eq_length) {
          ps.v2_eq_max = ps.v2_eq_length;
          ps.v2_start = ps.v2_index - ps.v2_eq_length;
        }
        if (ps.v1_eq_max < op.eq_min && ps.v1_start - ps.v1_i > op.eq_index) {
          ps.v1_eq_max = 0;
        }
        if (ps.v2_eq_max < op.eq_min && ps.v2_start - ps.v2_i > op.eq_index) {
          ps.v2_eq_max = 0;
        }
        if ((ps.v1_eq_max == 0 && ps.v2_eq_max == 0)) {
          ps.v1_new_value += "<span style='" + op.value1_style + "'>" + op.value1[ps.v1_i].replace(/</g, "<").replace(">", ">") + "</span>";
          ps.v2_new_value += "<span style='" + op.value2_style + "'>" + op.value2[ps.v2_i].replace(/</g, "<").replace(">", ">") + "</span>";
          ps.v1_i += 1;
          ps.v2_i += 1;

          if (ps.v1_i >= op.value1.length) {
            ps.v2_new_value += "<span style='" + op.value2_style + "'>" + op.value2.substr(ps.v2_i).replace(/</g, "<").replace(">", ">") + "</span>";
            break;
          }
          if (ps.v2_i >= op.value2.length) {
            ps.v1_new_value += "<span style='" + op.value1_style + "'>" + op.value1.substr(ps.v1_i).replace(/</g, "<").replace(">", ">") + "</span>";
            break;
          }
        } else if (ps.v1_eq_max > ps.v2_eq_max) {
          ps.v1_new_value += "<span style='" + op.value1_style + "'>" + op.value1.substr(ps.v1_i, ps.v1_start - ps.v1_i).replace(/</g, "<").replace(">", ">") + "</span>";
          ps.v1_i = ps.v1_start;
        } else {
          ps.v2_new_value += "<span style='" + op.value2_style + "'>" + op.value2.substr(ps.v2_i, ps.v2_start - ps.v2_i).replace(/</g, "<").replace(">", ">") + "</span>";
          ps.v2_i = ps.v2_start;
        }
      }
    }
    op.value1 = ps.v1_new_value;
    op.value2 = ps.v2_new_value;
    return op;
  }

  pdf.findInArray = function (key, value, array) {
    if (array !== null && array.length > 0) {
      return array.filter(function (item) {
        return item[key] === value;
      })[0];
    } else {
      return null;
    }
  };
  pdf.addWaterMark = function ($elementArr) {
    $elementArr.each(function (index, item) {
      var x = Math.random() * 100 + '%';
      var y = Math.random() * 100 + '%';
      $(item).css({backgroundPosition: x + '   ' + y});
    });
  };
  //星形评分图形html
  pdf.getStarHtml = function (score) {
    var fullScore = 5;
    var count = 0;
    var result = '<div class="score-star"></div>';
    var $result = $(result);
    if (typeof score !== 'number') {
      console.error('分数必须是数字')
    } else {
      var intScore = parseInt(score);
      //是否有半分
      var halfFlag = score > intScore;
      for (var i = 0; i < intScore; i++) {
        var html = '<span class="yc-icon yc-icon-star-fill light"></span>';
        $result.append(html);
        count++;
      }
      if (halfFlag) {
        $result.append('<span class="yc-icon yc-icon-star-half light"></span>');
        count++;
      }
      if (count < fullScore) {
        var reminder = fullScore - count;
        for (var j = 0; j < reminder; j++) {
          $result.append('<span class="yc-icon yc-icon-star"></span>');
        }
      }
      return $result[0];

    }

  };
  /**
   * 处理表格数据，在每一行数据长度最大的列上加上标记
   * @param tableData
   */
  pdf.processTableData = function (tableData) {
    if (tableData !== null && tableData.length > 0) {
      try {
        tableData.forEach(function (row, rowIndex) {
          var maxLength = 0;
          var maxLengthProp = '';
          for (var col in row) {
            if (row.hasOwnProperty(col)) {
              var colVal = row[col];
              if (colVal && colVal.length > maxLength) {
                maxLength = colVal.length;
                maxLengthProp = col;
              }
            }
          }
          row.longestCol = maxLengthProp;
        });
      } catch (e) {
        console.log('出错了',e);
      }
    }
    return tableData;
  };
  /**
   * 数字筛选
   */
  template.defaults.imports.filterNumber = function(number) {
    if (number !== null && number !== undefined && number !== "") {
      return number;
    } else {
      return "";
    }
  };
  template.defaults.imports.filterNumber2 = function(number) {
    if (number !== null && number !== undefined && number !== "") {
      return number;
    } else {
      return "-";
    }
  };
  template.defaults.imports.filterNumber3 = function(number) {
    if (number && number != '0.00%') {
      return number;
    } else {
      return "-";
    }
  };
  module.exports = pdf;
});


import echarts from 'echarts';
import {arrayFunc, getMinAndMax} from "./common";

/**
 * 图表对象
 * @type {{renderAreaChart(*=, *=, *=, *=): void}}
 */
export const ycChart = {
  /**
   * 绘制面积图
   * @param el dom元素
   * @param seriesName 系列名称
   * @param category 类别数组
   * @param value 值数组
   */
  renderAreaChart(el, seriesName, category, value) {
    let myChart = echarts.getInstanceByDom(el);
    if (!myChart) {
      myChart = echarts.init(el);
    }
    let $el = $(el);
    if (category && category !== null && category.length > 0 && value && value !== null && value.length > 0) {
      $el.removeClass('nodata');
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none'
          }
        },
        grid: {
          left: 5,
          right: 15,
          top: 10,
          bottom: 0,
          containLabel: true
        },
        xAxis: {
          type: 'category',
          show: true,
          boundaryGap: false,
          data: category,
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#ccc',
              type: 'dashed'
            }
          },
          axisLabel: {
            interval: 0,
            color: '#666',
            fontSize: 10
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          show: true,
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#ccc',
              type: 'dashed'
            }
          },
          axisLabel: {
            color: '#666',
            fontSize: 10
          },
          axisTick: {
            show: false
          }
        },
        series: [{
          name: seriesName,
          data: value,
          type: 'line',
          smooth: true,
          symbolSize: 7,
          symbol: 'circle',
          itemStyle: {
            color: '#41befb',
            borderColor: '#41befb'
          },
          lineStyle: {
            color: '#41befb'
          },
          areaStyle: {
            color: '#daf3ff'
          },
          label: {
            show: true,
            fontSize: 10,
            color: '#666'
          }
        }]
      };
      myChart.setOption(option);
    } else {
      $el.addClass('nodata');
      myChart.dispose();
    }
    return myChart;
  },
  /**
   * 绘制柱状图
   * @param el dom元素
   * @param seriesName 系列名称
   * @param category 类别数组
   * @param value 值数组
   */
  renderBar(el, seriesName, category, value) {
    let myChart = echarts.getInstanceByDom(el);
    if (!myChart) {
      myChart = echarts.init(el);
    }
    let $el = $(el);
    if (!arrayFunc.isEmpty(category) && !arrayFunc.isEmpty(value)) {
      $el.removeClass('nodata');
      let option = {
        color: '#75debd',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none'
          }
        },
        grid: {
          left: 5,
          right: 15,
          top: 10,
          bottom: 0,
          containLabel: true
        },
        xAxis: {
          type: 'category',
          show: true,
          // boundaryGap: false,
          data: category,
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#ccc',
              type: 'solid'
            }
          },
          axisLabel: {
            interval: 0,
            color: '#666',
            fontSize: 10
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          show: true,
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#ccc',
              type: 'solid'
            }
          },
          axisLabel: {
            color: '#666',
            fontSize: 10
          },
          axisTick: {
            show: false
          }
        },
        series: [
          {
            name: seriesName,
            type: 'bar',
            barWidth: '30%',
            barMaxWidth: '50px',
            data: value,
            itemStyle: {
              barBorderRadius: 10
            },
            label: {
              show: true,
              fontSize: 10,
              color: '#666',
              position: 'top'
            }
          }
        ]
      };
      myChart.setOption(option);
    } else {
      $el.addClass('nodata');
      myChart.dispose();
    }
    return myChart;
  },
  /**
   * 绘制柱状图
   * @param el dom元素
   * @param seriesName 系列名称
   * @param category 类别数组
   * @param value 值数组
   * @param markX 需要标注线的x轴值名称
   */
  renderBar2(el, seriesName, category, value, markX) {
    let myChart = echarts.getInstanceByDom(el);
    if (!myChart) {
      myChart = echarts.init(el);
    }
    let $el = $(el);
    if (!arrayFunc.isEmpty(category) && !arrayFunc.isEmpty(value)) {
      $el.removeClass('nodata');
      let option = {
        color: '#e64e00',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none'
          }
        },
        grid: {
          left: 5,
          right: 15,
          top: 35,
          bottom: 0,
          containLabel: true
        },
        xAxis: {
          type: 'category',
          show: true,
          // boundaryGap: false,
          data: category,
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#ccc',
              type: 'solid'
            }
          },
          axisLabel: {
            interval: 0,
            color: '#666',
            fontSize: 10,
            formatter:(params)=>{
              return `(${params}]`
            }
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          show: true,
          splitNumber: 5,
          splitLine: {
            show: true,
            lineStyle: {
              color: '#eee'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#ccc',
              type: 'solid'
            }
          },
          axisLabel: {
            color: '#666',
            fontSize: 10
          },
          axisTick: {
            show: false
          }
        },
        series: [
          {
            name: seriesName,
            type: 'bar',
            barWidth: '30%',
            barMaxWidth: '50px',
            data: value,
            itemStyle: {
              // barBorderRadius: 10
            },
            label: {
              show: true,
              fontSize: 10,
              color: '#666',
              position: 'top'
            },
            markLine: {
              symbol: 'none',
              lineStyle: {
                normal: {
                  color: '#ccc',
                  type: 'dashed',
                  width: 2
                }
              },
              label: {
                show: false
              },
              data: [
                // {yAxis : getMinAndMax(value).max},
                {xAxis: markX}
              ]
            }
          }
        ]
      };
      myChart.setOption(option);
    } else {
      $el.addClass('nodata');
      myChart.dispose();
    }
    return myChart;
  },
  /**
   * 绘制曲线图
   * @param el dom元素
   * @param seriesName 系列名称
   * @param category 类别数组
   * @param value 值数组
   */
  renderLine(el, seriesName, category, value) {
    let myChart = echarts.getInstanceByDom(el);
    if (!myChart) {
      myChart = echarts.init(el);
    }
    let $el = $(el);
    if (!arrayFunc.isEmpty(category) && !arrayFunc.isEmpty(value)) {
      $el.removeClass('nodata');
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none'
          }
        },
        grid: {
          left: 5,
          right: 15,
          top: 10,
          bottom: 0,
          containLabel: true
        },
        xAxis: {
          type: 'category',
          show: true,
          // boundaryGap: false,
          data: category,
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#ccc',
              type: 'solid'
            }
          },
          axisLabel: {
            interval: 0,
            color: '#666',
            fontSize: 10
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          show: true,
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#ccc',
              type: 'solid'
            }
          },
          axisLabel: {
            color: '#666',
            fontSize: 10
          },
          axisTick: {
            show: false
          }
        },
        series: [{
          name: seriesName,
          data: value,
          type: 'line',
          // smooth: true,
          symbolSize: 7,
          symbol: 'circle',
          itemStyle: {
            color: '#3ad0a1',
            borderColor: '#3ad0a1'
          },
          lineStyle: {
            color: '#3ad0a1'
          },
          label: {
            show: true,
            color: '#666',
            fontSize: 10
          }
        }]
      };
      myChart.setOption(option);
    } else {
      $el.addClass('nodata');
      myChart.dispose();
    }
    return myChart;
  },
  /**
   * 雷达图
   * @param element
   * @param indicator
   * @param value
   * @param name
   * @returns {*}
   */
  renderRadar(element, indicator, value, name) {
    let myChart = echarts.init(element);
    let option = {
      tooltip: {
        trigger: 'item',
        enterable: true,
        confine: true,
        formatter: function (params) {
          let str = params.name + '<br/>';
          indicator.forEach((item, index) => {
            let val = value[index];
            val = val === '' ? '暂无数据' : val;
            str += item.name + '：' + val + '<br/>';
          });
          return str;

        }
      },
      color: ['#29CC97'],
      radar: {
        splitNumber: 4,
        radius: '65%',
        name: {
          textStyle: {
            color: '#666',
            fontSize: 18,
            padding: [5, 5]
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
            color: '#eee'
          }
        },
        indicator: indicator
      },
      series: [{
        name: name,
        type: 'radar',
        symbolSize: 1,
        label: {
          show: true,
          position: 'insideBottom',
          distance: 5,
          color: '#666',
          formatter: (params) =>{
            return `{a|${params.value}}`
          },
          rich: {
            a: {
              color: '#666',
              backgroundColor: {
                image : require('../img/rander-bg2.png'),
              },
              fontSize: 12,
              align: 'center',
              width: 67,
              height:33,
            }
          }
        },
        data: [{
          value: value,
          name: name,
          areaStyle: {
            normal: {
              color: 'rgba( 255, 147, 15, 0.2 )'
            }
          },
          itemStyle: {
            color: '#FF930F',
            // borderWidth: 0
          },
          lineStyle: {
            normal: {
              color: '#FF930F',
              type: 'solid',
              // width: 1
            }
          }
        }]
      }]
    };
    myChart.setOption(option);
    return myChart;
  },
  /**
   * 雷达图（用于pdf报告页面）
   * @param element
   * @param indicator
   * @param value
   * @param name
   * @returns {*}
   */
  renderRadarForPdf(element, indicator, value, name) {
    let myChart = echarts.init(element);
    let option = {
      tooltip: {
        trigger: 'item',
        enterable: true,
        confine: true,
        formatter: function (params) {
          let str = params.name + '<br/>';
          indicator.forEach((item, index) => {
            let val = value[index];
            val = val === '' ? '暂无数据' : val;
            str += item.name + '：' + val + '<br/>';
          });
          return str;

        }
      },
      radar: {
        splitNumber: 4,
        radius: '65%',
        name: {
          textStyle: {
            color: '#333',
            fontSize: 56
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
        symbolSize: 10,
        label: {
          show: true,
          position: 'top',
          color: '#ff8746',
          fontSize: 36,
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
              borderWidth: 10,
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
  },
  /**
   * 绘制柱状图(多个系统)
   * @param options 配置选项
   */
  renderBars(options) {
    let el = options.el;
    let seriesName = options.seriesName;
    let category = options.category;
    let value = options.value;
    let xAxisTitle = options.xAxisTitle;
    let yAxisTitle = options.yAxisTitle;
    let myChart = echarts.getInstanceByDom(el);
    if (!myChart) {
      myChart = echarts.init(el);
    }
    let $el = $(el);
    if (!arrayFunc.isEmpty(category) && !arrayFunc.isEmpty(value)) {
      $el.removeClass('nodata');
      let series = [];
      value.forEach((item, index) => {
        series.push({
          name: seriesName[index],
          type: 'bar',
          barWidth: '20%',
          barMaxWidth: '50px',
          data: item,
          label: {
            show: true,
            fontSize: 10,
            color: '#666',
            position: 'top'
          }
        });
      });
      let option = {
        legend: {
          data: series,
          top: 0,
          itemWidth: 12,
          itemHeight: 12,
          textStyle: {
            color: '#666',
            fontSize: 10
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none'
          }
        },
        grid: {
          left: 5,
          right: 15,
          top: 30,
          bottom: 0,
          containLabel: true
        },
        xAxis: {
          type: 'category',
          show: true,
          // boundaryGap: false,
          data: category,
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#ccc',
              type: 'solid'
            }
          },
          axisLabel: {
            // interval: 0,
            color: '#666',
            fontSize: 10
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          name: yAxisTitle,
          nameTextStyle: {
            fontSize: 10,
            color: '#666',
            padding: [0, 0, 0, 5]
          },
          show: true,
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#ccc',
              type: 'solid'
            }
          },
          axisLabel: {
            color: '#666',
            fontSize: 10
          },
          axisTick: {
            show: false
          }
        },
        color: ['#73cffc', '#5ad6c4'],
        series: series
      };
      myChart.setOption(option);
    } else {
      $el.addClass('nodata');
      myChart.dispose();
    }
    return myChart;
  },
};


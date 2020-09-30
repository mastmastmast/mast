define(function (require, exports, module) {
  var pdf = require('pdf');
  var echarts = require('echarts');
  var $ = require('jquery');
  var api = require('api');
  var template = require('art-template');
  var data = {
    holderList: [],
    investorList: []
  };
  module.exports = {
    load: function () {
      this.drawChart(pdf.companyName);
      pdf.addWaterMark($('.watermark'));
    },
    drawChart: function (companyName) {
      new api({
        url: 'enterpriseInfo/selectCorrelation',
        data: {
          companyName: companyName
        },
        success: function (res) {
          data.holderList = res.data.holderList;
          data.investorList = res.data.investorList;
          var tempHolderList = data.holderList !== null && data.holderList.length > 2 ? data.holderList.slice(0, 3) : data.holderList;
          var tempInvestorList = data.investorList !== null && data.investorList.length > 2 ? data.investorList.slice(0, 3) : data.investorList;
          if (tempHolderList !== null && tempHolderList.length > 0) {
            tempHolderList.forEach(function (item, index) {
              item.emphasis = !(index !== 0 || ((item.money === null || item.money === '' || item.money === '-') && (item.proportion === null || item.proportion === '' || item.proportion === '-')));
              item.isCompany = item.type === '1';
              item.type = 1;
            });
          }
          if (tempInvestorList !== null && tempInvestorList.length > 0) {
            tempInvestorList.forEach(function (item, index) {
              item.emphasis = false;
              item.isCompany = true;
              item.type = 2;
            });
          }
          var companyArr = tempHolderList.concat(tempInvestorList);
          $('#relationship-info').html(template('relationship-tp', data));
          var el = document.getElementById('relationship-chart');
          var nodeWidth = 350;
          var nodeHeight = 230;
          var titleHeight = 64;
          var targetWidth = 350;
          var containerHeight = $(el).height();
          var holderList = {
            name: pdf.companyName,
            children: tempHolderList
          };

          var investorList = {
            name: pdf.companyName,
            children: tempInvestorList
          };
          var myChart = echarts.init(el);
          var option = {
            series: [
              {
                type: 'tree',
                left: 20,
                right: 20,
                zlevel: 1,
                top: 150,
                z: 2,
                data: [holderList],
                bottom: containerHeight / 2,
                symbol: 'rect',
                symbolSize: [nodeWidth, nodeHeight],
                orient: 'BT',
                expandAndCollapse: true,
                label: {
                  show: true,
                  position: 'inside',
                  verticalAlign: 'middle',
                  align: 'center',
                  formatter: function (params) {
                    return params.data.name
                  }
                },
                itemStyle: {
                  shadowBlur: 0,
                  color: '#fff',
                  borderWidth: 0,
                  borderColor: '#fff'
                },
                emphasis: {
                  itemStyle: {
                    shadowBlur: 0,
                    color: '#fff',
                    borderWidth: 0,
                    borderColor: '#fff'
                  }
                },

                leaves: {
                  itemStyle: {
                    shadowBlur: 0,
                    color: '#fff',
                    borderWidth: 0,
                    borderColor: '#fff'
                  },
                  label: {
                    normal: {
                      show: true,
                      position: 'inside',
                      verticalAlign: 'middle',
                      align: 'center',
                      color: '#fff'
                    }
                  }
                },

              },
              {
                type: 'tree',
                left: 20,
                right: 20,
                zlevel: 1,
                z: 2,
                data: [investorList],

                top: containerHeight / 2,
                symbol: 'rect',
                symbolSize: [nodeWidth, nodeHeight],
                orient: 'TB',
                expandAndCollapse: true,
                itemStyle: {
                  shadowBlur: 0,
                  color: '#fff',
                  borderWidth: 0,
                  borderColor: '#fff'
                },

                leaves: {
                  itemStyle: {
                    shadowBlur: 0,
                    color: '#fff',
                    borderWidth: 0,
                    borderColor: '#fff'
                  }
                },
                label: {
                  normal: {
                    show: true,
                    position: 'inside',
                    verticalAlign: 'middle',
                    align: 'center',
                  }
                }
              }
            ]
          };
          myChart.setOption(option);
          var zr = myChart.getZr();
          var storage = zr.storage;
          var finished = false;
          myChart.on('finished', function () {
            if (!finished) {
              finished = true;
              var rectList = zr.storage.getDisplayList().filter(function (item) {
                return item.shape.symbolType !== undefined && item.shape.symbolType === 'rect';
              });
              rectList.forEach(function (item, index) {
                item.style.lineWidth = 1;
                var text = item.style.text;
                var companyInfo = pdf.findInArray('name', text, companyArr);
                //如果不是目标公司
                if (text !== pdf.companyName) {
                  var rect1 = new echarts.graphic.Rect({
                    shape: {
                      x: item.transform[4] - nodeWidth / 2,
                      y: item.transform[5] - nodeHeight / 2,
                      width: nodeWidth,
                      height: nodeHeight,
                      r: [5]
                    },
                    style: {
                      fill: '#fff',
                      stroke: '#b8e8ff',
                      lineWidth: 1
                    },
                    zlevel: 1,
                    z: 3
                  });

                  var titleRect = new echarts.graphic.Rect({
                    rectHover: true,
                    shape: {
                      x: item.transform[4] - nodeWidth / 2,
                      y: item.transform[5] - nodeHeight / 2,
                      width: nodeWidth,
                      height: titleHeight,
                      r: [5, 5, 0, 0]
                    },
                    style: {
                      fill: '#b8e8ff',
                      text: text,
                      fontSize: 24,
                      textFill: '#333',
                      textPadding: [0, 5],
                      truncate: {
                        outerWidth: nodeWidth
                      }
                    },
                    zlevel: 1,
                    z: 4
                  });
                  var infoText = companyInfo.type === 1 ? '认缴金额：' + (companyInfo.money ? companyInfo.money : '-') + '\n投持比例：' + (companyInfo.proportion ? companyInfo.proportion : '-') : '注册资本：' + (companyInfo.money ? companyInfo.money : '-') + '\n投持比例：' + (companyInfo.proportion ? companyInfo.proportion : '-') + '\n企业状态：' + companyInfo.status
                  var infoRect = new echarts.graphic.Rect({
                    shape: {
                      x: item.transform[4] - nodeWidth + 10,
                      y: item.transform[5] - nodeHeight / 2 + titleHeight + 20,
                      width: nodeWidth,
                      height: 2 * titleHeight,
                      r: [0]
                    },
                    style: {
                      fill: 'none',
                      text: infoText,
                      fontSize: 24,
                      stroke: 'none',
                      lineWidth: 0,
                      textAlign: 'left',
                      textVerticalAlign: 'middle',
                      textLineHeight: 50,
                      truncate: {
                        outerWidth: nodeWidth
                      }
                    },
                    zlevel: 1,
                    z: 3
                  });
                  zr.add(rect1);
                  storage.addToStorage(rect1);
                  zr.add(titleRect);
                  storage.addToStorage(titleRect);
                  zr.add(infoRect);
                  storage.addToStorage(infoRect);
                } else {
                  var rect2 = new echarts.graphic.Rect({
                    shape: {
                      x: item.transform[4] - nodeWidth / 2 - (targetWidth - nodeWidth) / 2,
                      y: item.transform[5] - nodeHeight / 2,
                      width: targetWidth,
                      height: nodeHeight,
                      r: [5]
                    },
                    style: {
                      fill: '#66bce4',
                      text: pdf.companyName,
                      textFill: '#fff',
                      fontSize: 24,
                      stroke: '#66bce4',
                      lineWidth: 1,
                      truncate: {
                        outerWidth: targetWidth
                      }
                    },
                    zlevel: 1,
                    z: 3
                  });
                  zr.add(rect2);
                  storage.addToStorage(rect2);
                }
                if (companyInfo !== undefined && companyInfo !== null && companyInfo.emphasis) {
                  // console.log(123);
                  var marker = new echarts.graphic.Image({
                    style: {
                      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMcAAAAoCAYAAABKF+6RAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkEyQkQ1RDk0NDNDNjExRTk5NDYyOTY4QzEzMzY3MTU0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkEyQkQ1RDk1NDNDNjExRTk5NDYyOTY4QzEzMzY3MTU0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QTJCRDVEOTI0M0M2MTFFOTk0NjI5NjhDMTMzNjcxNTQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QTJCRDVEOTM0M0M2MTFFOTk0NjI5NjhDMTMzNjcxNTQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6wtniPAAACgUlEQVR42uydT4hNURzHz5x5REmyUjaULCYLCxs1G9lhITtNUiNFIk2akSQUCQ1NTZIoCTs22BkLrFioEYqSGgtKGSn/huf7m3uvrundP563Oufzqc/05t6z+na/nXvOvW+mqznUuOWcW+8AIM81rx/75A+yAPjDG7nLyvFCjpAHwDQ/5Rb50acHjsp35ALgTsj79iErxyd5kFwgch7JI9kvPnfiknxMPhApn2Vffv2dL8cvuVc2yQkixK79l/kDfsaAh/I6OUFk3JQXZx70LQYOplMMQAy8ldtbnfAFg0+SGUSALSG2yg91y2Gckq/JDgLnjLxbdLKoHF9d8uQcIFSeyANlA3zJuRvyHhlCgHxxybbtt3bLYeyRU2QJgWGbTs+qBlWV46k8T5YQELflaJ2BvsYYXkqEkLB1RrNT5dhNnhAQx2RXJ8qxQu4gTwiIDXJnJ8pht1QN8oTAOC17/qccG+UacoQAmSuvytntlGOOHCZDCJiV8ng75bCn40vJDwJnQK79l3IslkPkBhFgu1aX5cK65bA3cueRG0SCTQYX6pRjtdxMXhAZm+S2snLY5xFX8wEJQGCclcuKytEvV5ERRIotJWx7d1Z2oPtw73Q/5rvkFXXWGhD7+sMKMZafOQ7JRWQD4PbL3qwcy13yvQ0A0N2UvCIXWDmG8/dZAOCWyNHGnVdTz135vyBg9wpCpex7He9t5hhMV+kAkGB9GPBpe/qzFTpA5IylfWhmu1XfXfKUcJxsIGLG0x5YH/56CDgp18kJMoIImUiv/8nsgK8aABABLScGXzW1AARO4ZLCVy1KyA4CpnQzqruvp3RxYn8u8QEZQqDY9X2u6ORvAQYASm5qc417EvsAAAAASUVORK5CYII=',
                      x: item.transform[4] - nodeWidth / 2 - 14,
                      y: item.transform[5] - nodeHeight / 2 - 45,
                      width: nodeWidth + 28,
                      height: 60,
                    },
                    zlevel: 1,
                    z: 4
                  });
                  var emphasisRect = new echarts.graphic.Rect({
                    rectHover: true,
                    shape: {
                      x: item.transform[4] - nodeWidth / 2 - 14,
                      y: item.transform[5] - nodeHeight / 2 - 45,
                      width: nodeWidth + 28,
                      height: 60,
                      r: [5, 5, 0, 0]
                    },
                    style: {
                      fill: 'none',
                      text: '一级实际控制人',
                      fontSize: 24,
                      textFill: '#fff',
                      textPadding: [0, 5],
                      truncate: {
                        outerWidth: nodeWidth
                      }
                    },
                    zlevel: 1,
                    z: 5
                  });
                  zr.add(marker);
                  storage.addToStorage(marker);
                  zr.add(emphasisRect);
                  storage.addToStorage(emphasisRect);
                }
                zr.flush();
              });
            }
          });
        }
      });
    }
  };
});

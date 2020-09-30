<template>
  <div class="table-nodata" v-if="tableData==null ||tableData.length===0">
    暂无数据
  </div>
  <div class="vertical-table-wrapper" v-else>
    <table class="vertical-table" :class="{ellipsis:ellipsis}">
      <tbody class="vertical-table-body">
      <tr class="vertical-table-row" v-for="(item,index) in dataGroup" :key="'tr-'+index">
        <template v-for="(dataItem,subIndex) in item">
          <td class="cell label" :class="{fill:fillLabel}" :width="dataItem.labelWidth">
            {{dataItem.label}}
          </td>
          <td class="cell value" :class="{emphasis:dataItem.emphasis}" :colspan="dataItem.colpsan">
            <el-tooltip v-if="ellipsis" class="item" effect="dark" placement="bottom-start" :content="dataItem.value"
                        popper-class="dds-tooltip">
              <span>{{dataItem.value}}</span>
            </el-tooltip>
            <template v-else>
              {{dataItem.value}}
            </template>
          </td>
        </template>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'verticalTable',
    props: {
      dataItemCountPerRow: {
        type: Number
      },
      labelWidth: {
        type: String
      },
      tableData: {
        type: Array,
        default:[]
      },
      ellipsis: {
        type: Boolean,
        default: false
      },
      //label是否需要填充色
      fillLabel: {
        type: Boolean,
        default: false
      },
      //用户是否可自定义数据项的宽度
      customWidth: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        //分组
        dataGroup: []
      };
    },
    watch: {
      tableData(newVal) {
        let labelWidth = this.labelWidth;
        let reg = /^\d+%$/;
        //如果标题的宽度是百分比，将标题的宽度百分比转换成相对于一行的百分比
        let dataItemCountPerRow = this.dataItemCountPerRow;
        if (reg.test(labelWidth)) {
          labelWidth = parseFloat(labelWidth) / dataItemCountPerRow + '%';
        }
        console.log('labelWidth', labelWidth);
        let tempData = [...newVal];
        //分组后的数据
        let dataGroup = [];
        if (tempData !== null && tempData.length > 0) {
          let dataLength = tempData.length;
          //将一行显示的数据项放到一个数组中
          for (let i = 0; i < dataLength; i += dataItemCountPerRow) {
            dataGroup.push(tempData.slice(i, i + dataItemCountPerRow));
          }
          //一行的td数
          let tdCountPerRow = 2 * dataItemCountPerRow;
          //最后一行的td数
          let tdCountLastRow = 2 * dataGroup[dataGroup.length - 1].length;
          dataGroup.forEach((item, index) => {
            item.forEach((subItem, subIndex) => {
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
        this.dataGroup = dataGroup;
        console.log('this.dataGroup', this.dataGroup);
      }
    },
    created() {
      let labelWidth = this.labelWidth;
      let reg = /^\d+%$/;
      //如果标题的宽度是百分比，将标题的宽度百分比转换成相对于一行的百分比
      let dataItemCountPerRow = this.dataItemCountPerRow;
      if (reg.test(labelWidth)) {
        labelWidth = parseFloat(labelWidth) / dataItemCountPerRow + '%';
      }
      console.log('labelWidth', labelWidth);
      let tempData =[...this.tableData];
      //分组后的数据
      let dataGroup = [];
      if (tempData !== null && tempData.length > 0) {
        let dataLength = tempData.length;
        //将一行显示的数据项放到一个数组中
        for (let i = 0; i < dataLength; i += dataItemCountPerRow) {
          dataGroup.push(tempData.slice(i, i + dataItemCountPerRow));
        }
        //一行的td数
        let tdCountPerRow = 2 * dataItemCountPerRow;
        //最后一行的td数
        let tdCountLastRow = 2 * dataGroup[dataGroup.length - 1].length;
        dataGroup.forEach((item, index) => {
          item.forEach((subItem, subIndex) => {
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
      this.dataGroup = dataGroup;
      console.log('this.dataGroup', this.dataGroup);
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/css/components/vertical-table";
</style>

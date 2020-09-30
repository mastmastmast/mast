<template>
  <div class="pagination" v-show="pagination.total>0">
    <div class="fl">
      共{{pagination.total}}条记录，第{{pagination.pageNum}}/{{pagination.maxPage}}页
    </div>
    <el-pagination class="fr"
                   background
                   :disabled="disabled"
                   layout="prev, pager, next"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :page-size="pagination.pageSize"
                   :current-page="pagination.pageNum"
                   :total="pagination.total">
    </el-pagination>
  </div>
</template>

<script>
  import xhr from '../api/axiosConfig';
  import {loading} from "../assets/js/common";

  export default {
    name: 'pagination',
    props: {
      pagination: {
        type: Object,
        default: function () {
          return {
            //当前页码
            pageNum: 1,
            //每页显示的自然数
            pageSize: 10,
            //总数据条数
            total: 0,
            maxPage: 0,
            //请求地址
            url: '',
            //请求类型
            method: 'post',
            //其它请求参数
            params: {}
          };
        }
      },
      //dom元素
      container: {
        default: function () {
          return null;
        }
      }
    },
    data() {
      return {
        disabled: false
      }
    },
    watch: {
      pagination: {
        handler(newVal) {
          let remainder = newVal.total % newVal.pageSize;
          let number = parseInt(newVal.total / newVal.pageSize);
          this.pagination.maxPage = remainder > 0 ? number + 1 : number;
        },
        deep: true
      }

    },
    mounted() {
      // let remainder = this.pagination.total % this.pagination.pageSize;
      // let number = parseInt(this.pagination.total / this.pagination.pageSize);
      // this.pagination.maxPage = remainder > 0 ? number + 1 : number;
    },
    methods: {
      /**
       * @param pageSize 每页显示的条数
       *修改每页显示的数据条数
       */
      handleSizeChange(pageSize) {
        let pagination = this.pagination;
        pagination.pageSize = pageSize;
        let params = pagination.params;
        params.pageSize = pageSize;
        let config = {
          url: pagination.url,
          method: pagination.method || 'post'
        };
        if (config.method === 'get') {
          config.params = params;
        } else {
          config.data = params;
        }
        this.paginationRequest(config, params);
      },
      paginationRequest: function (config, params) {
        let loadingId;
        if (this.container !== null) {
          loadingId = loading.addLoading(this.container)
        }
        this.disabled = true;
        let vm = this;
        xhr.request(config).then(res => {
          let data = res.data;
          let result = data.listData;
          let newPagination = {
            pageNum: this.pagination.pageNum,
            pageSize: this.pagination.pageSize,
            total: data.total,
            url: this.pagination.url,
            method: this.pagination.method || 'post',
            params: params
          };
          this.$emit('changePage', {
            tableData: result,
            pagination: newPagination
          });
          if (loadingId) {
            setTimeout(()=>{
              loading.removeLoading(loadingId);
            },200)
          }
          this.disabled = false;
        }).catch(function (err) {
          if (loadingId) {
            setTimeout(()=>{
              loading.removeLoading(loadingId);
            },200)
          }
          vm.disabled = false;
        });
      }, /**
       * 页码跳转
       * @param pageNum 当前页码
       */
      handleCurrentChange(pageNum) {
        let pagination = this.pagination;
        pagination.pageNum = pageNum;
        let params = pagination.params;
        params.pageNum = pageNum;
        params.pageSize = pagination.pageSize;
        let config = {
          url: pagination.url,
          method: pagination.method || 'post'
        };
        if (config.method === 'get') {
          config.params = params;
        } else {
          config.data = params;
        }
        this.paginationRequest(config, params);
      }
    }
  };
</script>

<style scoped>

</style>

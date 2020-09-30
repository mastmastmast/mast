<template>
  <div class="img-content" v-show="showImgValidator" :id="validatorId">
    <div class="close el-icon-close" @click="close"></div>
    <div class="operation">
      <span class="fl">完成拼图验证</span>
      <span class="fr" @click="initImgValidator"><a class="el-icon-refresh">换一换</a></span>
    </div>
    <div class="img-block">
      <div>
        <img :src="imgConfig.imgUrl" style="width:100%;height:120px;" class="parent-block">
        <img :src="imgConfig.subBlockUrl" class="sub-block" :style="{top:imgConfig.top,left:subBlockLeftParent}">
        <div class="move-bar">
          <div class="move-block" :style="{left:moveBlockLeftParent}"
               :class="{moving:isMoving,'el-icon-arrow-right':!success&&!error,'el-icon-check':success,'el-icon-close':error}"
               @mousedown="startMove" @mousemove="move" @mouseup="end"></div>
          <div class="left-bar" :style="{width:leftBarWidth}"></div>
          <span class="validate-msg">拖动滑块，完成拼图验证</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { authentication } from '../api/api-login';

  export default {
    name: 'imgValidator',
    props: ['showImgValidator'],
    watch: {
      showImgValidator(newVal, oldVal) {
        if (newVal) {
          this.initImgValidator();
        }

      }
    },
    data() {
      return {
        validatorId: new Date().getTime(),
        imgConfig: {
          imgUrl: '',
          subBlockUrl: '',
          top: '0px',
          uuid: ''
        },
        //是否停止移动鼠标
        isEnd: false,
        //鼠标是否在移动
        isMoving: false,
        //拖动的像素
        movedDistance: 0,
        //滑块距父元素左边距离
        moveBlockLeftParent: 0,
        //已经滑过的宽度
        leftBarWidth: 0,
        //抠图距离父级元素左边的距离
        subBlockLeftParent: 0,
        success: false,
        error: false,
        $moveBlock: [],
        $moveBar: [],
        moveBarWidth: 0,
        moveBlockWidth: 0,
        $subBlock: [],
        $leftBar: [],
        $msg: [],
        originalOffsetLeft: 0,
        //初始状态滑块距父元素左边距离
        originalLeftParent: 0,
        hasInitParams: false
      };
    },
    methods: {
      initParams() {
        let $validator = $('#' + this.validatorId);
        //拖动的滑块
        let $moveBlock = $validator.find('.move-block');
        this.$moveBlock = $moveBlock;
        //拖动滑块的区域
        this.$moveBar = $validator.find('.move-bar');
        this.moveBarWidth = this.$moveBar.width();
        this.moveBlockWidth = this.$moveBlock.width();
        //图片抠图
        this.$subBlock = $validator.find('.sub-block');
        //拖动过的区域
        this.$leftBar = $validator.find('.left-bar');
        //提示消息
        this.$msg = $validator.find('.validate-msg');
        this.originalOffsetLeft = getLeft($moveBlock[0]);
        this.hasInitParams = true;
        this.originalLeftParent = $moveBlock[0].offsetLeft;

        function getLeft(e) {
          let offset = e.offsetLeft;
          if (e.offsetParent != null) {
            offset += getLeft(e.offsetParent);
          }
          return offset;
        }
      },

      /**
       * 初始化图片验证
       */
      initImgValidator() {
        this.isEnd = false;
        this.isMoving = false;
        this.moveBlockLeftParent = 0;
        this.subBlockLeftParent = 0;
        this.leftBarWidth = 0;
        this.success = false;
        this.error = false;
        this.hasInitParams = false;

        authentication.validator.getValidateImg().then(res => {
          const data = res.data;
          this.imgConfig.imgUrl = data.oriCopyImage;
          this.imgConfig.subBlockUrl = data.newImage;
          this.imgConfig.uuid = data.uuid;

          const vm = this;
          //拖动的滑块
          const $moveBlock = $('#' + this.validatorId).find('.move-block');
          $moveBlock[0].onselectstart = document.body.ondrag = function() {
            return false;
          };
          $(window).on('mousemove', function(e) {
            vm.move(e);
          });
          $(window).on('mouseup', function(e) {
            vm.end();
          });
        });

      },
      startMove(e) {
        if (!this.hasInitParams) {
          this.initParams();
        }
        if (!this.isEnd) {
          e.stopPropagation();
          const $msg = $('.validate-msg');
          $msg.text('');
          this.isMoving = true;
        }
      },
      move(e) {
        if (this.isMoving && !this.isEnd) {
          const x = e.pageX;
          let movedDistance = x - this.originalOffsetLeft;
          let leftParent = this.originalLeftParent + movedDistance;
          //能够移动的最大距离
          const maxMoveDistance = this.moveBarWidth - this.moveBlockWidth;
          leftParent = leftParent > maxMoveDistance ? maxMoveDistance : leftParent;
          this.moveBlockLeftParent = leftParent + 'px';
          this.leftBarWidth = leftParent + this.moveBlockWidth + 'px';
          this.subBlockLeftParent = leftParent + 'px';
          this.movedDistance = parseInt(leftParent - this.originalLeftParent);
        }
      },
      end(e) {
        if (!this.isEnd && this.isMoving) {
          this.isEnd = true;
          this.isMoving = false;
          this.validate();
        }
      },
      /**
       * 验证拼图是否成功
       */
      validate() {
        authentication.validator.validateImg({
          uuid: this.imgConfig.uuid,
          xLength: this.movedDistance
        }).then(res => {
          if (res.code === '200') {
            this.success = true;
            this.$emit('success');
          } else {
            this.error = true;
            setTimeout(this.initImgValidator,300);
            this.$emit('error');
          }
        }).catch(err => {
          setTimeout(this.initImgValidator,300);
          this.$emit('error');
        });
      },
      close() {
        this.$emit('close');
      }
    }
  };
</script>

<style scoped lang="scss">
  $sub-block-width: 30px;
  $sub-block-height: 120px;
  $sub-block-left: 15px;
  .img-content {
    position: relative;
    margin: auto;
    /*width: 320px;*/
    height: 100%;
    & .close {
      position: absolute;
      top: 0;
      right: 0;
      width: 30px;
      height: 30px;
      line-height: 30px;
      font-size: 16px;
      font-weight: bold;
      text-align: center;
      color: #ccc;
      cursor: pointer;

    }
    & .img-block {
      position: relative;
      padding: 0 10px 15px;
      width: 100%;
      box-sizing: border-box;
      > div {
        position: relative;
      }
      & .parent-block {
        position: relative;
        height: 120px;
        border-radius: 5px;
        &::after {
          content: "图片加载中";
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 100%;
          line-height: 120px;
          background: #eee;
          text-align: center;
        }
      }
      & .move-bar {
        position: relative;
        width: 100%;
        height: 42px;
        line-height: 42px;
        text-align: center;
        color: #ccc;
        background: #f2f2f2;
        border: 1px solid #e0e3ec;
        border-radius: 20px;
        box-sizing: border-box;
      }
      & .move-block {
        position: absolute;
        left: 0;
        top: 0;
        overflow: hidden;
        height: 40px;
        line-height: 40px;
        width: 40px;
        font-size: 16px;
        font-weight: bold;
        color: #999;
        border-radius: 20px;
        box-shadow: 1px 0 5px rgba(0, 0, 0, .05),
        -1px 0 5px rgba(0, 0, 0, .05);
        background: #fff;
        box-sizing: border-box;
        z-index: 1001;
        cursor: pointer;
        &.moving {
          background: rgb(68, 204, 254);
          color: #fff;
        }
      }
      & .left-bar {
        position: absolute;
        top: 0;
        width: 0;
        height: 40px;
        border-radius: 20px;
        background: #33bb44;
        z-index: 1000;
      }
    }
    & .sub-block {
      position: absolute;
      width: $sub-block-width;
      height: $sub-block-height;
      left: $sub-block-left;
      z-index: 9999;
      &::after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: #eee;
      }
    }
    & .operation {
      padding: 20px 16px 0;
      overflow: hidden;
    }

  }

  a {
    font-size: 14px !important;
    color: #01aff1;
  }

</style>

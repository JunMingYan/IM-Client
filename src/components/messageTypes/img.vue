<template>
  <div class="message-type__img">
    <img v-show="!imgLoading" style="cursor: zoom-in" :src="message.message" alt="图片加载失败" @load="load"
         @click.stop="setShowPicturePreview(true)" @error="imgError">
    <div v-if="imgLoading" class="img-loading-tips"></div>
    <div v-if="message.uploading && !message.uploadPercent" class="all0 img-cover">图片上传中...</div>
    <div v-if="message.uploadPercent" class="all0 img-cover progress">
      <div class="content">
        <el-progress :width="50" type="circle" :percentage="message.uploadPercent"></el-progress>
      </div>
    </div>
    <transition name="fade">
      <picture-preview
        v-if="showPicturePreview"
        :current-img="message.message"
        :img-list="imgUrlList"
        @setshow="setShowPicturePreview"
      />
    </transition>
  </div>
</template>

<script>
  import './../../../static/iconfont/iconfont.css'
  import './../../../static/css/animation.scss'
  import picturePreview from '@/components/picturePreview'

  export default {
    props: ['message', 'imgTypeMsgList'],
    data() {
      return {
        showPicturePreview: false,
        imgLoading: true
      }
    },
    computed: {
      imgUrlList() {
        return (this.imgTypeMsgList || []).map(item => item.message)
      }
    },
    methods: {
      setShowPicturePreview(flag) {
        this.showPicturePreview = flag
      },
      load() {
        this.imgLoading = false
      },
      imgError() {
        this.imgLoading = false
      }
    },
    components: {
      picturePreview
    }
  }
</script>

<style lang="scss">
  .message-type__img {
    position: relative;
    overflow: hidden;
    border-radius: 5px;

    img {
      background-color: #f2f2f2;
      object-fit: contain;
      width: 100%;
    }

    .img-cover {
      display: flex;
      position: absolute;
      justify-content: center;
      align-items: center;
      background-color: rgba(0, 0, 0, .2);
      color: #fff;

      &.progress {
        .content {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          padding: 5px;

          .el-progress {
            .el-progress__text {
              color: #fff;
            }
          }
        }
      }
    }
  }
</style>

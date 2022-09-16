<template>
  <div class="fenzhu-modal-cmp all0">
    <div class="switch-fenzu hor-ver-center" v-loading="confirmLoading">
      <div class="header">
        <span class="p-l-t">
          <span class="secondary-font">&nbsp;&nbsp;&nbsp;所有分组如下：</span>
        </span>
        <span class="p-r-t el-icon-close" @click="close"></span>
      </div>
      <div class="fenzu-list">
        <el-radio-group v-model="selectFenZu" @change="modifyFenZu">
          <el-radio
            v-for="(item, index) in fenZuKeys"
            :key="index" class="item"
            :label="item"
            v-model="selectFenZu">
            {{item}}（{{friendFenZu[item].length}}）
          </el-radio>
        </el-radio-group>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['currentConversation'],
    data() {
      return {
        selectFenZu: "",
        confirmLoading: false,
        isShowAddFenZu: false
      }
    },
    computed: {
      userInfo() {
        return this.$store.state.user.userInfo
      },
      friendFenZu() {
        return this.$store.state.user.friendGroups
      },
      fenZuKeys() {
        return Object.keys(this.friendFenZu)
      },
      currentFenZu() {
        const fenZuIdsMap = this.friendFenZu
        // console.log(this.currentConversation.id,'this.currentConversation.id')
        let res = ''
        this.fenZuKeys.forEach(item => {
          if ((fenZuIdsMap[item] || []).includes(this.currentConversation.id)) {
            res = item
          }
        })
        return res
      }
    },
    methods: {
      async modifyFenZu(val) {
        // console.log(val,'selectFenZu')
        if (!this.selectFenZu) return
        this.confirmLoading = true
        const params = {
          userID: this.userInfo.userID,
          friendID: this.currentConversation.id,
          newFenZuName: this.selectFenZu
        }
        const fenZuRes = await this.$http.modifyFriendFenZu(params)
        this.$store.dispatch('user/GROUPS', fenZuRes.data.data.friendGroups)
        if (fenZuRes.data.code === 2000) {
          const res = await this.$http.getUserInfo(this.userInfo.userID)
          this.$store.dispatch('user/LOGIN', res.data.data.userInfo)
          this.confirmLoading = false
        }
      },
      close() {
        this.$emit('hidden-fenzu')
      }
    },
    mounted() {
      this.selectFenZu = this.currentFenZu;
      // console.log(this.selectFenZu ,this.friendFenZu,'this.selectFenZu ')
    },
  }
</script>

<style lang="scss">
  .v-modal {
    display: none;
  }

  .fenzhu-modal-cmp {
    position: fixed;
    z-index: 2003;
    background-color: rgba(0, 0, 0, .2);

    .switch-fenzu {
      width: 300px;
      padding: 40px 20px 20px;
      background-color: #fff;
      border-radius: 10px;

      .fenzu-list {
        .item {
          display: block;
          margin-top: 20px;
          position: relative;

          &:first-child {
            margin-top: 0;
          }

          .oper {
            position: absolute;
            left: 100%;
          }
        }
      }

      .footer {
        margin-top: 20px;
      }
    }
  }
</style>


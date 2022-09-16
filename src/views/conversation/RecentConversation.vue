<template>
  <div class="recent-conversation-list" v-loading="isLoading">
    <transition-group name="slide-up" appear>
      <conversation-item
        v-for="item in outcomeConversationList"
        :key="item.id"
        :conversationInfo="item"
        :currentConversation="currentConversation"
        :recent-conversation="conversationList"
        @setCurrentConversation="setCurrentConversation"
        @click.native="changeCurrentConversation(item)"
        type="recent"
      />
    </transition-group>
    <div class="empty hor-ver-center" v-if="!outcomeConversationList.length">
      <empty-svg width="200" height="200"/>
      <span class="secondary-font">最近没有聊天好友</span>
    </div>
  </div>
</template>

<script>
  import {conversationTypes} from '@/const'
  import {arrUnique} from '@/utils'
  import conversationItem from './ConversationItem'
  import EmptySvg from '@/SVGComponents/empty'

  export default {
    props: ['currentConversation', 'setCurrentConversation'],
    data() {
      return {
        conversationList: [],
        lastNewsMap: {},
        isLoading: false,
        friendList:[]
      }
    },
    computed: {
      userInfo() {
        return this.$store.state.user.userInfo
      },
      friendBeiZhu() { // 好友备注Map {id2: '备注1', id1: '备注2'}
        return this.$store.state.user.friendNotes
      },
      recentConversation() {
        return this.$store.state.app.recentConversation
      },
      outcomeConversationList() { // 带有备注，最后消息信息的会话列表
        // console.log("带有备注的最近会话列表为：", this.conversationList)
        const conversationList = JSON.parse(JSON.stringify(this.conversationList))
        // console.log(conversationList)
        return conversationList.length && conversationList.map(item => {
          item.beiZhu = this.friendBeiZhu[item.id] ? this.friendBeiZhu[item.id] : ''
          item.lastNews = this.lastNewsMap[item.roomID] ? this.lastNewsMap[item.roomID] : ''
          item.lastNewsTime = this.lastNewsMap[item.roomID] ?
            (this.lastNewsMap[item.roomID].sendTime ? new Date(this.lastNewsMap[item.roomID].sendTime) : new Date(Date.now() - 2000)) :
            new Date(Date.now() - 2000) // -2000ms为了解决没有最近消息的会话的lastNews一直为当前时间（这样会和新发送的消息的会话冲突）
          return item
        }).sort((a, b) => {
          return b.lastNewsTime - a.lastNewsTime //最新到最旧
        })
      }
    },
    methods: {
      async getRecentConversation() { //最近单聊
        this.isLoading = true
        const recentFriendIdsStr = window.localStorage.getItem('coMessager-recentConversation-friend') || ''
        // console.log("recentFriendIdsStr：", recentFriendIdsStr)
        const recentFriendIDList = recentFriendIdsStr.split(',')
        const recentFriendIDS = arrUnique(recentFriendIDList).filter(item => item) // 去重
        let friendList = []
        for(let i = 0;i<recentFriendIDS.length;i++){
          let x = parseInt(recentFriendIDS[i])
          friendList.push(x)
        }

        const {data} = await this.$http.getRecentConversationList({
          userID: this.userInfo.userID,
          friendList
        })
        const list = data.data.singleRecentConversationList
        const myId = this.userInfo.userID
        // console.log("最近会话列表为：", list)
        // console.log("登录用户的为：", myId)
        const conversationList = (list || []).map(item => {
          let res = {}
          res.createDate = item.createDate
          // res.roomID = item.userM.userID + '-' + item.userY.userID
          res.roomID = item.roomID
          // console.log("拼接得到的房间id为：", res.roomId)
          if (item.userM.userID === myId && item.userY.userID !== myId) {
            res = {
              ...res, ...item.userY,
              conversationType: conversationTypes.friend,
              myNickName: this.userInfo.nickName,
              myID: this.userInfo.userID,
              myAvatar: this.userInfo.photo
            }
          } else {
            res = {
              ...res, ...item.userM,
              conversationType: conversationTypes.friend,
              myNickName: this.userInfo.nickName,
              myID: this.userInfo.userID,
              myAvatar: this.userInfo.photo
            }
          }
          let id = res.userID
          delete res.userID
          res["id"] = id;
          // console.log("改变后的会话对象为：", res)
          return res
        })
        // console.log("会话列表->conversationList：", conversationList)
        this.$store.dispatch('app/SET_RECENT_CONVERSATION', {type: 'init', data: conversationList})
        // 获取最后一条消息存入Vuex
        const reqArr = []
        conversationList.forEach(item => {
          // console.log(item)
          const req = this.$http.getLastMessage(item.roomID)
          // console.log(req)
          reqArr.push(req)
        })
        // console.log("获取最后一条消息reqArr：", reqArr)
        Promise.all(reqArr).then(res => {
          const lastNewsArr = res.map(item => {
            return item.data.data.lastMsg
          })
          // console.log(lastNewsArr)
          const lastNewsMap = lastNewsArr.reduce((map, item) => {
            if (item && item.roomID) map[item.roomID] = item
            return map
          }, {})
          // console.log("最后一条新的消息为：", lastNewsMap)
          this.$store.dispatch('news/SET_LAST_NEWS', {
            type: 'init',
            res: lastNewsMap
          })
          this.isLoading = false
        }).catch(err => {
          console.log(err)
        })
        this.conversationList = conversationList
      },
      async getRecentGroupConversation() { //最近群聊
        const recentGroupIdsStr = window.localStorage.getItem('coMessager-recentConversation-group') || ''
        // console.log("recentGroupIdsStr：", recentGroupIdsStr)
        const recentGroupIDList = parseInt(recentGroupIdsStr)
        const recentGroupIds = arrUnique(recentGroupIDList).filter(item => item) // 去重
        const groupIDs = recentGroupIds.map(Number)
        this.$http.getRecentGroup({
          userID: this.userInfo.userID,
          groupIDs: groupIDs
        }).then(res => {
          const groupList = res.data.data.recentGroups
          if (res.data.code === 2000 && groupList) {
            groupList.forEach(item => {
              item.conversationType = 'GROUP'
              item.isGroup = true
              item.roomId = item.groupInfo.groupID
            })
            const groupRoomIds = groupList.map(item => item.groupInfo.groupID)
            const reqArr = []
            groupRoomIds.forEach(item => {
              const req = this.$http.getGroupLastMessage(item)
              reqArr.push(req)
            })
            Promise.all(reqArr).then(res => {
              const lastNewsArr = res.map(item => {
                return item.data.data.groupLastMessage
              })
              const lastNewsMap = lastNewsArr.reduce((map, item) => {
                if (item && item.roomId) map[item.roomId] = item
                return map
              }, {})
              this.$store.dispatch('news/SET_LAST_NEWS', {
                type: 'concat',
                res: lastNewsMap
              })
              this.isLoading = false
            }).catch(err => {
              console.log(err)
            })
            this.conversationList = [...this.conversationList, ...groupList] //合并所有会话
            this.$store.dispatch('app/SET_RECENT_CONVERSATION', {type: 'init', data: this.conversationList})
          }
        })
      },
      changeCurrentConversation(item) {
        this.$emit('setCurrentConversation', item)
      }
    },
    watch: {
      '$store.state.app.recentConversation': { //监听了全局最近会话列表
        handler(newVal, oldVal) {
          this.conversationList = newVal.filter(item => Object.keys(item).length > 0)
        }, deep: true, immediate: true
      },
      '$store.state.news.lastNews': {
        handler(newVal, oldVal) {
          this.lastNewsMap = newVal
        }
      }
    },
    components: {
      conversationItem,
      EmptySvg
    },
    async created() {
      await this.getRecentConversation()
      this.getRecentGroupConversation()
    },
  }
</script>

<style lang="scss">
  .recent-conversation-list {
    @import './../../../static/css/animation.scss';
    position: relative;
    height: 510px;
    overflow-x: hidden;

    .empty {
      text-align: center;
    }
  }
</style>

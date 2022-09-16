import request from '@/utils/request'

export default {
  /**
   * 获取最近的单聊消息
   */
  getRecentSingleMessages(data) {
    return request.post(`/api/singleMessage/getRecentSingleMessages`,data)
  },

  /**
   * 获取好友之间的最后一条聊天记录
   */
  getLastMessage(roomID) {
    return request.get(`/api/singleMessage/getLastMessage?roomID=${roomID}`)
  },

  /**
   * 当用户在切换会话阅读消息后，标记该消息已读
   */
  userIsReadMessage(data) {
    return request.post(`/api/singleMessage/isRead`, data)
  },

  /**
   * 获取单聊历史记录
   */
  getSingleHistoryMessages(data) {
    return request.post(`/api/singleMessage/historyMessage`, data)
  }
}

import request from '@/utils/request'

export default {
  getMyValidateMessageList(userId) {
    return request.get(`/api/validate/getMyValidateMessageList?userID=${userId}`)
  },
  getValidateMessage(data) {
    return request.post(`/api/validate/getValidateMessage`,data)
  },
  sendValidateMessage(data){
    return request.post(`/api/validate/sendValidateMessage`, data)
  },
  assentRequest(data){
    return request.post(`/api/validate/assentRequest`, data)
  },
  rejectRequest(data){
    return request.post(`/api/validate/rejectRequest`, data)
  }
}

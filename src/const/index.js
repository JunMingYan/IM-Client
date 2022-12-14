export const conversationTypes = {
  friend: 'FRIEND',
  group: 'GROUP'
}

export const MsgTypes = {
  MsgH : 1024,
  MsgR : 1025,
  MsgA : 1026,
  MsgN : 1027,
  AckR : 1028,
  AckA : 1029,
  AckN : 1030,
  GroupR : 1031,
  GroupA : 1032,
  GroupN : 1033
}

export const APP_VERSION = '1.0.0'

// 在添加好友或者群聊时对应的搜索条件
export const searchObjectMap = [
  {id: 1, label: '人', value: 'friend'},
  {id: 2, label: '群', value: 'group'}
]

export const searchTypes = {
  friend: [
    {id: 1, label: 'Chat账号', value: 'code'},
    {id: 2, label: '用户账号', value: 'username'},
    {id: 3, label: '昵称', value: 'nickname'}
  ],
  group: [
    {id: 1, label: 'Chat账号', value: 'code'},
    {id: 2, label: '名称', value: 'title'}
  ]
}

export const validateNewsTips = {
  applyFriend: '请求添加你为好友',
  applyGroup: '请求加入群聊'
}

// 上传文件时的状态
export const uploadStatusMap = {
  error: 'error',
  next: 'next',
  complete: 'complete'
}

// 在CoArtBoard组件中对调色板的操作
export const coArtBoardHandleOption = [
  {name: "圆", type: "arc"},
  {name: "线条", type: "line"},
  {name: "矩形", type: "rect"},
  {name: "多边形", type: "polygon"},
  {name: "橡皮擦", type: "eraser"},
  {name: "撤回", type: "cancel"},
  {name: "前进", type: "go"},
  {name: "清屏", type: "clear"},
  {name: "线宽", type: "lineWidth"},
  {name: "颜色", type: "color"}
]

export const coArtBoardReplyTypes = {
  agree: 'agree',
  disagree: 'disagree',
  busy: 'busy',
}

export const weatherMap = {
  "阴": 'icon-tianqi',
  "多云": 'icon-tianqi1',
  "晴": 'icon-ziyuan',
  "小雨下雨": 'icon-n1'
}

export const weekNumZHMap = {
  "0": '星期天',
  "1": '星期一',
  "2": '星期二',
  "3": '星期三',
  "4": '星期四',
  "5": '星期五',
  "6": '星期六',
}

export const WEB_RTC_MSG_TYPE = {
  artBoard: 'artBoard',
  video: 'video',
  audio: 'audio'
}

export const MSG_TYPES = {
  ...WEB_RTC_MSG_TYPE,
  sys: 'sys',
  text: 'text',
  img: 'img',
  file: 'file'
}

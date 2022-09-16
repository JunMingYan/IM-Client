<script>
let url = ""
let socket = null
let ID = null
let socketMsg = {}

function initWebSocket(ID) {
  url = 'ws://127.0.0.1:8899/ws/socket.io?ID=' + ID
  ID = ID
  socket = new WebSocket(this.url)
  console.log("正在连接...")
  socket.onopen = open
  socket.onmessage = message
  socket.onerror = error
  socket.onclose = close
}

function close(e){
  console.log("正在断开连接...",e)
}

function open(){
  console.log("连接成功...")
}

function error(e){
  console.log("连接错误...",e)
  reconnect()
}

function message(data){
  const msg = JSON.parse(data)
  console.log("这是服务器发来的贺电->",msg)
}

function send(msg){
  if(socket != null){
    const data = JSON.stringify(msg)
    this.socket.send(data)
  }
  reconnect()
}

function heartBeat(){
  window.setInterval(function (){
    if(socket != null){
      const heartBeat = {key:0,data:ID}
      this.send(heartBeat)
      console.log("发送心跳包...")
    }
    reconnect()
  },30000)
}

function reconnect(){
  socket = new WebSocket(url)
  console.log("正在重新连接...")
  socket.onopen = open
  socket.onmessage = message
  socket.onerror = error
  socket.onclose = close
}

export default {
  socket,
  initWebSocket,
  send,
  message,
  heartBeat,
}
</script>


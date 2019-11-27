let cb = function(socket) {
  console.log("client connected"); //终端显示连接状态
  //   socket.on("pingfen", data => {
  //     console.log("客户端发送的内容：", data);
  //     socket.emit("getMsg", "我是返回的消息... 收到的分数为：" + data.fenshu);
  //     socket.broadcast.emit(
  //       "getMsg",
  //       "我是返回的消息... 收到的分数为：" + data.fenshu
  //     );
  //   });
  socket.on("pingfen", data => {
    console.log("评委提交的评分为：", data);
    // socket.emit("getMsg", "我是返回的消息... 收到的分数为：" + data.fenshu);
    socket.broadcast.emit("pingfenResult", data);
  });
  socket.on("huanjie", data => {
    console.log("环节修改为：", data);
    // socket.emit("getMsg", "我是返回的消息... 收到的分数为：" + data.fenshu);
    socket.broadcast.emit("huanjieChange", data);
  });
};
module.exports = cb;

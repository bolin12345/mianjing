# websocket

通过长时连接实现与服务器全双工、双向的通信

## 创建过程

1. 发送 http 请求到服务器初始化连接
2. 服务响应后，连接使用 http 协议的 upgrade 头部从 http 协议切换到 websocket 协议

使用自定义协议 ws:// 或 wss://,前者为不安全连接，后者为安全连接

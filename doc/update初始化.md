## 更新

触发更新的几种方式

1. ReactDOM.createRoot().render 或者老版 的 ReactDOM.render()
2. this.setState
3. useState 的 dispatch 方法

## 更新机制的组成部分

1. 更新的数据结构 update
2. 消费 update 数据结构 updateQueue

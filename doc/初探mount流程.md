## mount 流程

mount 是首屏更新流程

更新流程的目的是

- 生成 wip（workInProgress 全程 后面都用简写） fiberNode 树
- 标记副作用 flags

更新流程的步骤

- beginWork 递
- completeWork 归

## beginWork

例如这个结构的 element

```html
<a>
	<b></b>
</a>
```

当进入 a 的 beginWork 首先会 通过 b 的 current fiberNode 和 b 的 reactElement 然后生成 b 对应的 wip fiberNode

在这个过程主要标记两类 和结构变化的 flags Placement（插入或者移动） 和 ChildDeletion（删除）

## 实现 host 相关节点的 beginWork

方便开发环境打印更多的信息 添加 **DEV** 环境信息
添加插件 `pnpm i -D -w @rollup/plugin-replace` 在 react-reconciler 文件下安装
在 script utils 下引入

```js
export function getBaseRollupPlugins({
	alias = {
		__DEV__: true
	},
	typescript = {}
} = {}) {
	return [replace(alias), cjs(), ts(typescript)];
}
```

在 react-reconciler src 下添加声明文件 reconciler.d.ts

`declare let __DEV__: boolean`

hostRoot 的 beginWork 工作流程是

- 计算状态的最新值
- 创造子的 fiberNode

hostComponent 的 beginWork 工作流程是

- 创造子的 fiberNode

hostText 没有 beginWork 工作流程 因为没有子节点

## beginWork 的性能优化

如下结构

```html
<div>
	<p>test p</p>
	<span>test s</span>
</div>
```

理论上 mount 流程完毕后包含的 flags

- test s Placement
- span Placement
- test p Placement
- p Placement
- div Placement

这样会执行 5 次 Placement， 我们可以构建好离屏 dom 树 这样只需要执行 1 次 Placement 即可

## completeWork

- 对于 Host 类型的 fiberNode 构建离屏幕 DOM 树
- 标记 update flag

complete 性能优化策略

flags 分布在不同的 fiberNode 中 如何快速找到？
利用 completeWork 向上遍历的流程 将子 fiberNode 中的 flags 冒泡到父 fiberNode

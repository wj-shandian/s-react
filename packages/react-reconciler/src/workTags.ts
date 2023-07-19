//  函数组件类型
export const FunctionComponent = 0;
// 根节点类型
export const HostRoot = 3;
// 表示 例如 div节点
export const HostComponent = 5;
// 表示 例如 div节点中的文本
export const HostText = 6;

export type WorkTag =
	| typeof FunctionComponent
	| typeof HostRoot
	| typeof HostComponent
	| typeof HostText;

import { FiberNode } from './fiber';
import { HostComponent, HostRoot, HostText } from './workTags';
import {
	createInstance,
	appendInitialChild,
	createTextInstance
} from './hostConfig';
import { NoFlags } from './fiberFlags';

export const completeWork = (wip: FiberNode) => {
	// 递归中的归

	const newProps = wip.pendingProps;
	const current = wip.alternate;

	switch (wip.tag) {
		case HostComponent:
			// 构建dom 将构建的dom插入dom树中
			if (current !== null && wip.stateNode) {
				// 这个时候是update阶段 stateNode存的是当前的dom节点
			} else {
				// 首屏渲染流程
				const instance = createInstance(wip.type, newProps);
				appendAllChildren(instance, wip);
				wip.stateNode = instance;
				bubbleProperties(wip);
			}
			return null;
		case HostText:
			// 构建dom 将构建的dom插入dom树中
			if (current !== null && wip.stateNode) {
				// 这个时候是update阶段 stateNode存的是当前的dom节点
			} else {
				// 首屏渲染流程
				const instance = createTextInstance(newProps.content);
				wip.stateNode = instance;
				bubbleProperties(wip);
			}
			return null;
		case HostRoot:
			bubbleProperties(wip);
			return null;
		default:
			if (__DEV__) {
				console.log('未实现的completeWOrk情况');
			}
			break;
	}
};

function appendAllChildren(parent: FiberNode, wip: FiberNode) {
	let node = wip.child;

	while (node !== null) {
		if (node.tag === HostComponent || node.tag === HostText) {
			// 执行插入的方法
			appendInitialChild(parent, node?.stateNode);
		} else if (node.child !== null) {
			node.child.return = node;
			node = node.child;
			continue;
		}
		if (node === wip) return;

		while (node.sibling === null) {
			if (node.return === null || node.return === wip) return;
			node = node?.return;
		}
		node.sibling.return = node.return;
		node = node.sibling;
	}
}

function bubbleProperties(wip: FiberNode) {
	let subtreeFlags = NoFlags;
	let child = wip.child;

	while (child !== null) {
		subtreeFlags |= child.subtreeFlags;
		subtreeFlags |= child.flags;
		child.return = wip;
		child = child.sibling;
	}
	wip.subtreeFlags |= subtreeFlags;
}

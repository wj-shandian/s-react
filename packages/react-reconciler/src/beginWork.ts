import { ReactElementType } from 'shared/ReactTypes';
import { FiberNode } from './fiber';
import { UpdateQueue, processUpdateQueue } from './updateQueue';
import { HostComponent, HostRoot, HostText } from './workTags';
import { mountChildFibers, updateChildFibers } from './childFibers';

// 递归中的递归阶段
export const beginWork = (wip: FiberNode) => {
	// 比较 返回子的fiberNode
	switch (wip.tag) {
		case HostRoot:
			return updateHostRoot(wip);
		case HostComponent:
			return updateHostComponent(wip);
		case HostText:
			return null;
		default:
			if (__DEV__) {
				console.warn('beginWork未实现的类型');
			}
			break;
	}
	return null;
};

function updateHostRoot(wip: FiberNode) {
	const baseState = wip.memoizedState;
	const updateQueue = wip.updateQueue as UpdateQueue<Element>;
	const pending = updateQueue.shared.pending;
	updateQueue.shared.pending = null;
	// 此时 memoizedState  就是指 element
	const { memoizedState } = processUpdateQueue(baseState, pending);
	wip.memoizedState = memoizedState;

	const nextChildren = wip.memoizedState; // 子 react element 再找到子的current fiberNode 然后比较生成 wip fiberNode
	// 这个方法用来 返回子 fiberNode
	reconcilerChildren(wip, nextChildren);
	return wip.child;
}
// updateHostComponent不会触发更新 所有没有更新的过程 只有一个流程创造 子fiberNode
function updateHostComponent(wip: FiberNode) {
	// <div><span></span></div> 比如这个结构 子fiberNode就是span  那么span则是在 props中的children
	const nextProps = wip.pendingProps;
	const nextChildren = nextProps.children;
	reconcilerChildren(wip, nextChildren);
	return wip.child;
}

function reconcilerChildren(wip: FiberNode, children?: ReactElementType) {
	const current = wip.alternate;

	if (current !== null) {
		// update阶段
		wip.child = updateChildFibers(wip, current?.child, children);
	} else {
		// mount 阶段
		wip.child = mountChildFibers(wip, null, children);
	}
}

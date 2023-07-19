import { Props, Key, Ref } from 'shared/ReactTypes';
import { WorkTag } from './workTags'; // 定义节点类型
import { Flags, NoFlags } from './fiberFlags';

export class FiberNode {
	key: Key;
	tag: WorkTag;
	pendingProps: Props;
	memoizedProps: Props | null;
	stateNode: any;
	type: any;
	return: FiberNode | null;
	sibling: FiberNode | null;
	child: FiberNode | null;
	index: number;
	ref: Ref;
	alternate: FiberNode | null;
	flags: Flags;

	constructor(tag: WorkTag, pendingProps: Props, key: Key) {
		// 对于fiberNode来说 这个是实例属性
		this.tag = tag;
		this.key = key;
		// 举个例子 比如当前节点类型是 HostComponent  <div> 那么就是保存当前div 这个dom
		this.stateNode = null;
		// fiberNode的类型 例如 FunctionComponent 代表就是本身
		this.type = null;

		// 构成树状结构
		// 指向父fiberNode 为什么叫return 因为我们把fiberNode当作一个工作单元 当一个工作单元完成以后 下一个就是父工作单元 所以是return
		this.return = null;
		// 指向兄弟 fiberNode
		this.sibling = null;
		// 指向子fiberNode
		this.child = null;
		// 指向同级的 fiberNode 举个例子 一个ul下面有多个li 那么 index 则代表这个li的下标顺序
		this.index = 0;

		this.alternate = null;

		this.ref = null;

		// 作为工作单元
		// 工作单元刚开始工作时 props是什么
		this.pendingProps = pendingProps;
		// 工作单元结束以后 确定的单元props是什么
		this.memoizedProps = null;

		// 副作用
		this.flags = NoFlags;
	}
}

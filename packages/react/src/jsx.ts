import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';
import {
	Type,
	Key,
	Ref,
	Props,
	ReactElementType,
	ElementType
} from 'shared/ReactTypes';

const ReactElement = function (
	type: Type,
	key: Key,
	ref: Ref,
	props: Props
): ReactElementType {
	const element = {
		$$typeof: REACT_ELEMENT_TYPE,
		type,
		key,
		ref,
		props
	};
	return element;
};

export const jsx = (type: ElementType, config: any, ...maybeChildren: any) => {
	let key: Key = null;
	const props: Props = {};
	let ref: Ref = null;

	for (const prop in config) {
		const val = config[prop];
		if (prop === 'key') {
			if (val !== undefined) {
				key = '' + val;
			}
			continue;
		}
		if (prop === 'ref') {
			if (val !== undefined) {
				ref = val;
			}
			continue;
		}
		if ({}.hasOwnProperty.call(config, prop)) {
			// 剩下的参数如果不是原型上的 都给props
			props[prop] = val;
		}
	}
	const maybeChildrenLength = maybeChildren.length;
	if (maybeChildrenLength) {
		if (maybeChildrenLength === 1) {
			props.children = maybeChildren[0];
		} else {
			props.children = maybeChildren;
		}
	}

	return ReactElement(type, key, ref, props);
};

export const jsxDev = jsx;

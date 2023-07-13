// 是否支持symbol
const isSupportSymbol = typeof Symbol === 'function' && Symbol.for;
export const REACT_ELEMENT_TYPE = isSupportSymbol
	? Symbol.for('react.element')
	: 0xeac7;

import path from 'path';
import fs from 'fs';
import ts from 'rollup-plugin-typescript2';
import cjs from '@rollup/plugin-commonjs';

const pkgPath = path.resolve(__dirname, '../../packages'); // 获取 packages下文件的路径
const dstPath = path.resolve(__dirname, '../../dist/node_modules'); // 打包生成的路径 因为我们会打包多个 react react-dom 所以要放在node_modules下面

export function resolverPkgPath(pkgName, isDist) {
	if (isDist) {
		return `${dstPath}/${pkgName}`;
	}
	return `${pkgPath}/${pkgName}`;
}

export function getPackageJson(pkgName) {
	// 获取包的 package.json 内容并序列化返回
	const path = `${resolverPkgPath(pkgName)}/package.json`;
	const str = fs.readFileSync(path, { encoding: 'utf-8' });
	return JSON.parse(str);
}
// 基础的plugins
// 当前需要 解析commonjs规范的plugin 和 将ts代码转译成js代码的plugin
export function getBaseRollupPlugins({ typescript = {} } = {}) {
	return [cjs(), ts(typescript)];
}

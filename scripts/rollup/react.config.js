import { getPackageJson, resolverPkgPath, getBaseRollupPlugins } from './utils';
import generatePackageJson from 'rollup-plugin-generate-package-json';

const { name, module } = getPackageJson('react');
// react 包路径
const pakPath = resolverPkgPath(name);
// 打包后的产物路径
const pakDistPath = resolverPkgPath(name, true);

export default [
	// react
	{
		input: `${pakPath}/${module}`, // 入口
		output: {
			// 输出
			file: `${pakDistPath}/index.js`,
			name: 'index.js',
			format: 'umd'
		},
		plugins: [
			...getBaseRollupPlugins(),
			generatePackageJson({
				inputFolder: pakPath,
				outputFolder: pakDistPath,
				baseContents: ({ name, description, version }) => ({
					name,
					description,
					version,
					main: 'index.js'
				})
			})
		]
	},
	// jsx-runtime
	{
		input: `${pakPath}/src/jsx.ts`,
		output: [
			{
				// jsx-runtime
				file: `${pakDistPath}/jsx-runtime.js`,
				name: 'jsx-runtime.js',
				format: 'umd'
			},
			{
				// jsx-dev-runtime
				file: `${pakDistPath}/jsx-dev-runtime.js`,
				name: 'jsx-dev-runtime.js',
				format: 'umd'
			}
		],
		plugins: getBaseRollupPlugins()
	}
];

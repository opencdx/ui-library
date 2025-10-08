export default {
	entry: ['src/index.ts'],
	format: ['cjs', 'esm'],
	dts: false,
	splitting: false,
	sourcemap: true,
	target: 'es2020',
	clean: true,
	treeshake: true,
	skipNodeModulesBundle: true,
	outDir: 'dist',
}

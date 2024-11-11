// rollup.config.mjs
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'es',
    preserveModules: false,
    sourcemap: true
  },
  external: [
    /^react($|\/)/,
    // Add other external dependencies here
  ],
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: './dist',
      exclude: ['**/*.test.*', '**/__tests__/*']
    })
  ]
};
import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import path from 'path';
import localResolve from 'rollup-plugin-local-resolve';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import copy from 'rollup-plugin-copy';
import pkg from './package.json';

const cracoAliases = [
  { find: '@api', replacement: path.resolve(__dirname, 'src/lib/api') },
  {
    find: '@authentication',
    replacement: path.resolve(__dirname, 'src/lib/authentication/'),
  },
  {
    find: '@components',
    replacement: path.resolve(__dirname, 'src/lib/components/'),
  },
  { find: '@config', replacement: path.resolve(__dirname, 'src/lib/config/') },
  {
    find: '@forms',
    replacement: path.resolve(__dirname, 'src/lib/forms/'),
  },
  {
    find: '@modules',
    replacement: path.resolve(__dirname, 'src/lib/modules'),
  },
  { find: '@pages', replacement: path.resolve(__dirname, 'src/lib/pages/') },
  { find: '@routes', replacement: path.resolve(__dirname, 'src/lib/routes/') },
  {
    find: '@history',
    replacement: path.resolve(__dirname, 'src/lib/history/'),
  },
  { find: '@theme', replacement: path.resolve(__dirname, 'src/semantic-ui/') },
];

export default {
  input: 'src/lib/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      strict: false,
    },
    {
      file: pkg.module,
      format: 'esm',
      exports: 'named',
      sourcemap: true,
    },
  ],
  plugins: [
    alias({
      entries: cracoAliases,
    }),
    peerDepsExternal(),
    localResolve(),
    resolve(),
    babel({
      presets: ['react-app'],
      babelHelpers: 'runtime',
      exclude: 'node_modules/**',
    }),
    commonjs(),
    copy({
      targets: [{ src: 'src/semantic-ui/*', dest: 'dist/theme' }],
    }),
  ],
  watch: {
    include: 'src/**',

    chokidar: {
      usePolling: true,
      paths: 'src/**',
    },
  },
  onwarn: warning => {
    console.warn(warning);
    // fail on warnings
    throw new Error(warning.message);
  },
};

/*
 * SPDX-FileCopyrightText: 2020-2026 CERN.
 * SPDX-License-Identifier: MIT
 */

import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import fs from 'fs';
import path from 'path';
import localResolve from 'rollup-plugin-local-resolve';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import copy from 'rollup-plugin-copy';
import pkg from './package.json';

const aliases = [
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

// The theme files (`.variables`, `.overrides`, `theme.config`...) are copied to
// `dist/theme` but are not imported by any module, so `rollup --watch` would
// never notice a change in them. This plugin registers them as watched files:
// editing one triggers a rebuild, which copies the theme again.
const themeDir = path.resolve(__dirname, 'src/semantic-ui');

const listFiles = (dir) =>
  fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) =>
      entry.isDirectory()
        ? listFiles(path.join(dir, entry.name))
        : [path.join(dir, entry.name)]
    )
    .filter((file) => path.basename(file) !== '.DS_Store');

const watchTheme = () => ({
  name: 'watch-theme',
  buildStart() {
    listFiles(themeDir).forEach((file) => this.addWatchFile(file));
  },
});

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
  external: ['html5-qrcode'],
  plugins: [
    alias({
      entries: aliases,
    }),
    peerDepsExternal(),
    localResolve(),
    resolve(),
    babel({
      babelHelpers: "runtime",
      extensions: [".js", ".jsx"],
      exclude: "node_modules/**"
    }),
    commonjs(),
    watchTheme(),
    copy({
      targets: [{ src: 'src/semantic-ui/*', dest: 'dist/theme' }],
    }),
  ],
  watch: {
    include: 'src/**',
    exclude: 'node_modules/**', // exclude node_modules from being watched to prevent 'THIS_IS_UNDEFINED' errors
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

const path = require('path');
const { getIn, setIn } = require('immutable');

const babelLoader = {
  loader: require.resolve('babel-loader'),
  options: {
    presets: ['@babel/preset-env', '@babel/preset-react'],
  },
};

const pugAsJsxLoader = {
  loader: require.resolve('pug-as-jsx-loader'),
  options: {
    resolveVariables: {
      cx: 'classnames',
    },
    transpiledFile: true,
    autoUpdateJsFile: true,
  },
};

const styleLoader = require.resolve('style-loader');

const cssLoader = {
  loader: require.resolve('css-loader'),
  options: {
    importLoaders: 1,
    sourceMap: true,
    modules: true,
    localIdentName: '[name]-[local]-[hash:base64:5]',
  },
};

const postcssLoader = {
  loader: require.resolve('postcss-loader'),
  options: {
    // Necessary for external CSS imports to work
    // https://github.com/facebookincubator/create-react-app/issues/2677
    ident: 'postcss',
    plugins: () => [
      require('postcss-flexbugs-fixes'),
      require('autoprefixer')({
        browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9', // React doesn't support IE8 anyway
        ],
        flexbox: 'no-2009',
      }),
    ],
  },
};

const sassLoader = require.resolve('sass-loader');

module.exports = (paths) => {
  // Reads Sass vars from files or inlined in the options property
  const sassVarsLoader = {
    loader: '@epegzz/sass-vars-loader',
    options: {
      syntax: 'scss',
      files: [
        path.resolve(paths.appSrc, 'app/shared/styles/variables/index.js'),
      ],
    },
  };

  return {
    // Customize webpack.config.js
    'resolve.modules': {
      $push: ['shared'],
    },

    // path in webpack.config
    'module.rules...oneOf': {
      // Apply transform-commonjs-es2015-modules to js files.
      // https://www.npmjs.com/package/babel-plugin-transform-commonjs-es2015-modules
      $aggregate: [{
        $match(rule) {
          const { include, test = {} } = rule;
          return include && typeof test.test === 'function' && test.test('app.js');
        },
        $update(rule) {
          return setIn(rule, ['options', 'plugins'], [
            ...(getIn(rule, ['options', 'plugins']) || []),
            require.resolve('babel-plugin-transform-commonjs-es2015-modules'),
          ]);
        },
      }],

      $unshift: [
        // Process pug as jsx.
        {
          test: /\.pug$/,
          include: paths.appSrc,
          use: [
            babelLoader,
            pugAsJsxLoader,
          ],
        },

        // Process application css|scss.
        {
          test: /\.(css|scss)$/,
          exclude: /\/(node_modules|styles)\//,
          use: [
            styleLoader,
            cssLoader,
            postcssLoader,
            sassLoader,
            sassVarsLoader,
          ],
        },

        // Process any css|scss outside of the app.
        {
          test: /\.(css|scss)$/,
          include: /\/(node_modules|styles)\//,
          use: [
            styleLoader,
            setIn(cssLoader, ['options', 'localIdentName'], '[local]'),
            postcssLoader,
            sassLoader,
            sassVarsLoader,
          ],
        },

        // Process yaml files.
        {
          test: /\.(yml|yaml)$/,
          exclude: /node_modules/,
          use: [
            require.resolve('json-loader'),
            require.resolve('yaml-loader'),
          ],
        },
      ],
    },
  };
};
